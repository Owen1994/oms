import React from 'react'
import { fetchPost } from 'util/fetch';
import { timestampFromat, getUrlParams } from 'util/baseTool'
import {
    GET_ORDER_DETAIL,
    GET_ORDER_DETAIL_LOG
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
import {Link} from 'react-router-dom';

/**
 *作者: 陈文春
 *功能描述:  mymall订单抓单详情
 *时间: 2019年1月3日09:12:15
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
        {id: 'money-info', val: "金额信息"},
        {id: 'address-info', val: "地址信息"},
        {id: 'logistics-info', val: "物流信息"},
        {id: 'time-info', val: "时间信息"},
        {id: 'product-info', val: "商品信息"},
        {id: 'log-info', val: "订单日志"},
    ];

    //商品信息
    columns = [
        {
            title: '商品图片',
            dataIndex: 'imgUrl',
            key: 'imgUrl',
            align: 'center',
            render: (text, record, index) => {
                return <img width={72} height={68} src={text} />
            }
        }, {
            title: '详情',
            key: 'productDetail',
            render: (text, record, index) => {
                return (
                    <div style={{width: '80%', margin: '0 auto', textAlign: 'left'}}>
                        <p><span className="mymallorder-span-6">SKU编码：</span><span>{record.skuNumber}</span></p>
                        <p><span className="mymallorder-span-6">商品名称：</span><span>{record.productName}</span></p>
                        <p><span className="mymallorder-span-6">单价售价：</span><span>{this.state.details.currency}{record.price}</span></p>
                        <p><span className="mymallorder-span-6">单SKU重量(g)：</span><span>{record.weight}</span></p>
                    </div>
                )
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
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
            align: 'center',
        }, {
            title: '描述',
            dataIndex: 'operDesc',
            key: 'operDesc',
            align: 'center',
        }, {
            title: '操作时间',
            dataIndex: 'operateTime',
            key: 'operateTime',
            align: 'center',
            render: (text) => {
                return timestampFromat(text, 2);
            }
        }];

    componentDidMount() {
        const { platformOrderNumber } = getUrlParams('');
        if (platformOrderNumber) {
            fetchPost(GET_ORDER_DETAIL, { data: { platformOrderNumber } }, 2)
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
        if(logIconType === 'down') {
            this.setState({logIconType: 'up'});
        }else{
            this.setState({logIconType: 'down'});
        }
    }
    
    // 分页变化
    handlePaginationChange = (pageNumber, pageData) => {
        const { platformOrderNumber } = getUrlParams('');
        const params = {
            platformOrderNumber,
            pageNumber,
            pageData,
        };
        this.setState({ pageNumber, pageData });
        this.queryMymallOrderLog(params);
    }

    // 请求mymall平台订单日志
    queryMymallOrderLog = (params) => {
        fetchPost(GET_ORDER_DETAIL_LOG, {data: params}, 2)
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
            addressInfo,
            currency,
            logisticsInfo,
            moneyInfo,
            orderInfo,
            productInfo,
            timeInfo
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
                <Col span={22}>
                    <div className="mymallorder-modal-detail">
                        <div>
                            <h3 id="order-info"><span className="mymallorder-span-before"></span>订单信息</h3>
                            <Row>
                                <Col span={8}>
                                    <div>
                                        <span className="mymallorder-span-6">交易号</span>
                                        <span className="colon-span">：</span>
                                        <span className="mymallorder-span-content">{orderInfo.transactionNumber}</span>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div>
                                        <span className="mymallorder-span-6">平台单号</span>
                                        <span className="colon-span">：</span>
                                        <span className="mymallorder-span-content">{orderInfo.platformOrderNumber}</span>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div>
                                        <span className="mymallorder-span-6">YKS单号</span>
                                        <span className="colon-span">：</span>
                                        <Link className="mymallorder-span-content" to={url} target="_blank">{orderInfo.companyOrdersId}</Link>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={8}>
                                    <div>
                                        <span className="mymallorder-span-6">平台名称</span>
                                        <span className="colon-span">：</span>
                                        <span className="mymallorder-span-content">{orderInfo.platformName}</span>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div>
                                        <span className="mymallorder-span-6">账号</span>
                                        <span className="colon-span">：</span>
                                        <span className="mymallorder-span-content">{orderInfo.account}</span>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div>
                                        <span className="mymallorder-span-6">订单来源</span>
                                        <span className="colon-span">：</span>
                                        <span className="mymallorder-span-content">{orderInfo.orderSource}</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={8}>
                                    <div>
                                        <span className="mymallorder-span-6">订单总金额</span>
                                        <span className="colon-span">：</span>
                                        <span className="mymallorder-span-content">{currency}{orderInfo.orderAmount}</span>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div>
                                        <span className="mymallorder-span-6">发货类型</span>
                                        <span className="colon-span">：</span>
                                        <span className="mymallorder-span-content">{orderInfo.deliveryType}</span>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div>
                            <h3 id="money-info"><span className="mymallorder-span-before"></span>金额信息</h3>
                            <Row>
                                <Col span={8}>
                                    <div>
                                        <span className="mymallorder-span-6">商品总金额</span>
                                        <span className="colon-span">：</span>
                                        <span className="mymallorder-span-content">{currency}{moneyInfo.productAmount}</span>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div>
                                        <span className="mymallorder-span-6">客付运费</span>
                                        <span className="colon-span">：</span>
                                        <span className="mymallorder-span-content">{currency}{moneyInfo.buyerPayFreight}</span>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div>
                                        <span className="mymallorder-span-6">订单总金额</span>
                                        <span className="colon-span">：</span>
                                        <span className="mymallorder-span-content">{currency}{moneyInfo.orderAmount}</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <div>
                                        <span className="mymallorder-span-6" style={{color: 'red'}}>备注</span>
                                        <span className="colon-span" style={{color: 'red'}}>：</span>
                                        <span className="mymallorder-span-content" style={{color: 'red'}}>{moneyInfo.remark}</span>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div>
                            <h3 id="address-info"><span className="mymallorder-span-before"></span>地址信息</h3>
                            <Row>
                                <Col span={8}>
                                    <div>
                                        <span className="mymallorder-span-6">收货人</span>
                                        <span className="colon-span">：</span>
                                        <span className="mymallorder-span-content">{addressInfo.buyer}</span>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div>
                                        <span className="mymallorder-span-6">电话号码</span>
                                        <span className="colon-span">：</span>
                                        <span className="mymallorder-span-content">{addressInfo.cellPhoneNumber}</span>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div>
                                        <span className="mymallorder-span-6">座机号码</span>
                                        <span className="colon-span">：</span>
                                        <span className="mymallorder-span-content">{addressInfo.fixLinePhoneNumber}</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={8}>
                                    <div>
                                        <span className="mymallorder-span-6">国家全称</span>
                                        <span className="colon-span">：</span>
                                        <span className="mymallorder-span-content">{addressInfo.country}</span>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div>
                                        <span className="mymallorder-span-6">国家简称</span>
                                        <span className="colon-span">：</span>
                                        <span className="mymallorder-span-content">{addressInfo.countryForShort}</span>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div>
                                        <span className="mymallorder-span-6">省/州</span>
                                        <span className="colon-span">：</span>
                                        <span className="mymallorder-span-content">{addressInfo.province}</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={8}>
                                    <div>
                                        <span className="mymallorder-span-6">市</span>
                                        <span className="colon-span">：</span>
                                        <span className="mymallorder-span-content">{addressInfo.city}</span>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div>
                                        <span className="mymallorder-span-6">邮编</span>
                                        <span className="colon-span">：</span>
                                        <span className="mymallorder-span-content">{addressInfo.zipCode}</span>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div>
                                        <span className="mymallorder-span-6">地址1</span>
                                        <span className="colon-span">：</span>
                                        <span className="mymallorder-span-content">{addressInfo.address1}</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={16}>
                                    <div>
                                        <span className="mymallorder-span-6">地址2</span>
                                        <span className="colon-span">：</span>
                                        <span className="mymallorder-span-content">{addressInfo.address2}</span>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div>
                            <h3 id="logistics-info"><span className="mymallorder-span-before"></span>物流信息</h3>
                            <Row>
                                <Col span={8}>
                                    <div>
                                        <span className="mymallorder-span-6">承运商</span>
                                        <span className="colon-span">：</span>
                                        <span className="mymallorder-span-content">{logisticsInfo.carrier}</span>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div>
                                        <span className="mymallorder-span-6">追踪码</span>
                                        <span className="colon-span">：</span>
                                        <span className="mymallorder-span-content">{logisticsInfo.trackNumber}</span>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div>
                            <h3 id="time-info"><span className="mymallorder-span-before"></span>时间信息</h3>
                            <Row>
                                <Col span={8}>
                                    <div>
                                        <span className="mymallorder-span-6">下单时间</span>
                                        <span className="colon-span">：</span>
                                        <span className="mymallorder-span-content">{timestampFromat(timeInfo.orderTime, 2)}</span>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div>
                                        <span className="mymallorder-span-6">审核完成时间</span>
                                        <span className="colon-span">：</span>
                                        <span className="mymallorder-span-content">{timestampFromat(timeInfo.auditFinishTime, 2)}</span>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div>
                                        <span className="mymallorder-span-6">抓单时间</span>
                                        <span className="colon-span">：</span>
                                        <span className="mymallorder-span-content">{timestampFromat(timeInfo.grapTime, 2)}</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={8}>
                                    <div>
                                        <span className="mymallorder-span-6">订单截止时间</span>
                                        <span className="colon-span">：</span>
                                        <span className="mymallorder-span-content">{timestampFromat(timeInfo.orderDeadline, 2)}</span>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div>
                                        <span className="mymallorder-span-6">实际发货时间</span>
                                        <span className="colon-span">：</span>
                                        <span className="mymallorder-span-content">{timestampFromat(timeInfo.realDeveryTime, 2)}</span>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div>
                                        <span className="mymallorder-span-6">标记时间</span>
                                        <span className="colon-span">：</span>
                                        <span className="mymallorder-span-content">{timestampFromat(timeInfo.markTime, 2)}</span>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div>
                            <h3 id="product-info"><span className="mymallorder-span-before"></span>商品信息</h3>
                            <div>
                                <Table
                                    columns={this.columns}
                                    dataSource={productInfo}
                                    pagination={false}
                                    bordered
                                />
                            </div>
                        </div>
                        <div style={{ marginBottom: 20 }}>
                            <h3 id="log-info" onClick={this.showLogInfo} style={{ marginBottom: 0 }}>
                                <span className="mymallorder-span-before"></span>订单日志<Icon style={{float: 'right', margin: '5px 12px 0 0'}} type={this.state.logIconType} />
                            </h3>
                            {
                                this.state.logIconType === 'down' ? null : (
                                    <div style={{ marginTop: 10 }}>
                                        <Table
                                            columns={this.columns_log}
                                            dataSource={detailLog.data}
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
