import React from 'react';
import { Row, Col, Select, message, Input } from 'antd';
import { randNum } from '../../../../util/baseTool';

const Option = Select.Option;

export default class Chat extends React.Component {
    copyOrderNumber = () => {
        this.copyRef.select();
        try {
            if (document.execCommand("Copy")) {
                message.success("复制成功！");  
            } else {
                message.success("复制失败！请手动复制！");
            }
        } catch(err) {
            message.waning("复制失败！请手动复制！")
        }
    }

    render() {
        const {
            recordData, orderNumberArr, operateType, msgTypeArr, messageType, selectedOrderNumber,
        } = this.props;
        const messageInfo = !msgTypeArr.includes(operateType)
            ? (
                <div className="reply-record-info">
                    <div>
                        <div className="label">
                            <span>邮件标题：</span>
                        </div>
                        <div className="content messagelist-mail-title">
                            <div>{recordData.emailTitle}</div>
                        </div>
                    </div>
                    <div className="seller-account">
                        <div className="label">
                            <span>卖家账号：</span>
                        </div>
                        <div className="content">
                            <div>{recordData.sellerAccount}</div>
                        </div>
                    </div>
                    <div className="seller-email">
                        <div className="label">
                            <span>卖家邮箱：</span>
                        </div>
                        <div className="content">
                            <div>{recordData.sellerEmail}</div>
                        </div>
                    </div>
                    <div>
                        <div className="label">
                            <span>买家邮箱：</span>
                        </div>
                        <div className="content">
                            <div>{recordData.buyerEmail}</div>
                        </div>
                    </div>
                </div>
            )
            : (
                <div className="chat-box-view overflow-hidden">
                    <div className="chat-info-left">
                        <Row>
                            <Col span={6} style={{ textAlign: 'right' }}>
                                <span>卖家账号：</span>
                            </Col>
                            <Col span={12}>
                                <div>{recordData.sellerAccount}</div>
                            </Col>
                        </Row>
                        <Row style={{ paddingTop: 10 }}>
                            <Col span={6} style={{ textAlign: 'right' }}>
                                <span>买家账号：</span>
                            </Col>
                            <Col span={12}>
                                <div>{recordData.buyerAccount}{recordData.buyerNickname ? `（${recordData.buyerNickname}）` : ''}</div>
                            </Col>
                        </Row>
                    </div>
                    <div>
                        {operateType === '1' && orderNumberArr.length > 0 && messageType !== 2
                            ? (
                                <Row style={{ paddingTop: 10 }}>
                                    <Col span={6} style={{ textAlign: 'right', paddingTop: 7 }}>
                                        <span>{messageType === 1 ? '订单编号' : '商品id'}：</span>
                                    </Col>
                                    <Col span={14}>
                                        <Select
                                            value={selectedOrderNumber}
                                            style={{ width: '100%' }}
                                            onChange={this.props.handleChangeOrderNum}
                                        >
                                            {orderNumberArr
                                                ? orderNumberArr.map(item => <Option key={randNum()} value={item}>{item}</Option>)
                                                : null
                                            }
                                        </Select>
                                    </Col>
                                    <Col span={4} className='message-copy'>
                                        {/* type设为hidden会使document.execCommand方法失效 */}
                                        <Input className='copy-input' value={selectedOrderNumber} ref={copys => this.copyRef = copys} />
                                        <span onClick={this.copyOrderNumber}>复制</span>
                                    </Col>
                                </Row>
                            )
                            : null
                        }
                    </div>
                </div>
            );
        return (
            <div>
                {messageInfo}
            </div>
        );
    }
}
