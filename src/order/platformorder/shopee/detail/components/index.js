import React from 'react'
import {Link} from 'react-router-dom';
import { fetchPost } from 'util/fetch';
import { timestampFromat, getUrlParams } from 'util/baseTool'
import {
    GET_SHOPEE_ORDER_DETAIL,
    GET_SHOPEE_ORDER_LOGS
} from '../constants/Api';
import {
    Row,
    Col,
    Table,
    Icon,
    Pagination,
} from 'antd';
import '../css/index.css';

/**
 *作者: 陈文春
 *功能描述:  ebay订单抓单详情
 *时间: 2018年11月21日16:22:12
 */
export default class App extends React.Component {

    state = {
        details: {
            currency: "",
            message: "",
            gatheringInfo: {},
            logisticsInfo: {},
            orderInfo: {},
            productInfo: {
                list: [],
            },
            receiveInfo: {},
        },    //详情信息
        detailLog: '',   //详情日志信息
        logIconType: 'down',
        pageNumber: 1,
        pageData: 20,
    }

    //商品信息
    columns = [
        {
            title: 'sku图片',
            dataIndex: 'skuImgUrl',
            key: 'skuImgUrl',
            align: 'center',
            render: (text, record, index) => {
                return <img width={72} height={68} src={text} />
            }
        }, {
            title: 'sku编号',
            dataIndex: 'skuNumber',
            key: 'skuNumber',
            align: 'center',
        }, {
            title: 'sku名称',
            dataIndex: 'skuName',
            key: 'skuName',
            align: 'center',
        }, {
            title: '原价',
            dataIndex: 'price',
            key: 'price',
            align: 'center',
            render: (t) => {
                const { currency } = this.state.details;
                return `${currency} ${t}`
            }
        }, {
            title: '折扣价',
            dataIndex: 'discountPrice',
            key: 'discountPrice',
            align: 'center',
            render: (t) => {
                const { currency } = this.state.details;
                return `${currency} ${t}`
            }
        }, {
            title: '数量',
            dataIndex: 'quantity',
            key: 'quantity',
            align: 'center',
        }, {
            title: '商品金额',
            dataIndex: 'amount',
            key: 'amount',
            align: 'center',
            render: (t) => {
                const { currency } = this.state.details;
                return `${currency} ${t}`
            }
        }];

    //日志
    columns_log = [
        {
            title: '序号',
            dataIndex: 'orderNum',
            key: 'orderNum',
            align: 'center',
            render: (text, record, index) => {
                return index + 1;
            }
        }, {
            title: '操作属性',
            dataIndex: 'property',
            key: 'property',
            align: 'center',
        }, {
            title: '描述',
            dataIndex: 'desc',
            key: 'desc',
            align: 'center',
        }, {
            title: '用户名',
            dataIndex: 'userName',
            key: 'userName',
            align: 'center',
        }, {
            title: '时间',
            dataIndex: 'operateTime',
            key: 'operateTime',
            align: 'center',
            render: (text) => {
                return timestampFromat(text, 2);
            }
        }];

    componentDidMount() {
        const key = getUrlParams('').orderNumber;
        if (key) {
            fetchPost(GET_SHOPEE_ORDER_DETAIL, { data: { key } }, 2)
                .then(result => {
                    if (result.state === '000001') {
                        this.setState({
                            details: result.data
                        })
                    }
                })
            this.handlePaginationChange(1, 20);
        }
    }

    showLogInfo = () => {
        const { logIconType } = this.state;
        if (logIconType === 'down') {
            this.setState({ logIconType: 'up' });
        } else {
            this.setState({ logIconType: 'down' });
        }
    }
    
    // 分页变化
    handlePaginationChange = (pageNumber, pageData) => {
        const key = getUrlParams('').orderNumber;
        const params = {
            key,
            pageNumber,
            pageData,
        };
        this.setState({ pageNumber, pageData });
        this.queryOrderLog(params);
    }

    // 请求平台订单日志
    queryOrderLog = (params) => {
        fetchPost(GET_SHOPEE_ORDER_LOGS, {data: params}, 2)
            .then(res => {
                if (res.state === '000001') {
                    this.setState({
                        detailLog: res.data
                    })
                }
            })
    }

