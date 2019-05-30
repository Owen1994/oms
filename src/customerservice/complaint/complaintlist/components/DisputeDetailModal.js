import React from 'react';
import OrderDetailModal from '../../../common/components/OrderDetailModal';
import Modal2 from '../../../../components/Modal2';
import CGallery from '../../../../components/cgallery';
import { GET_DISPUTE_INFO } from '../../../common/constants';
import { fetchPost } from '../../../../util/fetch';
import { randNum } from '../../../../util/baseTool';

class DisputeDetailModal extends React.Component {
    state = {
        orderVisible: false,
        imgs: undefined,
        process_dto_list: [],
        disputeData: {
            buyer_return_no: '',
            buyer_return_logistics_lp_no: '',
            buyer_return_logistics_company: '',
            logistics_fee_amount: '',
            logistics_fee_amount_currency: '',
            logistics_fee_bear_role: '',
        },
    }

    componentDidMount() {
        this.getDisputInfo();
    }

    getDisputInfo = () => {
        const {
            platformId, issueId, buyerAccount, sellerAccount,
        } = this.props;
        fetchPost(GET_DISPUTE_INFO, {
            platformId,
            issueId,
            buyerAccount,
            sellerAccount,
            flag: 'detail',
        }, 2)
            .then((data) => {
                if (data && data.state === '000001') {
                    this.setState({
                        disputeData: data.data,
                        process_dto_list: data.data.process_dto_list,
                    });
                }
            });
    }

    handleCancel = () => {
        this.setState({
            orderVisible: false,
        });
    }

    handleOrderClick = () => {
        this.setState({
            orderVisible: true,
        });
    }

    // 查看证据
    viewEvidence = (imgList) => {
        if (imgList.length <= 0) {
            this.setState({
                imgs: undefined,
            });
            return;
        }
        imgList = imgList.map(item => ({
            src: item.url,
        }));
        this.setState({
            imgs: imgList,
        });
    }

    handleClose = () => {
        this.setState({
            imgs: undefined,
        });
    }

