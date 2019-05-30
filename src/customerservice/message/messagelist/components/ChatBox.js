import React, { Component } from 'react';
import { Form } from 'antd';
import RecordChatBox from '../../../common/components/RecordChatBox';

class ChatBox extends Component {
    render() {
        const { loading } = this.props;
        return (
            <div className="breadcrumb padding-sm overflow-hidden margin-sm-top customer-chat-box">
                {
                    !loading
                        ? (
                            <div>
                                <RecordChatBox
                                    {...this.props}
                                    autosize={{ minRows: 10, maxRows: 12 }}
                                />
                            </div>
                        )
                        : <p>暂无数据</p>
                }
            </div>
        );
    }
}
export default Form.create()(ChatBox);
