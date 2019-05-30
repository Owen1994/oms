import React from 'react';
import { Form, Tabs } from 'antd';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

export default class TempDetail extends React.Component {
    render() {
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 16 },
        };
        const { tempDetail } = this.props;
        if (JSON.stringify(tempDetail) === '{}') {
            return false;
        }
        if (Object.keys(tempDetail).length <= 0) {
            return false;
        }
        return (
            <div className="select-temp-detail">
                {JSON.stringify(tempDetail) !== '{}'
                    ? (
                        <Tabs
                            type="card"
                            tabBarGutter={0}
                            onChange={this.handleLanguageTab}
                        >
                            {tempDetail.data.languagesContent.map(ele => (
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
                                        <p>{ele.messageContent}</p>
                                    </FormItem>
                                </TabPane>
                            ))}
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
