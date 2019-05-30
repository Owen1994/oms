import React from 'react';
import './index.css';
import { fetchPost } from '../../../../util/fetch';
import { GET_ORDER_ASSOCIATION_INFO } from '../../constants';

class OrderDetailModal extends React.Component {
    state = {
        orderDetail: {},
        logisticsDetail: {},
    }

    componentDidMount() {
        const { platformId, orderNumber, buyerAccount, sellerAccount } = this.props;
        fetchPost(GET_ORDER_ASSOCIATION_INFO, {
            platformId,
            orderNumber,
            sellerAccount,
            buyerAccount,
        }, 2)
            .then((data) => {
                if (data && data.state === '000001') {
                    const res = data.data;
                    this.setState({
                        logisticsDetail: res.logistics || {},
                        orderDetail: res.order || {},
                    });
                }
            });
    }

    render() {
        const { orderDetail, logisticsDetail } = this.state;
        const { orderNumber, platformId, buyerAccount, sellerAccount } = this.props;
        let payAmount = '';
        let erpPackageList = '无';
        const packageList = logisticsDetail ? logisticsDetail.packageList : {};
        if (orderDetail.payAmount || orderDetail.totalAmount) {
            payAmount = `${orderDetail.totalAmountCurrency} ${orderDetail.totalAmount}(实付：${orderDetail.payAmountCurrency} ${orderDetail.payAmount})`;
        }
        if (packageList && Object.keys(packageList).length) {
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
        return (
            <div className="order-detail-modal">
                <div className="overflow-hidden order-item">
                    <div className="order-detail-label">平台订单编号：</div>
                    <div className="order-detail-content">{ orderNumber }</div>
                </div>
                <div className="overflow-hidden order-item">
                    <div className="order-detail-label">平台订单状态：</div>
                    <div className="order-detail-content">{ orderDetail.orderStatus }</div>
                </div>
                <div className="overflow-hidden order-item">
                    <div className="order-detail-label">订单金额：</div>
                    <div className="order-detail-content">{payAmount}</div>
                </div>
                {`${platformId}` === '2'
                        ? (
                            <div className="overflow-hidden order-item">
                                <div className="order-detail-label">冻结状态：</div>
                                <div className="order-detail-content">{ orderDetail.freezingStatus }</div>
                            </div>
                        )
                        : null
                }
                <div className="overflow-hidden order-item">
                    <div className="order-detail-label">订单创建时间：</div>
                    <div className="order-detail-content">{ orderDetail.orderDate }</div>
                </div>
                <div className="overflow-hidden order-item">
                    <div className="order-detail-label">订单结束时间：</div>
                    <div className="order-detail-content">{ orderDetail.orderEndTime }</div>
                </div>
                {`${platformId}` === '2'
                        ? (
                            <div className="overflow-hidden order-item">
                                <div className="order-detail-label">平台发货时间：</div>
                                <div className="order-detail-content">{ orderDetail.deliveryTime }</div>
                            </div>
                        )
                        : null
                }
                <div className="overflow-hidden order-item">
                    <div className="order-detail-label">订单SKU：</div>
                    <div className="order-detail-content">
                        { orderDetail.orderSku && orderDetail.orderSku.map((item, index) => {
                            const dot = index === 0 ? '' : '，';
                            return <span key={item.skuCode}>{`${dot}${item.skuCode}(${item.currency} ${item.amount})×${item.skuNum}`}</span>;
                        }) }
                    </div>
                </div>
                <div className="overflow-hidden order-item">
                    <div className="order-detail-label">收件人地址：</div>
                    <div className="order-detail-content">{ orderDetail.addresseeAddr }</div>
                </div>
                {`${platformId}` === '2'
                    ? [
                        <div className="overflow-hidden order-item">
                            <div className="order-detail-label">订单留言：</div>
                            <div className="order-detail-content">{ orderDetail.orderMessage }</div>
                        </div>,
                        <div className="overflow-hidden order-item">
                            <div className="order-detail-label">平台物流状态：</div>
                            <div className="order-detail-content">{ orderDetail.logisticsStatus }</div>
                        </div>
                    ] : null
                }
                {
                    `${platformId}` === '2' && orderDetail.orderStatus === '等待买家收货'
                        ? (
                            <div className="overflow-hidden order-item">
                                <div className="order-detail-label">剩余收货时间：</div>
                                <div className="order-detail-content order-item-red">{ orderDetail.delayCountDown }</div>
                            </div>
                        ) : null
                }
                {`${platformId}` === '1'
                    ? [
                        <div className="overflow-hidden order-item">
                            <div className="order-detail-label">卖家账号：</div>
                            <div className="order-detail-content">{sellerAccount}</div>
                        </div>,
                        <div className="overflow-hidden order-item">
                            <div className="order-detail-label">买家账号：</div>
                            <div className="order-detail-content">{buyerAccount}</div>
                        </div>
                    ] : null
                }
                <div className="seperate-line" />
                <div className="overflow-hidden order-item">
                            <div className="order-detail-label">老ERP物流信息：</div>
                            <div className="order-detail-content">{ erpPackageList }</div>
                        </div>
                {`${platformId}` === '2'
                    ? [
                        <div className="overflow-hidden order-item">
                            <div className="order-detail-label">平台物流单号：</div>
                            <div className="order-detail-content">{ logisticsDetail.logisticsNumber }</div>
                        </div>,
                        <div className="overflow-hidden order-item">
                            <div className="order-detail-label">平台物流渠道：</div>
                            <div className="order-detail-content order-item-theme"><a href="https://www.17track.net/zh-cn" target="_blank" rel="noopener noreferrer">{ logisticsDetail.logisticsChannel }</a></div>
                        </div>,
                        <div className="overflow-hidden order-item">
                            <div className="order-detail-label">物流服务编码：</div>
                            <div className="order-detail-content">{ logisticsDetail.internationalLogisticsType }</div>
                        </div>,
                        <div className="overflow-hidden order-item">
                            <div className="order-detail-label">国际运单号：</div>
                            <div className="order-detail-content">{ logisticsDetail.internationalLogisticsNum }</div>
                        </div>,
                        <div className="overflow-hidden order-item">
                            <div className="order-detail-label">运费：</div>
                            <div className="order-detail-content">{ logisticsDetail.logisticsFee }</div>
                        </div>
                    ] : null
                }
                
            </div>
        );
    }
}
export default OrderDetailModal;
