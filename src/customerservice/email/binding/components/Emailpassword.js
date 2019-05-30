import React, { Component } from 'react';
import { Form, Input, Icon } from 'antd';

const FormItem = Form.Item;

class App extends Component {
    state = {
        eyeColor: '#ccc',
        inputType: 'password',
    };

    /* 点击眼睛图标改变图标验收与type类型
    * inputType - input表单类型
    * */
    onClickEye = (inputType) => {
        if (inputType === 'password') {
            this.setState({
                eyeColor: '#4D7BFE',
                inputType: '',
            });
        } else {
            this.setState({
                eyeColor: '#ccc',
                inputType: 'password',
            });
        }
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { isEye, onChangePassword } = this.props;
        const { eyeColor, inputType } = this.state;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 19 },
        };
        return (
            <div className="mt12">
                {/* 解决火狐等浏览器会记住账户密码的机制 */}
                {/* <Input type="text" style={{ display: 'none' }} />
                <Input name="emailPwd" type="password" style={{ display: 'none' }} /> */}

                <FormItem
                    {...formItemLayout}
                    label="邮箱密码"
                    required
                >
                    {getFieldDecorator('emailPwd', {
                        rules: [
                            {
                                required: true,
                                message: '请输入邮箱密码.',
                            },
                        ],
                    })(
                        <Input
                            autoComplete="new-password"
                            type={inputType}
                            suffix={
                                isEye ? <Icon type="eye" onClick={() => this.onClickEye(inputType)} style={{ color: eyeColor }} /> : null
                            }
                            onChange={onChangePassword}
                        />,
                    )}
                </FormItem>
            </div>
        );
    }
}

export default App;
