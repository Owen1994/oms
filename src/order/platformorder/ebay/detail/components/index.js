import React from 'react'
import {Link} from 'react-router-dom';
import { fetchPost } from 'util/fetch';
import { timestampFromat, getUrlParams } from 'util/baseTool'
import {
    GET_EBAY_ORDER_DETAIL,
    GET_EBAY_ORDER_LOGS
} from '../constants/Api';
import {
    Row,
    Col,
    Table,
    Icon,
    Pagination,
} from 'antd';
import '../css/index.css';
import CAsideBar from '@/components/casidebar';

/**
 *作者: 陈文春
 *功能描述:  ebay订单抓单详情
 *时间: 2018年11月21日16:22:12
 */
export default class App extends React.Component {

    state = {
        details: '',    //详情信息
        detailLog: '',   //详情日志信息
        logIconType: 'down',
        pageNumber: 1,
        pageData: 20,
    }

    //右侧导航栏配置
    navArr = [
        {id: 'order-info', val: "订单信息"},
        {id: 'payment-info', val: "付款信息"},
        {id: 'receive-info', val: "收货信息"},
        {id: 'logistics-info', val: "物流信息"},
        {id: 'product-info', val: "商品信息"},
        {id: 'message-info', val: "留言"},
        {id: 'log-info', val: "日志"},
    ];

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
            title: '单价',
            dataIndex: 'price',
            key: 'price',
            align: 'center',
        }, {
            title: '数量',
            dataIndex: 'count',
            key: 'count',
            align: 'center',
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
            dataIndex: 'username',
            key: 'username',
            align: 'center',
        }, {
            title: '时间',
            dataIndex: 'time',
            key: 'time',
            align: 'center',
            render: (text) => {
                return timestampFromat(text, 2);
            }
        }];

    componentDidMount() {
        const orderNumber = getUrlParams(location.href).orderNumber;
        const params = {
            orderNumber,
            pageNumber: 1,
            pageData: 20,
        };
        if (orderNumber) {
            fetchPost(GET_EBAY_ORDER_DETAIL, { data: { orderNumber } }, 2)
                .then(result => {
                    if (result.state === '000001') {
                        this.setState({
                            details: result.data
                        })
                    }
                })
            this.queryEbayOrderLog(params);
        }
    }

    showLogInfo = () => {
        const { logIconType } = this.state;
        if(logIconType === 'down') {
            this.setState({logIconType: 'up'});
        }else{
            this.setState({logIconType: 'down'});
        }
    }
    
    // 分页变化
    handlePaginationChange = (pageNumber, pageData) => {
        const orderNumber = getUrlParams(location.href).orderNumber;
        const params = {
            orderNumber,
            pageNumber,
            pageData,
        };
        this.setState({ pageNumber, pageData });
        this.queryEbayOrderLog(params);
    }

    // 请求ebay平台订单日志
    queryEbayOrderLog = (params) => {
        fetchPost(GET_EBAY_ORDER_LOGS, { data: params }, 2)
            .then(result => {
                if (result.state === '000001') {
                    this.setState({
                        detailLog: result.data
                    })
                }
            })
    }

    render() {
        const {
            logisticsInfo,
            message,
            orderInfo,
            payInfo,
            productInfo,
            receivablesInfo
        } = this.state.details;
        const { detailLog, pageNumber, pageData } = this.state;
        let url = '';
        if (orderInfo){
            url = orderInfo.isException ?
            `/order/exceptionorderlist/exceptionorderdetail/?orderId=${orderInfo.companyOrdersId}`
            : `/order/orderlist/orderdetail/?orderId=${orderInfo.companyOrdersId}`;
        }
        return this.state.details ?
            <Row>
                <Col span={22}>
                    <div className="ebayorder-modal-detail">
                        <div>
                            <h3 id="order-info"><span className="ebayorder-span-before"></span>订单信息</h3>
                            <Row>
                                <Col span={8}>
                                    <div>
                                        <span className="ebayorder-span-6">平台</span>
                                        <span className="colon-span">：</span>
                                        <span className="ebayorder-span-content">{orderInfo.platform}</span>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div>
                                        <span className="ebayorder-span-6">账号</span>
                                        <span className="colon-span">：</span>
                                        <span className="ebayorder-span-content">{orderInfo.account}</span>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div>
                                        <span className="ebayorder-span-6">站点</span>
                                        <span className="colon-span">：</span>
                                        <span className="ebayorder-span-content">{orderInfo.site}</span>
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
                                        <Link to={url} target="_blank">{orderInfo.companyOrdersId}</Link>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div>
                                        <span className="ebayorder-span-6">状态</span>
                                        <span className="colon-span">：</span>
                                        <span className="ebayorder-span-content">{orderInfo.state}</span>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div>
                            <h3 id="payment-info"><span className="ebayorder-span-before"></span>付款信息</h3>
                            <Row>
                                <Col span={8}>
                                    <div>
                                        <span className="ebayorder-span-6">商品价格</span>
                                        <span className="colon-span">：</span>
                                        <span className="ebayorder-span-content">{payInfo.currency}{payInfo.price}</span>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div>
                                        <span className="ebayorder-span-6">运费</span>
                                        <span className="colon-span">：</span>
                                        <span className="ebayorder-span-content">{payInfo.currency}{payInfo.freight}</span>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div>
                                        <span className="ebayorder-span-6">优惠金额</span>
                                        <span className="colon-span">：</span>
                                        <span className="ebayorder-span-content">{payInfo.currency}{payInfo.preferentialAmount}</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={8}>
                                    <div>
                                        <span className="ebayorder-span-6">订单总额</span>
                                        <span className="colon-span">：</span>
                                        <span className="ebayorder-span-content">{payInfo.currency}{payInfo.totalOrder}</span>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div>
                                        <span className="ebayorder-span-6">成交费</span>
                                        <span className="colon-span">：</span>
                                        <span className="ebayorder-span-content">{payInfo.currency}{payInfo.transactionFee}</span>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div>
                                        <span className="ebayorder-span-6">PayPal工具费</span>
                                        <span className="colon-span">：</span>
                                        <span className="ebayorder-span-content">{payInfo.currency}{payInfo.payToolPrice}</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={8}>
                                    <div>
                                        <span className="ebayorder-span-6">已付款</span>
                                        <span className="colon-span">：</span>
                                        <span className="ebayorder-span-content">{payInfo.currency}{payInfo.alreadyPaid}</span>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div>
                                        <span className="ebayorder-span-6">已到账</span>
                                        <span className="colon-span">：</span>
                                        <span className="ebayorder-span-content">{payInfo.currency}{payInfo.alreadyToAccount}</span>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div>
                                        <span className="ebayorder-span-6">付款方式</span>
                                        <span className="colon-span">：</span>
                                        <span className="ebayorder-span-content">{payInfo.payPalType}</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={8}>
                                    <div>
                                        <span className="ebayorder-span-6">付款时间</span>
                                        <span className="colon-span">：</span>
                                        <span className="ebayorder-span-content">{timestampFromat(payInfo.payTime, 2)}</span>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div>
                                        <span className="ebayorder-span-6">PayPal交易号</span>
                                        <span className="colon-span">：</span>
                                        <span className="ebayorder-span-content">{payInfo.externalTransactionID ? payInfo.externalTransactionID : ''}</span>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div>
                                        <span className="ebayorder-span-6">收款账号</span>
                                        <span className="colon-span">：</span>
                                        <span className="ebayorder-span-content">{payInfo.sellerEmail ? payInfo.sellerEmail : ''}</span>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div>
                            <h3 id="receive-info"><span className="ebayorder-span-before"></span>收货信息</h3>
                            <Row>
                                <Col span={8}>
                                    <div>
                                        <span className="ebayorder-span-6">买家ID</span>
                                        <span className="colon-span">：</span>
                                        <span className="ebayorder-span-content">{receivablesInfo.buyerId}</span>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div>
                                        <span className="ebayorder-span-6">收件人</span>
                                        <span className="colon-span">：</span>
                                        <span className="ebayorder-span-content">{receivablesInfo.addressee}</span>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div>
                                        <span className="ebayorder-span-6">移动电话</span>
                                        <span className="colon-span">：</span>
                                        <span className="ebayorder-span-content">{receivablesInfo.cellPhoneNumber}</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={8}>
                                    <div>
                                        <span className="ebayorder-span-6">固定电话</span>
                                        <span className="colon-span">：</span>
                                        <span className="ebayorder-span-content">{receivablesInfo.telephone}</span>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div>
                                        <span className="ebayorder-span-6">国家</span>
                                        <span className="colon-span">：</span>
                                        <span className="ebayorder-span-content">{receivablesInfo.country}</span>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div>
                                        <span className="ebayorder-span-6">省/州</span>
                                        <span className="colon-span">：</span>
                                        <span className="ebayorder-span-content">{receivablesInfo.province}</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={8}>
                                    <div>
                                        <span className="ebayorder-span-6">市</span>
                                        <span className="colon-span">：</span>
                                        <span className="ebayorder-span-content">{receivablesInfo.city}</span>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div>
                                        <span className="ebayorder-span-6">地区</span>
                                        <span className="colon-span">：</span>
                                        <span className="ebayorder-span-content">{receivablesInfo.region}</span>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div>
                                        <span className="ebayorder-span-6">邮编</span>
                                        <span className="colon-span">：</span>
                                        <span className="ebayorder-span-content">{receivablesInfo.zipCode}</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={8}>
                                    <div>
                                        <span className="ebayorder-span-6">街道</span>
                                        <span className="colon-span">：</span>
                                        <span className="ebayorder-span-content">{receivablesInfo.street}</span>
                                    </div>
                                </Col>
                                <Col span={16}>
                                    <div>
                                        <span className="ebayorder-span-6">详细地址</span>
                                        <span className="colon-span">：</span>
                                        <span className="ebayorder-span-content">{receivablesInfo.detailAddress}</span>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div>
                            <h3 id="logistics-info"><span className="ebayorder-span-before"></span>物流信息</h3>
                            <Row>
                                <Col span={8}>
                                    <div>
                                        <span className="ebayorder-span-6">国际物流方式</span>
                                        <span className="colon-span">：</span>
                                        <span className="ebayorder-span-content">{logisticsInfo.logisticsType}</span>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div>
                                        <span className="ebayorder-span-6">跟踪号</span>
                                        <span className="colon-span">：</span>
                                        <span className="ebayorder-span-content">{logisticsInfo.trackNumber}</span>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div>
                                        <span className="ebayorder-span-6">发货时间</span>
                                        <span className="colon-span">：</span>
                                        <span className="ebayorder-span-content">{timestampFromat(logisticsInfo.deliverTime, 2)}</span>
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
                                <span className="ebayorder-span-before"></span>日志<Icon style={{float: 'right', margin: '5px 12px 0 0'}} type={this.state.logIconType} />
                            </h3>
                            {
                                this.state.logIconType === 'down' ? null : (
                                    <div style={{ marginTop: 10 }}>
                                        <Table
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
                <Col span={2}>
                    <CAsideBar {...this.props} navArr={this.navArr} />
                </Col>
            </Row>
            : null
    }
}
