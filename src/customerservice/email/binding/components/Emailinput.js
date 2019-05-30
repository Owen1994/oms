import React, { Component } from 'react';
import {
    Form, Input, Select, Icon,
} from 'antd';

import { getEmailSuffix } from '../constants';
import { getEmailFix } from '../../../../utils';

const FormItem = Form.Item;
const Option = Select.Option;

class App extends Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        const { detail, emailTypeDisabled } = this.props;
        return (
            <div className="mt6 ant-row ant-form-item">
                <div className="ant-col-4 ant-form-item-label">
                    <div className="ant-form-item-required">邮箱地址：</div>
                </div>
                <div className="ant-col-19 ant-form-item-control-wrapper">
                    <FormItem className="email-prefix pull-left">
                        {getFieldDecorator('emailPrefix', {
                            initialValue: JSON.stringify(detail) !== '{}' ? getEmailFix(detail.email, 1) : null,
                            rules: [
                                {
                                    required: true,
                                    message: '请输入邮箱前缀.',
                                },
                            ],
                        })(
                            <Input disabled={emailTypeDisabled} placeholder="邮箱前缀" autoComplete="off" />,
                        )}
                    </FormItem>
                    <div className="email-at pull-left">@</div>
                    <FormItem className="email-suffix pull-left">
                        {getFieldDecorator('emailSuffix', {
                            initialValue: JSON.stringify(detail) !== '{}' ? getEmailFix(detail.email, 2) : null,
                            rules: [
                                {
                                    required: true,
                                    message: '请选择邮箱后缀.',
                                },
                            ],
                        })(
                            <Select
                                disabled={emailTypeDisabled}
                                style={{ width: 145 }}
                                placeholder="邮箱后缀"
                            >
                                {getEmailSuffix.map(item => (
                                    <Option key={item.key} value={item.value}>{item.value}</Option>
                                ))}
                            </Select>,
                        )}
                    </FormItem>
                    <div className="email-binding-question pull-left"><a href="https://erp.youkeshu.com/download/customer/1545386388.doc" download="邮箱绑定错误操作指引"><Icon type="question-circle" /></a></div>
                </div>
            </div>
        );
    }
}

export default App;
