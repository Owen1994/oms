import React from 'react';
import { Form, Input } from 'antd';
import CountArea from '../../../common/components/CountArea';

const FormItem = Form.Item;

class ReplyCommentModal extends React.Component {
    render() {
        const { platformId, sellerAccount, orderNumber } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="reply-comment-modal">
                <Form>
                    <CountArea
                        {...this.props}
                        autosize={{ minRows: 8, maxRows: 8 }}
                        label="回复内容"
                        maxLength={1000}
                        field="replyContent"
                        placeholder="回复内容控制在1000个字符以内，不能出现中文"
                    />
                    <FormItem>
                        {getFieldDecorator('platformId', {
                            initialValue: platformId,
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
                    <FormItem>
                        {getFieldDecorator('orderNumber', {
                            initialValue: orderNumber,
                        })(
                            <Input type="hidden" />,
                        )}
                    </FormItem>
                </Form>
            </div>
        );
    }
}
export default Form.create()(ReplyCommentModal);
