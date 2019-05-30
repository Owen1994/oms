import React from 'react';
import { Form, Button } from 'antd';
import './css/css.css'
class ForgetPwdComponent extends React.Component {
    timer;
    constructor(props) {
        super(props);
        this.state={
            seconds: 3,
        };
    }
    componentDidMount(){
        this.timer = setInterval(() => {
            this.setState((preState) =>({
                seconds: preState.seconds - 1,
            }),() => {
                if(this.state.seconds <= 0){
                    sessionStorage.setItem('overTime', '-1');
                    clearInterval(this.timer);
                    this.timer = null;
                    window.location.href = "/login/normal/";
                }
            });
        }, 1000)
        //控制浏览器后退事件操作
        window.addEventListener("popstate",() => {
            sessionStorage.setItem('overTime', '-1');
            window.location.href = "/login/normal/";
        })
    }


    handleLogin = () => {
        sessionStorage.setItem('overTime', '-1');
        window.location.href = "/login/normal/";
    };


    componentWillUnmount(){
        if(this.timer){
            clearInterval(this.timer);
            this.timer = null;
        }
        window.removeEventListener("popstate",() => {
            sessionStorage.setItem('overTime', '-1');
            window.location.href = "/login/normal/";
        },false);
    }
    render(){
        return (
            <div className="yks-overtime">
                <div className="yks-overtime-text">
                    <div className="yks-overtime-text-left"></div>
                    <div className="yks-overtime-text-right">
                        <div className="yks-overtime-text-right-font">
                            <p>对不起，您的登录时间已经超时 </p>
                            <p>{this.state.seconds}秒后自动跳转登录</p>
                            <Button type="primary" onClick={this.handleLogin}>
                                <i className="relogin"></i>
                                重新登录
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Form.create()(ForgetPwdComponent)
