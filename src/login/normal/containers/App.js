/**
 *作者: 任贸华
 *功能描述: 登录渲染组件
 *参数说明:
 *时间: 2018/4/16 11:05
 */
import React from 'react';
import '../css/css.css';
import {
    Form, Input, Button, Checkbox, message
} from 'antd';
import * as config from "util/connectConfig";
import {
    setCookie, 
    objTodata, 
    getDeviceName,
} from 'util/baseTool';
import { version } from '@/constants/config';

const FormItem = Form.Item;
const BUILD_ARGVS = process.env.BUILD_ARGVS

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        }
    }

    /**
     *作者: 任贸华
     *功能描述: 登录提交请求
     *参数说明:
     *时间: 2018/4/17 11:04
     */
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({
                    loading:true
                })
                values.deviceName = getDeviceName();
                delete values.remember;
                const params = objTodata(values);
                const  url = `${config.api_url}/urc/motan/service/api/IUrcService/login`;
                fetch(url,{
                        method: 'POST',
                        headers:{
                            'paramType': '2',
                            'group': 'rpc-service-group-' + BUILD_ARGVS,
                            'prefix': 'com.yks',
                            'version': version,
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body:params
                    }
                ).then(response => response.json()).then(result => {
                    if (result.state == '000001') {
                        const session = JSON.stringify(result.data);
                        setCookie('session', escape(session));
                        location.href = '/index/';
                        const lastHref = sessionStorage.getItem('lastHref');
                        if (lastHref) {
                            sessionStorage.removeItem('lastHref');
                            location.href = lastHref;
                        }
                        // OMS公告标记
                        sessionStorage.setItem('orderNotice', 1);
                        this.setState({
                            loading:false
                        });
                    }else{
                        this.setState({
                            loading:false
                        });
                        message.error(result.msg);
                    }
                }).catch(e => {
                    console.log(e);
                })
            }
        });
    };

    componentDidMount(){
        sessionStorage.setItem('fpwd', -1);
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const loading = this.state.loading
        return (
            <div className="yks-login">
                <div className="yks-login-text">
                    <div className="yks-login-logo">
                    </div>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{required: true, message: '用户名不能为空!'}],
                            })(
                                <Input className={"user-name"}
                                       type="text"
                                       placeholder="请输入您的用户名"
                                />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('pwd', {
                                rules: [{required: true, message: '密码不能为空!'}],
                            })(
                                <Input className={"user-password"}
                                       type="password"
                                       placeholder="请输入密码"/>
                            )}
                        </FormItem>
                        <FormItem className="login-form-last">
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox className={"user-rememb"}>记住密码</Checkbox>
                            )}
                            <div className={"user-action"}>
                                <a
                                    onClick={() => {
                                            sessionStorage.setItem('fpwd', '1');
                                        }
                                    }
                                    href={"/login/forget/"}>忘记密码</a>
                            </div>
                            <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
                                登 录
                            </Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Form.create()(LoginForm)