    render() {
        const {
            currency,
            message,
            gatheringInfo,
            logisticsInfo,
            orderInfo,
            productInfo,
            receiveInfo,
        } = this.state.details;
        const {
            detailLog,
            pageNumber,
            pageData,
        } = this.state;
        let url = '';
        if (orderInfo){
            url = orderInfo.isException ?
            `/order/exceptionorderlist/exceptionorderdetail/?orderId=${orderInfo.companyOrdersId}`
            : `/order/orderlist/orderdetail/?orderId=${orderInfo.companyOrdersId}`;
        }
        return this.state.details ?
            <Row>
                <Col>
                    <div className="ebayorder-modal-detail">
                        <div>
                            <h3 id="order-info"><span className="ebayorder-span-before"></span>订单信息</h3>
                            <Row>
                                <Col span={8}>
                                    <div>
                                        <span className="ebayorder-span-6">平台</span>
                                        <span className="colon-span">：</span>
                                        <span className="ebayorder-span-content">{orderInfo.platformName}</span>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div>
                                        <span className="ebayorder-span-6">子账号</span>
                                        <span className="colon-span">：</span>
                                        <span className="ebayorder-span-content">{orderInfo.childAccount}</span>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div>
                                        <span className="ebayorder-span-6">主账号</span>
                                        <span className="colon-span">：</span>
                                        <span className="ebayorder-span-content">{orderInfo.mailAccount}</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={8}>
                                    <div>
                                        <span className="ebayorder-span-6">平台订单号</span>
                                        <span className="colon-span">：</span>
                                        <span className="ebayorder-span-content">{orderInfo.platformOrderNumber}</span>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div>
                                        <span className="ebayorder-span-6">YKS单号</span>
                                        <span className="colon-span">：</span>
                                        <Link className="ebayorder-span-content" to={url} target="_blank">{orderInfo.companyOrdersId}</Link>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div>
                                        <span className="ebayorder-span-6">平台订单状态</span>
                                        <span className="colon-span">：</span>
                                        <span className="ebayorder-span-content">{orderInfo.platformOrderState}</span>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div>
                            <h3 id="payment-info"><span className="ebayorder-span-before"></span>收款信息</h3>
                            <Row>
                                <Col span={8}>
                                    <div>
                                        <span className="ebayorder-span-6">商品总金额</span>
                                        <span className="colon-span">：</span>
                                        <span className="ebayorder-span-content">{currency} {gatheringInfo.productAmount}</span>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div>
                                        <span className="ebayorder-span-6">买家实付运费</span>
                                        <span className="colon-span">：</span>
                                        <span className="ebayorder-span-content">{currency} {gatheringInfo.buyerPayedFreight}</span>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div>
                                        <span className="ebayorder-span-6">卖家实收运费</span>
                                        <span className="colon-span">：</span>
                                        <span className="ebayorder-span-content">{currency} {gatheringInfo.sellerReceivedFreight}</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={8}>
                                    <div>
                                        <span className="ebayorder-span-6">订单总金额</span>
                                        <span className="colon-span">：</span>
                                        <span className="ebayorder-span-content">{currency} {gatheringInfo.orderAmount}</span>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div>
                                        <span className="ebayorder-span-6">平台交易费</span>
                                        <span className="colon-span">：</span>
                                        <span className="ebayorder-span-content">{currency} {gatheringInfo.platformTradingFee}</span>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div>
                                        <span className="ebayorder-span-6">买家实付金额</span>
                                        <span className="colon-span">：</span>
                                        <span className="ebayorder-span-content">{currency} {gatheringInfo.buyerPayedAmount}</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={8}>
                                    <div>
                                        <span className="ebayorder-span-6">卖家实收金额</span>
                                        <span className="colon-span">：</span>
                                        <span className="ebayorder-span-content">{currency} {gatheringInfo.sellerReceivedAmount}</span>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div>
                                        <span className="ebayorder-span-6">支付方式</span>
                                        <span className="colon-span">：</span>
                                        <span className="ebayorder-span-content">{gatheringInfo.paymentWay}</span>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div>
                                        <span className="ebayorder-span-6">运费补贴</span>
                                        <span className="colon-span">：</span>
                                        <span className="ebayorder-span-content">{currency} {gatheringInfo.freightSubsidy}</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={8}>
                                    <div>
                                        <span className="ebayorder-span-6">手续费</span>
                                        <span className="colon-span">：</span>
                                        <span className="ebayorder-span-content">{currency} {gatheringInfo.transactionFee}</span>
                                    </div>
                                </Col>
                                <Col span={16}>
                                    <div>
                                        <span className="ebayorder-span-6">付款时间</span>
                                        <span className="colon-span">：</span>
                                        <span className="ebayorder-span-content">{timestampFromat(gatheringInfo.paymentTime, 2)}</span>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div>
                            <h3 id="receive-info"><span className="ebayorder-span-before"></span>收货信息</h3>
                            <Row>
                                <Col span={8}>
                                    <div>
                                        <span className="ebayorder-span-6">收件人</span>
                                        <span className="colon-span">：</span>
                                        <span className="ebayorder-span-content">{receiveInfo.buyer}</span>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div>
                                        <span className="ebayorder-span-6">电话号码</span>
                                        <span className="colon-span">：</span>
                                        <span className="ebayorder-span-content">{receiveInfo.cellPhoneNumber}</span>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div>
                                        <span className="ebayorder-span-6">国家/地区</span>
                                        <span className="colon-span">：</span>
                                        <span className="ebayorder-span-content">{receiveInfo.country}</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={8}>
                                    <div>
                                        <span className="ebayorder-span-6">邮编</span>
                                        <span className="colon-span">：</span>
                                        <span className="ebayorder-span-content">{receiveInfo.zipCode}</span>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div>
                                        <span className="ebayorder-span-6">城市</span>
                                        <span className="colon-span">：</span>
                                        <span className="ebayorder-span-content">{receiveInfo.city}</span>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div>
                                        <span className="ebayorder-span-6">区</span>
                                        <span className="colon-span">：</span>
                                        <span className="ebayorder-span-content">{receiveInfo.district}</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={8}>
                                    <div>
                                        <span className="ebayorder-span-6">省/州</span>
                                        <span className="colon-span">：</span>
                                        <span className="ebayorder-span-content">{receiveInfo.state}</span>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div>
                                        <span className="ebayorder-span-6">镇</span>
                                        <span className="colon-span">：</span>
                                        <span className="ebayorder-span-content">{receiveInfo.town}</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={16}>
                                    <div>
                                        <span className="ebayorder-span-6">地址</span>
                                        <span className="colon-span">：</span>
                                        <span className="ebayorder-span-content">{receiveInfo.address}</span>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div>
                            <h3 id="logistics-info"><span className="ebayorder-span-before"></span>物流信息</h3>
                            <Row>
                                <Col span={8}>
                                    <div>
                                        <span className="ebayorder-span-6">渠道名称</span>
                                        <span className="colon-span">：</span>
                                        <span className="ebayorder-span-content">{logisticsInfo.channelName}</span>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div>
                                        <span className="ebayorder-span-6">物流追踪号</span>
                                        <span className="colon-span">：</span>
                                        <span className="ebayorder-span-content">{logisticsInfo.trackNumber}</span>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div>
                                        <span className="ebayorder-span-6">发货时间</span>
                                        <span className="colon-span">：</span>
                                        <span className="ebayorder-span-content">{timestampFromat(logisticsInfo.deliveryTime, 2)}</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <div>
                                        <span className="ebayorder-span-6">备注</span>
                                        <span className="colon-span">：</span>
                                        <span className="ebayorder-span-content">{logisticsInfo.remark}</span>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div>
                            <h3 id="product-info"><span className="ebayorder-span-before"></span>商品信息</h3>
                            <div>
                                <Table
                                    size="small"
                                    columns={this.columns}
                                    dataSource={productInfo.list}
                                    pagination={false}
                                    bordered
                                />
                            </div>
                            <div style={{ marginTop: 10 }}>
                                备注：{productInfo.remark}
                            </div>
                        </div>
                        <div>
                            <h3 id="message-info" style={{ marginBottom: 0 }}><span className="ebayorder-span-before"></span>留言</h3>
                            {
                                message ? (
                                    <div style={{ marginTop: 10 }}>
                                        {message}
                                    </div>
                                ) : null
                            }
                        </div>
                        <div style={{ marginBottom: 20 }}>
                            <h3 id="log-info" onClick={this.showLogInfo} style={{ marginBottom: 0 }}>
                                <span className="ebayorder-span-before"></span>日志<Icon style={{ float: 'right', margin: '5px 12px 0 0' }} type={this.state.logIconType} />
                            </h3>
                            {
                                this.state.logIconType === 'down' ? null : (
                                    <div style={{ marginTop: 10 }}>
                                        <Table
                                            size="small"
                                            columns={this.columns_log}
                                            dataSource={detailLog.list}
                                            pagination={false}
                                            bordered
                                            rowKey={(record, index) => index}
                                        />
                                        <Pagination
                                            className="g-rt"
                                            showTotal={total => `共 ${total} 条`}
                                            pageSizeOptions={['20', '30', '40', '50']}
                                            showSizeChanger
                                            showQuickJumper={{goButton: true}}
                                            current={pageNumber}
                                            defaultCurrent={1}
                                            total={detailLog.total}
                                            pageSize={pageData}
                                            onChange={this.handlePaginationChange}
                                            onShowSizeChange={this.handlePaginationChange}
                                            />
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </Col>
            </Row>
            : null
    }
}
