import React from 'react';
import { Form, Input, DatePicker } from 'antd';
import moment from 'moment';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

class SyncEmail extends React.Component {
    state = {
        activePlatformName: '',
    }

    componentDidMount() {
        const { platform, platformId } = this.props;
        const activePlatform = platform.find(item => item.key === +platformId);
        this.setState({ activePlatformName: activePlatform.label });
    }

    disabledDate = current => current > moment().endOf('day')

    render() {
        const { activePlatformName } = this.state;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 12 },
        };
        return (
            <div className="sync-email">
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label="平台"
                    >
                        <span>{ activePlatformName }</span>
                    </FormItem>
                </Form>
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label="同步账号"
                    >
                        {getFieldDecorator('account', {
                            rules: [{ required: true, message: '请输入同步账号' }],
                        })(
                            <Input placeholder="请输入同步账号" />,
                        )}
                    </FormItem>
                </Form>
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label="同步日期"
                    >
                        {getFieldDecorator('date', {
                            rules: [{ required: true, message: '请输入同步日期' }],
                        })(
                            <RangePicker
                                disabledDate={this.disabledDate}
                                format="YYYY-MM-DD"
                                // onChange={this.handleChange}
                                // style={{ width: 344 }}
                            />,
                        )}
                    </FormItem>
                </Form>
            </div>
        );
    }
}
export default Form.create()(SyncEmail);
