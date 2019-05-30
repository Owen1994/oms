import React, { Component } from 'react';
import { Form } from 'antd';
import CTags from '../../../../components/ctags';
import { COMMENT_TYPE, COMMENT_STATUS } from '../constants';

const FormItem = Form.Item;

class CommentScreen extends Component {
    handleChange = () => {
        this.props.getCommentlist();
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <div className="list-filter-item">
                    <div className="list-filter-item-title">买家评价星级：</div>
                    <FormItem>
                        {getFieldDecorator('stars', {
                            initialValue: [0],
                        })(
                            <CTags
                                list={COMMENT_TYPE}
                                handleChange={this.handleChange}
                            />,
                        )}
                    </FormItem>
                </div>
                <div className="list-filter-item">
                    <div className="list-filter-item-title">评价状态：</div>
                    <FormItem>
                        {getFieldDecorator('status', {
                            initialValue: [1],
                        })(
                            <CTags
                                list={COMMENT_STATUS}
                                handleChange={this.handleChange}
                            />,
                        )}
                    </FormItem>
                </div>
            </div>
        );
    }
}

export default CommentScreen;
