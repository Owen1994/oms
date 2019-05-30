import React from 'react';
import { Form, Tabs } from 'antd';
import { fetchPost } from '../../../../util/fetch';
import { GET_MESSAGE_TEMPDETAIL } from '../constants';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

export default class TempDetail extends React.Component {
    state = {
        tempDetail: [],
    }

    componentDidMount() {
        fetchPost(GET_MESSAGE_TEMPDETAIL, { tempId: this.props.tempId, type: 1 }, 2)
            .then((data) => {
                if (data && data.state === '000001') {
                    this.setState({
                        tempDetail: data.data.data,
                    });
                }
            });
    }

    render() {
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 16 },
        };
        const { tempDetail } = this.state;
        if (tempDetail.length <= 0) {
            return false;
        }
        return (
            <div className="temp-detail">
                {tempDetail.languagesContent.length !== 0
                    ? (
                        <Tabs
                            type="card"
                            tabBarGutter={0}
                            onChange={this.handleLanguageTab}
                        >
                            {tempDetail.languagesContent.map((ele) => {
                                const messageContent = ele.messageContent;
                                return (
                                    <TabPane tab={ele.languagesName} key={ele.languagesId}>
                                        {
                                            // <FormItem
                                            //     {...formItemLayout}
                                            //     label="消息标题"
                                            // >
                                            //     <p>{ele.messageTitle}</p>
                                            // </FormItem>
                                        }
                                        <FormItem
                                            {...formItemLayout}
                                            label="消息内容"
                                        >
                                            <div dangerouslySetInnerHTML={{ __html: messageContent }} />
                                        </FormItem>
                                    </TabPane>
                                );
                            })
                            }
                        </Tabs>
                    )
                    : (
                        <div>
                            <p style={{ color: '#333', fontSize: 14, padding: '0 6px 12px 6px' }}>暂无语种设置</p>
                            {
                                // <FormItem
                                //     {...formItemLayout}
                                //     label="消息标题"
                                // >
                                //     <p>无</p>
                                // </FormItem>
                            }
                            <FormItem
                                {...formItemLayout}
                                label="消息内容"
                            >
                                <p>无</p>
                            </FormItem>
                        </div>
                    )

                }
            </div>
        );
    }
}
