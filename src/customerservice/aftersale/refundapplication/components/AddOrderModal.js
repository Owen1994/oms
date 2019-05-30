import React from 'react';
import { Form, Input } from 'antd';

const FormItem = Form.Item;

class AddOrderModal extends React.Component {
    render() {
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 12 },
        };
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="add-Order-modal">
                <FormItem
                    {...formItemLayout}
                    label="订单编号"
                >
                    {getFieldDecorator('orderNumber', {
                        rules: [{ required: true, message: '请输入订单编号' }],
                    })(
                        <Input placeholder="请输入订单编号" />,
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('platformId', {
                        initialValue: this.props.platformId,
                    })(
                        <Input type="hidden" />,
                    )}
                </FormItem>
            </div>
        );
    }
}
export default Form.create()(AddOrderModal);
