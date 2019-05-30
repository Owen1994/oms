import React from 'react';
import {
    Form, Input, DatePicker, message,
} from 'antd';
import moment from 'moment';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

class SyncModal extends React.Component {
    state = {
        activePlatformName: '',
    }

    componentDidMount() {
        const { platform, platformId } = this.props;
        const activePlatform = platform.find(item => `${item.key}` === `${platformId}`);
        this.setState({ activePlatformName: activePlatform.label });
    }

    disabledDate = current => current < moment().subtract(1, 'months').startOf('day') || current > moment().endOf('day')

    handleChange = (dates) => {
        const startDate = dates[0].startOf('day');
        const endDate = dates[1].endOf('day');
        const distantTime = (endDate - startDate) / (1000 * 3600 * 24);
        if (Math.round(distantTime) > 7) {
            setTimeout(() => {
                this.props.form.setFieldsValue({
                    date: [startDate, dates[0].endOf('day')],
                });
            }, 0);
            message.warning('选择日期跨度不能大于7天');
        }
    }

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
                    {
                        this.props.noDatePicker
                            ? null
                            : (
                                <div className="ant-row" style={{ marginTop: 5 }}>
                                    <div className="ant-col-8 ant-form-item-label">
                                        <div className="ant-form-item-required">同步日期：</div>
                                    </div>
                                    <div className="ant-col-12">
                                        <FormItem>
                                            {getFieldDecorator('date', {
                                                rules: [{ required: true, message: '请输入日期' }],
                                            })(
                                                <RangePicker
                                                    disabledDate={this.disabledDate}
                                                    format="YYYY-MM-DD"
                                                    onChange={this.handleChange}
                                                />,
                                            )}
                                        </FormItem>
                                    </div>
                                </div>
                            )
                    }
                </Form>
            </div>
        );
    }
}
export default Form.create()(SyncModal);
