import React from 'react';

import {
    Modal,
    Button,
    Form,
    message,
} from 'antd';

import CSelect from '../../../../../components/cselect';
import { inquireOPEmployeeUrl } from '../../constants/Api';

const FormItem = Form.Item;

class logisticsCom extends React.Component {
    state = {
    }

    formItemLayout = {
        labelCol: { span: 7 },
        wrapperCol: { span: 17 },
    }

    saveHandle = () => {
        const { keys, getPriceManagementTaskAsync } = this.props;
        const { getFieldValue } = this.props.form;
        const checkPerson = getFieldValue('checkPerson');
        if (!checkPerson) return message.warning('请选择新的核价员');
        getPriceManagementTaskAsync({
            data: {
                keys,
                checkPerson,
            },
        })
            .then((reuslt) => {
                if (reuslt) {
                    message.success(reuslt.msg);
                    this.modalCancel();
                }
            });
    }

    modalCancel = () => {
        this.props.onCancel();
    }

    render() {
        const { visible } = this.props;
        const { getFieldDecorator } = this.props.form;
        const content = (
            <FormItem
                label="转移给新的核价员"
                {...this.formItemLayout}
            >
                {getFieldDecorator(
                    'checkPerson',
                    {
                        rules: [{ required: true, message: 'SKU为必填' }],
                        initialValue: undefined,
                    },
                )(
                    <CSelect
                        code="key" // 列表编码字段
                        name="label" // 列表名称字段
                        url={inquireOPEmployeeUrl}
                        // params={{ searchColumn: 'name', role: '核价员' }} // 搜索参数
                        params={{
                            data: {
                                searchColumn: 'name',
                                procurementType: 4,
                                pageData: 20,
                                pageNumber: 1,
                            },
                        }} // 搜索参数
                        style={{ width: '85%' }}
                    />,
                )}
            </FormItem>
        );

        const footer = (
            <div>
                <Button onClick={this.modalCancel}>取消</Button>
                <Button onClick={this.saveHandle}>确认</Button>
            </div>
        );

        return (
            <Modal
                title="任务转移"
                width={600}
                destroyOnClose
                // centered
                visible={visible}
                footer={footer}
                maskClosable={false}
                onCancel={this.modalCancel}
            >
                {content}
            </Modal>
        );
    }
}

export default Form.create()(logisticsCom);
