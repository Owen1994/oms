import React from 'react';
import { Form, Button } from 'antd';
import { toLoginNormal } from 'util/AuthUtil';
import './css/css.css'
export default class ContradictionComponent extends React.Component {
    timer;
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        //控制浏览器后退事件操作
        window.addEventListener("popstate", () => this.jumpTo('/', 'loginContradiction', '-1'), false);
        //控制浏览器刷新事件操作
        window.addEventListener("beforeunload", () => this.jumpTo('/', 'loginContradiction', '-1'), false)
    }

    // 点击返回登录页按钮
    handleLogin = () => {
        this.jumpTo('/login/normal/', 'loginContradiction', '-1');
    };

    // 点击跳转到修改密码页
    handleChangePSW = () => {
        this.jumpTo('/login/forget/', 'fpwd', '1');
    }

    // 跳转
    jumpTo = (url, key, value) => {
        location.href = url;
        if(key){
            sessionStorage.setItem(key, value);
        }
        this.removeAndClear();
    }

    // 清除sessionStorage及定时器
    removeAndClear = () => {
        sessionStorage.removeItem('loginContradiction');
        sessionStorage.removeItem('loginContradictionMsg');
        clearInterval(this.timer);
        this.timer = null;
    }

    componentWillUnmount(){
        sessionStorage.setItem('loginContradiction', '-1');
        sessionStorage.setItem('fpwd', '-1');
        // 清除后退事件监听
        window.removeEventListener("popstate", () => this.jumpTo('/'), false);
        // 清除刷新事件监听
        window.removeEventListener("beforeunload", () => this.jumpTo('/'), false);
    }
    render(){
        const loginContradictionMsg = sessionStorage.getItem('loginContradictionMsg');
        if (!loginContradictionMsg) {
            location.href = '/login/normal/';
            return null;
        }
        return (
            <div className="yks-contradiction">
                <div className="yks-contradiction-text">
                    <div className="yks-contradiction-text-top"></div>
                    <div className="yks-contradiction-text-bottom">
                        <div className="yks-contradiction-text-bottom-font">
                            <p> {loginContradictionMsg}
                                <a onClick={() => this.handleChangePSW()}>修改密码</a>。
                            </p>
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
