import React from 'react';
import { Form, Rate, Input } from 'antd';
import CountArea from '../../../common/components/CountArea';

const FormItem = Form.Item;

class CommentAllModal extends React.Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="comment-all-modal">
                <Form>
                    <FormItem
                        label="请选择你的评价星级"
                        className="comment-all-stars"
                    >
                        {getFieldDecorator('stars', {
                            rules: [{
                                required: true,
                                message: '请选择你的评价星级',
                            }],
                            initialValue: 5,
                        })(
                            <Rate />,
                        )}
                    </FormItem>
                    <CountArea
                        {...this.props}
                        autosize={{ minRows: 8, maxRows: 8 }}
                        label="请输入您的评价内容"
                        maxLength={1000}
                        field="replyContent"
                        placeholder="回复内容控制在1000个字符以内，不能出现中文"
                    />
                    <FormItem>
                        {getFieldDecorator('platformId', {
                            initialValue: this.props.platformId,
                        })(
                            <Input type="hidden" />,
                        )}
                    </FormItem>
                </Form>
            </div>
        );
    }
}
export default Form.create()(CommentAllModal);
