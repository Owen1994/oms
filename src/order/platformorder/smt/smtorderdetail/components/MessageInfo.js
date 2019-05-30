/**
 * 作者: pzt
 * 描述: 速卖通详情页留言信息组件
 * 时间: 2018/4/18 20:28
 **/
import React, {Component} from 'react'
import {render} from 'react-dom'
import {connect} from 'react-redux'
import {
    Form,
    Input,
    Row,
    Col
} from 'antd'
const FormItem = Form.Item

import '../css/css.css'


class MessageInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="newCluenk message-info">
                <div className="title" id='client-msg' ref={'clientMsg'}>留言信息</div>
                <div className="content client-msg">
                    <Row className={'margin-ms-top'}>
                        <Col span={24}>
                            <p className={"text-center"} >暂无留言</p>
                        </Col>
                    </Row>
                    {/* <Row style={{margin: '20px 0'}} >
                        <Col span={24} className={"buyer"}>
                            <div className={"basic-info"}>
                                <div className={"head"}>买家</div>
                                <div className={"info"}>
                                    <p style={{color: '#333', fontSize:'14px'}}>YAROSLAV ZAITSEV</p>
                                    <p>18/03/06 0259</p>
                                </div>
                            </div>
                            <div className={"chat-detail"}>
                                hi, gladly if the order arrives I make the payment, wait 3 days before returning me the money if it arrives in that time
                            </div>
                        </Col>
                    </Row>
                    <Row style={{margin: '20px 0'}} >
                        <Col span={24} className={"saler"}>
                            <div className={"basic-info"}>
                                <div className={"head"}>Me</div>
                                <p>18/03/06 0259</p>
                            </div>
                            <div className={"chat-detail"}>
                                hi, gladly if the order arrives I make the payment, wait 3 days before returning me the money if it arrives in that time
                            </div>
                        </Col>
                    </Row>*/}
                </div>
            </div>
        );
    }
}

export default MessageInfo
