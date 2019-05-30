import React from 'react';
import { Form, Input, Button,message } from 'antd';
import './css/css.css'
import { fetchPost } from '../../util/fetch'
const FormItem = Form.Item;
const phoneReg = /^1(3|4|5|7|8)\d{9}$/;
const pwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/

class ForgetPwdComponent extends React.Component {
    timer;
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            count: 60,//秒数初始化为60秒
            liked: true,//文案默认为"获取验证码"
        }
    }

    componentDidMount() {
        //控制浏览器后退事件操作
        window.addEventListener("popstate", () => {
            sessionStorage.setItem('fpwd', -1);
            window.location.href = "/login/normal/";
        });
        this.timer = setTimeout(() => {
            this.props.form.setFieldsValue({'userName':'cl', 'newPwd':'cl'});
            this.props.form.resetFields();
        }, 200);
    }



    //获取短信验证码
    handleCode = () =>{
        let phone = this.props.form.getFieldValue("mobile");
        let username = this.props.form.getFieldValue("userName");
        if(phoneReg.test(phone) && username){
            fetchPost("/urc/motan/service/api/IUrcService/resetPwdGetVerificationCode", {userName:username,mobile:phone}, 2).then(res=>{
                if(res && res.state === "000001"){
                    if (!this.state.liked) {
                        return
                    }
                    let count = this.state.count;
                    const timer = setInterval(() => {
                        this.setState({
                            count: (count--),
                            liked:false,
                        }, () =>{
                            if (count <= 0) {
                                clearInterval(timer);
                                this.setState({
                                    liked: true ,
                                    count: 60
                                })
                            }
                        });
                    }, 1000);
                }
            });
            return true;
        }else{
            message.error("手机号输入格式有误和用户名不能为空和手机号不能为空！");
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
             let newPwd = values.newPwd;
             let newPwd1 = values.newPwd1;
             if(!pwdReg.test(newPwd)){
                 message.error("新密码和确认密码格式不正确！");
                 return false
             }
             if(newPwd !== newPwd1){
                 message.error("新密码和确认密码不一样！");
                 return false;
             }
            if (!err) {
                this.setState({
                    loading:true
                })
                fetchPost("/urc/motan/service/api/IUrcService/resetPwdSubmit", values, 2).then(res=> {
                    if (res && res.state === "000001") {
                        message.success(res.msg);
                        setTimeout(() => {
                            sessionStorage.setItem('fpwd', '');
                            location.pathname='/';
                            location.reload();
                            this.setState({
                                loading:false
                            })
                        }, 1000);
                    }else{
                        this.setState({
                            loading:false
                        })
                    }
                })
            }
        })
    }
    componentWillUnmount(){
        window.removeEventListener("popstate",() => {
            sessionStorage.setItem('fpwd', -1);
            window.location.href = "/login/normal/";
        },false);

        if(this.timer){
            clearTimeout(this.timer);
            this.timer = null;
        }
    }



    render(){
        const {getFieldDecorator} = this.props.form;
        const loading = this.state.loading
        return (
            <div className="yks-forget">
                <div className="yks-forget-text">
                    <div className="yks-login-logo-forget"></div>
                    <Form className="login-form" onSubmit={this.handleSubmit}>
                        <div className="margin-md-top margin-md-top-1366">
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
                        </div>
                        <div className="margin-md-top">
                            <FormItem>
                                {getFieldDecorator('mobile', {
                                    rules: [{required: true, message: '手机号不能为空!'}],
                                })(
                                    <Input className={"user-mobile"}
                                           type="text"
                                           placeholder="请输入您的手机号"
                                    />
                                )}
                            </FormItem>
                        </div>
                        <div className="yks-login-logo-forget-code margin-md-top clearfix">
                            <FormItem>
                                {getFieldDecorator('verificationCode', {
                                    rules: [{required: true, message: '验证码不能为空!'}],
                                })(
                                    <Input className={"user-Code"}
                                           type="text"
                                           placeholder="验证码"
                                    />
                                )}
                            </FormItem>
                            <Button type="button" className="code" onClick={this.handleCode} disabled={!this.state.liked}>
                                {
                                    this.state.liked
                                    ?
                                    <span>获取验证码</span>
                                    :
                                    <span className="count_second">{this.state.count + 's'}</span>
                                }
                            </Button>
                        </div>
                        <div className="margin-md-top">
                            <FormItem>
                                {getFieldDecorator('newPwd', {
                                    rules: [{required: true, message: '新密码不能为空!'}],
                                })(
                                    <Input className={"user-newPwd"}
                                           type="password"
                                           placeholder="新密码"
                                    />
                                )}
                            </FormItem>
                        </div>
                        <div className="margin-md-top">
                            <FormItem>
                                {getFieldDecorator('newPwd1', {
                                    rules: [{required: true, message: '确认新密码不能为空!'}],
                                })(
                                    <Input className={"user-newPwd1"}
                                           type="password"
                                           placeholder="确认新密码"
                                    />
                                )}
                            </FormItem>
                        </div>
                        <div className="margin-md-top">
                            <Button type="primary" className="yks-login-logo-forget-login " htmlType="submit"  loading={loading}>提交</Button>
                        </div>
                        <div className="margin-md-top">
                            <Button className="yks-login-logo-forget-login" onClick={() => {
                                sessionStorage.setItem('fpwd', '');
                                location.pathname='/login/normal/';
                            }}>登录</Button>
                        </div>
                    </Form>
                </div>
            </div>
        )
    }
}

export default Form.create()(ForgetPwdComponent)