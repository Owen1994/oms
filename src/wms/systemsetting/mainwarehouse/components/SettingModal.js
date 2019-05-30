import React from 'react';
import {
    Modal,
    Form,
} from 'antd';
import { fetchPost } from '../../../../util/fetch';
import { SET_MAIN_WAREHOUSE } from '../constants/Api';
import CSelect from '../../../../components/cselect';
import { GET_MAIN_WAREHOUSE } from '../../../common/constants/Api';

const FormItem = Form.Item;
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

class SettingModal extends React.Component {
    state = {
        loading: false,
    };


    // 表单提交
    handleSubmit = () => {
        const { pageNumber, pageData } = this.props;
        this.props.form.validateFields((err, values) => {
            this.setState({ loading: true });
            if (!err) {
                values.key = this.props.record.key;
                fetchPost(SET_MAIN_WAREHOUSE, { data: values }, 1)
                    .then((result) => {
                        if (result.state === '000001') {
                            this.handleCancel();
                            this.props.handleSubmit(pageNumber, pageData);
                        }
                    });
            }
        });
    };

    // 取消
    handleCancel = () => {
        this.setState({ loading: false });
        this.props.form.resetFields();
        this.props.closeModal();
    };

    render() {
        const { visible, record } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="wms-modal">
                <Modal
                    visible={visible}
                    title="设置"
                    destroyOnClose
                    width={500}
                    onCancel={this.handleCancel}
                    onOk={this.handleSubmit}
                    confirmLoading={this.state.loading}
                >
                    <FormItem
                        {...formItemLayout}
                        label="姓名"
                    >
                        <span>{record.name}</span>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="主仓库"
                    >
                        {
                            getFieldDecorator('warehouseCode', {})(
                                <CSelect
                                    localSearch={1}
                                    params={{ data: { key: record.key } }}
                                    url={GET_MAIN_WAREHOUSE}
                                    placeholder="请选择"
                                />,
                            )
                        }
                    </FormItem>
                </Modal>
            </div>
        );
    }
}

export default Form.create()(SettingModal);
