import React from 'react';
import {
    Form, Button, Rate, message,
} from 'antd';
import DelayReceived from '../DelayReceived';
import DisputeOperate from '../DisputeOperate';
import ReplyComment from '../ReplyComment';
import Modal2 from '../../../../components/Modal2';
import { fetchPost } from '../../../../util/fetch';
import { POST_DALAY_RECEIVED, REPLY_EVALUATION, GET_DISPUTE_INFO } from '../../constants';
import Functions from '../../../../components/functions';

class OrderDetail extends React.Component {
    state = {
        disputeData: {
            buyerImgList: [],
            sellerImgList: [],
            isSnad: '',
        },
        delayVisible: false,
        commentVisible: false,
        disputeVisible: false,
        delayConfirmLoading: false,
        commentConfirmLoading: false,
        disputeConfirmLoading: false,
    }

    delayRef = React.createRef();

    replyRef = React.createRef();

    disputeRef = React.createRef();

    // 延迟收货确认回调
    handleDelayOk = () => {
        this.delayRef.current.validateFields((err, values) => {
            if (!err) {
                this.setState({ delayConfirmLoading: true });
                fetchPost(POST_DALAY_RECEIVED, values, 1)
                    .then((data) => {
                        if (data && data.state === '000001') {
                            this.props.getOrderInfo();
                            this.handleCancel('delayVisible');
                        }
                        this.setState({ delayConfirmLoading: false });
                    });
            }
        });
    }

    // 回复评价回调
    handleCommentOk = () => {
        this.replyRef.current.validateFields((err, values) => {
            if (!err) {
                this.setState({ commentConfirmLoading: true });
                fetchPost(REPLY_EVALUATION, { ...values }, 1)
                    .then((data) => {
                        if (data && data.state === '000001') {
                            this.props.getOrderInfo();
                            this.handleCancel('commentVisible');
                        }
                        this.setState({ commentConfirmLoading: false });
                    });
            }
        });
    }

    changeModal = (visible) => {
        this.setState({
            [visible]: true,
        });
    }

    handleDisputeOperate = (visible) => {
        const platformId = this.props.form.getFieldValue('platformId');
        const { issueDetail, recordData } = this.props;
        this.setState({
            disputeData: {
                buyerImgList: [],
                sellerImgList: [],
                isSnad: '',
            },
        }, () => {
            fetchPost(GET_DISPUTE_INFO, {
                platformId,
                issueId: issueDetail.issueId,
                buyerAccount: recordData.buyerAccount,
                sellerAccount: recordData.sellerAccount,
                flag: 'handle',
            }, 2)
                .then((data) => {
                    if (data && data.state === '000001') {
                        // if (data.data.issue_status === 'canceled_issue') {
                        //     message.error('纠纷已取消');
                        //     return;
                        // } if (data.data.issue_status === 'finish') {
                        //     message.error('纠纷已完结');
                        //     return;
                        // }
                        this.setState({
                            disputeData: data.data,
                            [visible]: true,
                        });
                    }
                });
        });
    }

    handleCancel = (visible) => {
        this.setState({
            [visible]: false,
        });
    }

    getDisputeInfo = () => {
        const { issueStatus, issueDetail } = this.props;
        let disputeInfo;
        let disputeOpBtn = null;
        switch(issueStatus) {
            case 'IN_ISSUE':
                disputeOpBtn = (
                    <Functions {...this.props} functionkey="009-000002-000004-006">
                        <Button
                            type="primary"
                            className="order-detail-button"
                            onClick={() => this.handleDisputeOperate('disputeVisible')}
                        >纠纷处理
                        </Button>
                    </Functions>
                );
                disputeInfo = (
                    <div>
                        <div className="info-content">
                            <div>{issueDetail.processDto}</div>
                        </div>
                        <div className="info-content">
                            <div>{issueDetail.content}</div>
                        </div>
                    </div>
                );
                break;
            case 'NO_ISSUE':
                disputeInfo = '暂无纠纷';
                break;
            case 'END_ISSUE':
                disputeInfo = '纠纷已结束';
                break;
            case 'EXCEPTION':
                disputeInfo = '平台接口异常';
                break;
            default:
                disputeInfo = '暂无数据';
                break;
        }
        return { disputeOpBtn, disputeInfo };
    }

