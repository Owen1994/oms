import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';

const FormItem = Form.Item;

const defaultTimer = 60;

class App extends Component {
    state = {
        textDisabled: true,
        btnDisabled: false,
        btnText: '获取验证码',
        time: defaultTimer,
    }

    count = () => {
        let { time } = this.state;
        const siv = setInterval(() => {
            this.setState(
                {
                    time: (time--),
                    btnText: `${time}秒后重新获取`,
                    textDisabled: false,
                    btnDisabled: true,
                },
                () => {
                    if (time === 0) {
                        clearInterval(siv);
                        this.setState({
                            btnText: '重新发送',
                            time: defaultTimer,
                            btnDisabled: false,
                        });
                    }
                },
            );
        }, 1000);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const {
            textDisabled, btnText, btnDisabled,
        } = this.state;
        return (
            <div className="mt12 ant-row ant-form-item">
                <div className="ant-col-4 ant-form-item-label">
                    <div className="ant-form-item-required">验证码：</div>
                </div>
                <div className="ant-col-19 ant-form-item-control-wrapper">
                    <FormItem className="email-validate-code">
                        {getFieldDecorator('emailValidateCode', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入验证码.',
                                },
                            ],
                        })(
                            <Input disabled={textDisabled} />,
                        )}
                    </FormItem>
                    <div className="ant-row ant-form-item email-validate-code-btn">
                        <Button
                            type="primary"
                            disabled={btnDisabled}
                            onClick={() => { this.props.onGetCode(this.count); }}
                            loading={this.props.btnLoading}
                        >
                            {btnText}
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
