import React, { Component } from 'react';
import {
    Form, Radio, message,
} from 'antd';
import Emailinput from './Emailinput';
import Emailpassword from './Emailpassword';
import Verificationcode from './Verificationcode';
import { fetchPost } from '../../../../util/fetch';
import { GET_VALIDATE_CODE } from '../constants';
import { strTrim } from '../../../../util/baseTool';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class App extends Component {
    state = {
        emailTypeDisabled: false, // 当编辑时邮箱类型不让选择
        initialValueEmailType: 1,
        detail: {},
        isEye: true, // 控制密码是否可见参数
        btnLoading: false,
    }

    componentDidMount() {
        const { item } = this.props;
        if (item.emailType) {
            this.setState({
                initialValueEmailType: item.emailType,
            });
        }
        if (item.operationType === 1) {
            this.setState({
                emailTypeDisabled: true,
                isEye: false,
            });
        }
        if (item.operationType === 1 && item.emailType === 1) {
            this.setState({
                detail: {
                    email: item.emailBinding[0].email,
                },
            });
        } else if (item.operationType === 1 && item.emailType === 2) {
            this.setState({
                detail: {
                    email: item.emailBinding[1].email,
                },
            });
        }
    }

    onChangePassword = () => {
        this.setState({
            isEye: true,
        });
    }

    // 点击获取验证码回调
    onGetCode = (timer) => {
        const { getFieldValue } = this.props.form;
        const emailPrefix = getFieldValue('emailPrefix');
        const emailSuffix = getFieldValue('emailSuffix');
        const email = `${emailPrefix}@${emailSuffix}`;
        let emailPwd = getFieldValue('emailPwd');
        emailPwd = emailPwd === undefined ? '' : getFieldValue('emailPwd');
        if (!emailPrefix || !strTrim(emailPrefix)) {
            message.warning('邮箱前缀不能为空');
            return;
        }
        if (!emailSuffix) {
            message.warning('邮箱后缀不能为空');
            return;
        }
        if (!emailPwd || !strTrim(emailPwd)) {
            message.warning('邮箱密码不能为空');
            return;
        }
        this.setState({ btnLoading: true });
        fetchPost(GET_VALIDATE_CODE, { email, emailPwd }, 1).then((data) => {
            if (data && data.state === '000001') {
                timer();
            }
            this.setState({ btnLoading: false });
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { detail, isEye, btnLoading } = this.state;
        const { emailTypeDisabled, initialValueEmailType } = this.state;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 19 },
        };
        return (
            <div className="email-binding-detail">
                <FormItem
                    {...formItemLayout}
                    label="邮箱类型"
                >
                    {getFieldDecorator('emailType', {
                        initialValue: initialValueEmailType,
                    })(
                        <RadioGroup onChange={this.onChange}>
                            <Radio disabled={emailTypeDisabled} value={1}>主邮箱</Radio>
                            <Radio disabled={emailTypeDisabled} value={2}>辅邮箱</Radio>
                        </RadioGroup>,
                    )}
                </FormItem>
                <Emailinput
                    {...this.props}
                    emailTypeDisabled={emailTypeDisabled}
                    detail={detail}
                />
                <Emailpassword
                    {...this.props}
                    detail={detail}
                    isEye={isEye}
                    onChangePassword={this.onChangePassword}
                />
                <Verificationcode
                    {...this.props}
                    onGetCode={this.onGetCode}
                    btnLoading={btnLoading}
                />
            </div>
        );
    }
}

export default Form.create()(App);
