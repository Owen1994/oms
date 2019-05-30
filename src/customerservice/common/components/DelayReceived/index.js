import React from 'react';
import { Form, Input, InputNumber } from 'antd';

const FormItem = Form.Item;

class DelayReceived extends React.Component {
    render() {
        const { orderNumber, account, platformId, delayCountDown, orderStatus } = this.props;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 12 },
        };
        return (
            <div className="delay-received">
                <Form>
                    <FormItem>
                        {getFieldDecorator('account', {
                            initialValue: account,
                        })(
                            <Input type="hidden" />,
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('platformId', {
                            initialValue: platformId,
                        })(
                            <Input type="hidden" />,
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('orderNumber', {
                            initialValue: orderNumber,
                        })(
                            <Input type="hidden" />,
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="订单编号"
                    >
                        <span>{orderNumber}</span>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="延迟时间"
                    >
                        {getFieldDecorator('delayTime', {
                            rules: [{
                                required: true,
                                message: '请输入延迟时间',
                            }],
                        })(
                            <InputNumber placeholder="请输入" precision={0} min={1} style={{ width: 160 }} />,
                        )}
                    </FormItem>
                    {
                        orderStatus === '等待买家收货'
                            ? (
                                <FormItem
                                    {...formItemLayout}
                                    label="剩余收货时间"
                                >
                                    <span style={{ color: 'red' }}>{delayCountDown}</span>
                                </FormItem>
                            ) : null
                    }
                </Form>
            </div>
        );
    }
}
export default Form.create()(DelayReceived);