    render() {
        const {
            orderDetail,
            commentDetail,
            logisticsDetail,
            issueDetail,
            platformId,
            recordData,
            selectedOrderNumber,
        } = this.props;
        const {
            disputeData,
            delayVisible,
            commentVisible,
            disputeVisible,
            delayConfirmLoading,
            commentConfirmLoading,
            disputeConfirmLoading,
        } = this.state;
        const hasOrderInfo = Object.keys(orderDetail).length > 0;
        const hasCommentInfo = Object.keys(commentDetail).length > 0;
        const hasLogisticInfo = Object.keys(logisticsDetail).length > 0;
        const packageList = logisticsDetail.packageList;
        let replyBtn = null;
        let delayCountDown = null;
        let erpPackageList = '无';
        const { disputeOpBtn, disputeInfo } = this.getDisputeInfo();
        if (hasCommentInfo) {
            if (commentDetail.commentStatus === 'wait') {
                replyBtn = (
                    <Functions {...this.props} functionkey="009-000002-000004-007">
                        <Button
                            type="primary"
                            className="order-detail-button"
                            onClick={() => this.changeModal('commentVisible')}
                        >回复评价
                        </Button>
                    </Functions>
                );
            } else if (commentDetail.commentStatus === 'done') {
                replyBtn = (
                    <Button className="order-detail-button" disabled>已评价</Button>
                );
            }
        }
        if (hasLogisticInfo && packageList && Object.keys(packageList).length) {
            const packageArr = packageList.map((item,index) => {
                // to do:oms接口暂无每个包裹的物流渠道信息，以后有此字段时进行替换
                // return `包裹${index+1}：${item.logisticsChannel}，${item.trackCode1 ? item.trackCode1 : ''}${item.trackCode2 ? '、' + item.trackCode2 : ''}，${item.actualTime}； `;
                return `包裹${index+1}：
                    ${item.erpChannelName}${item.erpChannelCode ? '(' : ''}${item.erpChannelCode ? item.erpChannelCode : ''}${item.erpChannelCode ? ')' : ''}
                    ${item.erpChannelName || item.erpChannelCode ? '，' : ''}
                    ${item.trackCode1}${(item.trackCode1 && item.trackCode2) ? '、' : ''}
                    ${item.trackCode2}${(!item.trackCode1 && !item.trackCode2) ? '' : '，'}
                    ${item.actualTime}${item.erpShippingStatus ? '，' : ''}
                    ${item.erpShippingStatus ? item.erpShippingStatus : ''}； `;
            })
            erpPackageList = packageArr.join('');
        }
        if (hasOrderInfo && orderDetail.orderStatus === '等待买家收货') {
            delayCountDown = (
                <div className="info-content">
                    <div className="label">剩余收货时间：</div>
                    <div className="red-tip">{orderDetail.delayCountDown}</div>
                </div>
            );
        }
        return (
            <div className="order-detail">
                <div className="order-info">
                    <div className="info-capture">
                        <p>订单信息</p>
                        {
                            hasOrderInfo
                                ? (
                                    <Functions {...this.props} functionkey="009-000002-000004-005">
                                        <Button
                                            type="primary"
                                            className="order-detail-button"
                                            onClick={() => this.changeModal('delayVisible')}
                                        >延迟收货
                                        </Button>
                                    </Functions>
                                )
                                : null
                        }
                    </div>
                    {
                        hasOrderInfo
                            ? (
                                <div className="chatbox-pd15">
                                    <div className="info-content">
                                        <div className="label">平台订单编号：</div>
                                        <div>
                                            <span className="message-theme" onClick={() => this.props.handleOpenModal('orderVisible')}>{selectedOrderNumber}</span>
                                        </div>
                                    </div>
                                    <div className="info-content">
                                        <div className="label">平台订单状态：</div>
                                        <div>{orderDetail.orderStatus}</div>
                                    </div>
                                    <div className="info-content">
                                        <div className="label">订单金额：</div>
                                        <div>{`${orderDetail.totalAmountCurrency} ${orderDetail.totalAmount}(实付：${orderDetail.payAmountCurrency} ${orderDetail.payAmount})`}</div>
                                    </div>
                                    <div className="info-content">
                                        <div className="label">订单创建时间：</div>
                                        <div>{orderDetail.orderDate}</div>
                                    </div>
                                    <div className="info-content">
                                        <div className="label">平台发货时间：</div>
                                        <div>{orderDetail.deliveryTime}</div>
                                    </div>
                                    <div className="info-content">
                                        <div className="label">订单结束时间：</div>
                                        <div>{orderDetail.orderEndTime}</div>
                                    </div>
                                    <div className="info-content">
                                        <div className="label">订单SKU：</div>
                                        <div>
                                            {orderDetail.orderSku
                                                ? orderDetail.orderSku.map((item, index) => {
                                                    const dot = index === 0 ? '' : '、';
                                                    return <span key={item.skuCode}>{`${dot}${item.skuCode}(${item.currency} ${item.amount})×${item.skuNum}`}</span>;
                                                })
                                                : null
                                            }
                                        </div>
                                    </div>
                                    <div className="info-content">
                                        <div className="label">收件人地址：</div>
                                        <div>{orderDetail.addresseeAddr}</div>
                                    </div>
                                    <div className="info-content">
                                        <div className="label">订单留言：</div>
                                        <div>{orderDetail.orderMessage}</div>
                                    </div>
                                    <div className="info-content">
                                        <div className="label">平台物流状态：</div>
                                        <div>{orderDetail.logisticsStatus}</div>
                                    </div>
                                    <div className="info-content">
                                        <div className="label">冻结状态：</div>
                                        <div>{orderDetail.freezingStatus}</div>
                                    </div>
                                    {delayCountDown}
                                </div>
                            )
                            : <div className="chatbox-pd15">暂无数据</div>
                    }
                </div>
                <div className="logistics-info">
                    <div className="info-capture">
                        <p>物流信息</p>
                    </div>
                    {
                        hasLogisticInfo
                            ? (
                                <div className="chatbox-pd15">
                                    <div className="info-content">
                                        <div className="label">老ERP物流信息：</div>
                                        <div>{erpPackageList}</div>
                                    </div>
                                    <div className="info-content">
                                        <div className="label">平台物流单号：</div>
                                        <div>{logisticsDetail.logisticsNumber}</div>
                                    </div>
                                    <div className="info-content">
                                        <div className="label">平台物流渠道：</div>
                                        <div><a href="https://www.17track.net/zh-cn" target="_blank" rel="noopener noreferrer">{logisticsDetail.logisticsChannel}</a></div>
                                    </div>
                                    <div className="info-content">
                                        <div className="label">物流服务编码：</div>
                                        <div>{logisticsDetail.internationalLogisticsType}</div>
                                    </div>
                                    <div className="info-content">
                                        <div className="label">国际运单号：</div>
                                        <div>{logisticsDetail.internationalLogisticsNum}</div>
                                    </div>
                                    <div className="info-content">
                                        <div className="label">运费：</div>
                                        <div>{logisticsDetail.logisticsFee}</div>
                                    </div>
                                </div>
                            )
                            : <div className="chatbox-pd15">暂无数据</div>
                    }

                </div>
                <div className="dispute-info">
                    <div className="info-capture">
                        <p>纠纷信息</p>
                        {disputeOpBtn}
                    </div>
                    <div className="chatbox-pd15">{disputeInfo}</div>
                </div>
                <div className="comment-info">
                    <div className="info-capture">
                        <p>评价信息</p>
                        {replyBtn}
                    </div>
                    {
                        hasCommentInfo
                            ? (
                                <div className="chatbox-pd15">
                                    <div className="info-content">
                                        <div className="label comment-stars">评价星级：</div>
                                        <Rate value={Number(commentDetail.commentStars)} disabled />
                                    </div>
                                    <div className="info-content">
                                        <div className="label">评价内容：</div>
                                        <div>{commentDetail.commentContent}</div>
                                    </div>
                                </div>
                            )
                            : <div className="chatbox-pd15">暂无数据</div>
                    }
                </div>
                {/* 延迟收货 */}
                <Modal2
                    component={
                        (
                            <DelayReceived
                                orderNumber={selectedOrderNumber}
                                account={recordData.sellerAccount}
                                platformId={platformId}
                                delayCountDown={orderDetail.delayCountDown}
                                orderStatus={orderDetail.orderStatus}
                                ref={this.delayRef}
                            />
                        )
                    }
                    title="延迟收货"
                    visible={delayVisible}
                    handleOk={this.handleDelayOk}
                    handleCancel={() => this.handleCancel('delayVisible')}
                    confirmLoading={delayConfirmLoading}
                />
                {/* 回复评价 */}
                <Modal2
                    component={
                        (
                            <ReplyComment
                                orderNumber={selectedOrderNumber}
                                platformId={platformId}
                                sellerAccount={recordData.sellerAccount}
                                ref={this.replyRef}
                            />
                        )
                    }
                    title="回复评价"
                    visible={commentVisible}
                    handleOk={this.handleCommentOk}
                    handleCancel={() => this.handleCancel('commentVisible')}
                    confirmLoading={commentConfirmLoading}
                    width={600}
                />
                {/* 纠纷处理 */}
                <Modal2
                    component={
                        (
                            <DisputeOperate
                                platformId={platformId}
                                sellerAccount={recordData.sellerAccount}
                                buyerAccount={recordData.buyerAccount}
                                issueId={issueDetail.issueId}
                                disputeData={disputeData}
                                ref={this.disputeRef}
                            />
                        )
                    }
                    title="纠纷处理"
                    visible={disputeVisible}
                    // handleOk={this.handleDisputeOk}
                    handleCancel={() => this.handleCancel('disputeVisible')}
                    confirmLoading={disputeConfirmLoading}
                    width={600}
                />
            </div>
        );
    }
}
export default Form.create()(OrderDetail);
