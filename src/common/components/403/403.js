/**
*作者: 任贸华
*功能描述: 页面
*参数说明:
*时间: 2018/4/16 10:47
*/
import React from 'react'
import './403.css';
import { Link } from 'react-router-dom'
import { Button } from 'antd'


class NotFound extends React.Component {
    //返回按钮
    returnprev = () => {
        this.props.history.goBack();
    }
    render() {

        return (
            <div className="yks-error-box">
                <div className="yks-error-403">
                    <div className="yks-error-text-403">
                        <p className="yks-error-text-info">抱歉，你无权访问该页面!</p>
                        <p className="yks-error-text-btn"><Button type="primary">请联系自己所在部门的管理员!</Button></p>
                    </div>
                </div>
            </div>
        )
    }
}

export default NotFound