    render() {
        const {
            orderVisible, imgs, disputeData,
        } = this.state;
        const processDtoList = this.state.process_dto_list;
        return (
            <div className="dispute-detail-modal">
                <div className="ant-row">
                    <div className="ant-col-12 detail-person">
                        <p>买家&客服&系统</p>
                    </div>
                    <div className="ant-col-12 detail-person">
                        <p>卖家</p>
                    </div>
                </div>
                <div className="overflow-hidden">
                    <div className="buyer-detail detail-common">
                        <div className="detail-title">{processDtoList.length > 0 ? processDtoList[0].action_desc : null}</div>
                        <div>支付金额： <span className="complaintlist-red">{processDtoList.length > 0 ? `${processDtoList[0].payAmountCurrency} ${processDtoList[0].payAmount}` : null}</span></div>
                        <div className="overflow-hidden">
                            <span className="view-more-detail" onClick={this.handleOrderClick}>查看详情</span>
                        </div>
                        <div className="buyer-detail-date detail-date">{processDtoList.length > 0 ? processDtoList[0].createTime : null}</div>
                    </div>
                </div>
                <div className="overflow-hidden">
                    <div className="seller-detail detail-common">
                        <div className="detail-title">{processDtoList.length > 0 ? processDtoList[1].action_desc : null}</div>
                        <div className="pd-ssm">
                            <span>物流单号：</span>
                            <span className="complaintlist-dark">{processDtoList.length > 0 ? processDtoList[1].logisticsServiceCode : null}</span>
                        </div>
                        <div className="pd-ssm">
                            <span>物流公司：</span>
                            <span className="complaintlist-dark">{processDtoList.length > 0 ? processDtoList[1].logisticsServiceName : null}</span>
                        </div>
                        <div className="pd-ssm">
                            <span>发货备注：</span>
                            <span className="complaintlist-dark">{processDtoList.length > 0 ? processDtoList[1].message : null}</span>
                        </div>
                        <div className="seller-detail-date detail-date">{processDtoList.length > 0 ? processDtoList[1].deliveryTime : null}</div>
                    </div>
                </div>
                {
                    processDtoList.map((item) => {
                        let content;
                        if (item.submit_member_type === 'buyer' && item.action_type !== 'buyer_accept') {
                            content = (
                                <div className="overflow-hidden" key={randNum()}>
                                    <div className="buyer-detail detail-common">
                                        <div className="detail-title">{item.action_desc}</div>
                                        <div className="pd-ssm">
                                            <span>纠纷原因：</span>
                                            <span className="complaintlist-dark">{item.reason}</span>
                                        </div>
                                        <div className="pd-ssm">
                                            <span>退款金额：</span>
                                            <span className="complaintlist-red">{`${item.refund_money_currency} ${item.refund_money}`}</span>
                                        </div>
                                        <div className="pd-ssm">
                                            <span>备注：</span>
                                            <span className="complaintlist-dark">{item.content}</span>
                                        </div>
                                        {
                                            item.imgList.length > 0
                                                ? (
                                                    <div className="overflow-hidden">
                                                        <span className="view-more-detail" onClick={() => this.viewEvidence(item.imgList)}>查看证据</span>
                                                    </div>
                                                )
                                                : null
                                        }
                                        <div className="buyer-detail-date detail-date">{item.gmt_create}</div>
                                    </div>
                                </div>
                            );
                        } if (item.submit_member_type === 'buyer' && item.action_type === 'buyer_accept') {
                            if (disputeData.buyer_return_no) {
                                content = (
                                    <div className="overflow-hidden" key={randNum()}>
                                        <div className="buyer-detail detail-common">
                                            <div className="detail-title">{item.action_desc}</div>
                                            <div className="pd-ssm">
                                                <span>方案：</span>
                                                <span className="complaintlist-dark">{item.solutionType}</span>
                                            </div>
                                            <div className="pd-ssm">
                                                <span>退款金额：</span>
                                                <span className="complaintlist-red">{`${item.refund_money_currency} ${item.refund_money}`}</span>
                                            </div>
                                            {
                                                item.imgList.length > 0
                                                    ? (
                                                        <div className="overflow-hidden">
                                                            <span className="view-more-detail" onClick={() => this.viewEvidence(item.imgList)}>查看证据</span>
                                                        </div>
                                                    )
                                                    : null
                                            }
                                            <div className="buyer-detail-date detail-date">{item.gmt_create}</div>
                                        </div>
                                    </div>
                                );
                            }
                            content = (
                                <div className="overflow-hidden" key={randNum()}>
                                    <div className="buyer-detail detail-common">
                                        <div className="detail-title">{item.action_desc}</div>
                                        <div className="pd-ssm">
                                            <span>方案：</span>
                                            <span className="complaintlist-dark">{item.solutionType}</span>
                                        </div>
                                        <div className="pd-ssm">
                                            <span>退货物流公司：</span>
                                            <span className="complaintlist-dark">{disputeData.buyer_return_logistics_company}</span>
                                        </div>
                                        <div className="pd-ssm">
                                            <span>退货单号：</span>
                                            <span className="complaintlist-dark">{item.buyer_return_logistics_lp_no}</span>
                                        </div>
                                        <div className="pd-ssm">
                                            <span>运费金额：</span>
                                            <span className="complaintlist-dark">{`${item.logistics_fee_amount_currency} ${item.logistics_fee_amount}`}</span>
                                        </div>
                                        <div className="pd-ssm">
                                            <span>运费承担方：</span>
                                            <span className="complaintlist-dark">{item.logistics_fee_bear_role}</span>
                                        </div>
                                        {
                                            item.imgList.length > 0
                                                ? (
                                                    <div className="overflow-hidden">
                                                        <span className="view-more-detail" onClick={() => this.viewEvidence(item.imgList)}>查看证据</span>
                                                    </div>
                                                )
                                                : null
                                        }
                                        <div className="buyer-detail-date detail-date">{item.gmt_create}</div>
                                    </div>
                                </div>
                            );
                        } if (item.submit_member_type === 'seller') {
                            content = (
                                <div className="overflow-hidden" key={randNum()}>
                                    <div className="seller-detail detail-common">
                                        <div className="detail-title">{item.action_desc}</div>
                                        <div className="pd-ssm">
                                            <span>方案：</span>
                                            <span className="complaintlist-dark">{item.solutionType}</span>
                                        </div>
                                        <div className="pd-ssm">
                                            <span>备注：</span>
                                            <span className="complaintlist-dark">{item.content}</span>
                                        </div>
                                        {
                                            item.imgList.length > 0
                                                ? (
                                                    <div className="overflow-hidden">
                                                        <span className="view-more-detail" onClick={() => this.viewEvidence(item.imgList)}>查看证据</span>
                                                    </div>
                                                )
                                                : null
                                        }
                                        <div className="customer-person">{item.customerName}</div>
                                        <div className="buyer-detail-date detail-date">{item.gmt_create}</div>
                                    </div>
                                </div>
                            );
                        } if (item.submit_member_type === 'system') {
                            content = (
                                <div className="overflow-hidden" key={randNum()}>
                                    <div className="buyer-detail detail-common">
                                        <div className="detail-title">{item.action_desc}</div>
                                        <div className="pd-ssm">
                                            <span>备注：</span>
                                            <span className="complaintlist-dark">{item.content}</span>
                                        </div>
                                        {/* <div className="overflow-hidden">
                                            <span className='view-more-detail' onClick={() => this.viewEvidence(item.imgList)}>查看证据</span>
                                        </div> */}
                                        <div className="buyer-detail-date detail-date">{item.gmt_create}</div>
                                    </div>
                                </div>
                            );
                        } if (item.submit_member_type === 'platform') {
                            content = (
                                <div className="overflow-hidden" key={randNum()}>
                                    <div className="buyer-detail detail-common">
                                        <div className="detail-title">{item.action_desc}</div>
                                        <div className="pd-ssm">
                                            <span>方案：</span>
                                            <span className="complaintlist-dark">{item.solutionType}</span>
                                        </div>
                                        <div className="pd-ssm">
                                            <span>退款金额：</span>
                                            <span className="complaintlist-red">{`${item.refund_money_currency} ${item.refund_money}`}</span>
                                        </div>
                                        <div className="pd-ssm">
                                            <span>备注：</span>
                                            <span className="complaintlist-dark">{item.content}</span>
                                        </div>
                                        {/* <div className="overflow-hidden">
                                            <span className='view-more-detail' onClick={() => this.viewEvidence(item.imgList)}>查看证据</span>
                                        </div> */}
                                        <div className="buyer-detail-date detail-date">{item.gmt_create}</div>
                                    </div>
                                </div>
                            );
                        } if (item.submit_member_type === 'waiter') {
                            content = (
                                <div className="overflow-hidden" key={randNum()}>
                                    <div className="buyer-detail detail-common">
                                        <div className="detail-title">{item.action_desc}</div>
                                        <div className="pd-ssm">
                                            <span>方案：</span>
                                            <span className="complaintlist-dark">{item.solutionType}</span>
                                        </div>
                                        <div className="pd-ssm">
                                            <span>退款金额：</span>
                                            <span className="complaintlist-red">{`${item.refund_money_currency} ${item.refund_money}`}</span>
                                        </div>
                                        {/* <div className="overflow-hidden">
                                            <span className='view-more-detail' onClick={() => this.viewEvidence(item.imgList)}>查看证据</span>
                                        </div> */}
                                        <div className="buyer-detail-date detail-date">{item.gmt_create}</div>
                                    </div>
                                </div>
                            );
                        }
                        return content;
                    })
                }
                <CGallery
                    handleClose={this.handleClose}
                    imgs={imgs}
                />
                {/* 订单详情弹窗 */}
                <Modal2
                    component={(<OrderDetailModal {...this.props} />)}
                    title="订单详情"
                    visible={orderVisible}
                    handleCancel={this.handleCancel}
                    footer={null}
                />
            </div>
        );
    }
}
export default DisputeDetailModal;
