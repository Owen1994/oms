import React from 'react';
import { Form, Input } from 'antd';
import CountArea from '../CountArea';

const FormItem = Form.Item;

class ReplyComment extends React.Component {
    render() {
        const { orderNumber, platformId, sellerAccount } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="delay-received">
                <Form>
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
                    <FormItem>
                        {getFieldDecorator('sellerAccount', {
                            initialValue: sellerAccount,
                        })(
                            <Input type="hidden" />,
                        )}
                    </FormItem>
                    <CountArea
                        {...this.props}
                        formItemLayout={{
                            labelCol: { span: 3 },
                            wrapperCol: { span: 21 },
                        }}
                        autosize={{ minRows: 8, maxRows: 8 }}
                        label="回复评价"
                        maxLength={1000}
                        field="replyContent"
                        placeholder="回复内容控制在1000个字符以内，不能出现中文！"
                    />
                </Form>
            </div>
        );
    }
}
export default Form.create()(ReplyComment);
