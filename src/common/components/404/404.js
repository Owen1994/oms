/**
*作者: 任贸华
*功能描述: 页面
*参数说明:
*时间: 2018/4/16 10:47
*/
import React from 'react'
import './404.css';
import { Link } from 'react-router-dom'


class NotFound extends React.Component {
    //返回按钮
    returnprev = () => {
        this.props.history.goBack();
    }
    render() {

        return (
            <div className="yks-error-box">
                <div className="yks-error-404">
                    <div className="yks-error-text">
                        <p className="yks-error-text-404"></p>
                        <p className="yks-error-text-error"></p>
                        <p>落叶归根，飘自何方，好在你有<strong className="text-logo"><span>T</span>Cloud</strong></p>
                        <p className="yks-error-text-link">您可以稍后再尝试
                            <a onClick={this.returnprev}>返回上一页</a>,或者
                            <Link to={"/"}>跳转至首页.</Link>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default NotFound