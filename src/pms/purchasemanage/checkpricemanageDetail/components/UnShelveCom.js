import React from 'react';

import {
    Modal,
    Button,
    Form,
    Input,
    Select,
    message,
} from 'antd';

import { unShelveState } from '../constants/index';
import '../css.css';
import { getUrlParams } from '../../../../util/baseTool';

const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;

class logisticsCom extends React.Component {
    formItemLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 },
    }

    saveHandle = () => {
        // const { data } = this.props;
        const { validateFields } = this.props.form;
        validateFields((err, value) => {
            if (err) {
                return message.error(err[Object.keys(err)[0]].errors[0].message);
            }
            const params = getUrlParams(window.location.search);
            if (!params.id) return;
            const id = params.id;
            value.checkNumber = id;
            this.props.priceDetailsLowerTipsAsync({
                data: value,
            })
                .then((result) => {
                    if (result) {
                        message.success(result.msg);
                        this.modalCancel();
                    }
                });
        });
    }


    modalCancel = () => {
        this.props.onCancel();
    }

    render() {
        const { visible, sku } = this.props;
        const { getFieldDecorator } = this.props.form;
        const content = (
            <Form>
                <FormItem
                    label="下架SKU"
                    {...this.formItemLayout}
                >
                    {getFieldDecorator(
                        'sku',
                        {
                            initialValue: sku,
                        },
                    )(
                        <Input disabled style={{ width: '85%' }} />,
                    )}
                </FormItem>
                <FormItem
                    label="下架原因"
                    {...this.formItemLayout}
                >
                    {getFieldDecorator(
                        'reason',
                        {
                            rules: [{ required: true, message: '下架原因为必选' }],
                            initialValue: undefined,
                        },
                    )(
                        <Select
                            placeholder="请选择下架原因"
                            style={{ width: '85%' }}
                        >
                            {
                                unShelveState.map(v => <Option key={v.id} value={v.id}>{v.name}</Option>)
                            }
                        </Select>,

                    )}
                </FormItem>
                <FormItem
                    className="padding-md-bottom"
                    label="备注"
                    {...this.formItemLayout}
                >
                    {getFieldDecorator(
                        'remark',
                    )(

                        <TextArea
                            style={{ width: '85%' }}
                            autosize={{ minRows: 3, maxRows: 3 }}
                        />,
                    )}
                </FormItem>
            </Form>
        );

        const footer = (
            <div>
                <Button onClick={this.modalCancel}>取消</Button>
                <Button onClick={this.saveHandle}>确认</Button>
            </div>
        );

        return (
            <Modal
                title="下架申请"
                width={600}
                destroyOnClose
                // centered
                visible={visible}
                footer={footer}
                maskClosable={false}
                onCancel={this.modalCancel}
                className="pms-lowerShelf"
            >
                {content}
            </Modal>
        );
    }
}

export default Form.create()(logisticsCom);
