import React from 'react'
import {Link} from 'react-router-dom';
import {
    Modal,
    Form,
    Button,
    Input,
    message,
    Row,
    Col,
    Table,
    Pagination,
} from 'antd'
import { fetchPost } from 'util/fetch';
import { strTrim, timestampFromat, datasaddkey  } from 'util/baseTool';
import * as API from '../constants/api'
const FormItem = Form.Item;

export default class DetailModal extends React.Component {
    state = {
        loading: false,
        orderInfo: '',
        orderLog: undefined,
        total: 0,
        pageNumber: 1,
        pageData: 20,
    };
    formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };
    columns = [{
            title: '操作属性',
            dataIndex: 'attribute',
            key: 'attribute',
            align: 'center',
        }, {
            title: '描述',
            dataIndex: 'msg',
            key: 'msg',
            width: 120,
            align: 'center',
        }, {
            title: '用户ID',
            dataIndex: 'userId',
            key: 'userId',
            align: 'center',
            render: text => text,
        },
        {
            title: '操作时间',
            dataIndex: 'time',
            key: 'time',
            align: 'center',
            render: text => timestampFromat(Number.parseInt(text, 10),2),
            width: 160,

        }];
    componentWillReceiveProps(nextProps) {
        const { orderId } = this.props;
        const nextOrderId = nextProps.orderId;
        const params = {
            orderId: nextOrderId,
            pageNumber: 1,
            pageData: 20,
        };
        if (orderId !== nextOrderId && nextOrderId && nextProps.visible) {
            fetchPost(API.GET_WISH_ORDER_DETAIL, { orderId: nextOrderId }, 2)
                .then(res => {
                    if (res.state === '000001') {
                        this.setState({ orderInfo: res.data });
                    }
                });
            this.queryWishOrderLog(params);
        }
    }
    
    // 分页变化
    handlePaginationChange = (pageNumber, pageData) => {
        const { orderId } = this.props;
        const params = {
            orderId,
            pageNumber,
            pageData,
        };
        this.setState({ pageNumber, pageData });
        this.queryWishOrderLog(params);
    }

    // 请求wish平台订单日志
    queryWishOrderLog = (params) => {
        fetchPost(API.QUERY_LOG, {data: params}, 2)
            .then(res => {
                if (res.state === '000001') {
                    this.setState({
                        orderLog: res.data,
                        total: res.total,
                    });
                }
            })
    }

    render() {
        const { visible, closeModal } = this.props;
        const {
            orderLog,
            total,
            pageNumber,
            pageData,
        } = this.state;
        const {
            costDetail,             //费用详情
            goodsDetail,            //产品详情
            logisticsInformation,   //物流信息
            receivingAddress,       //收货地址
            refundInformation       //退款信息
        } = this.state.orderInfo;
        let url = '';
        if (goodsDetail){
            url = goodsDetail.isException ?
            `/order/exceptionorderlist/exceptionorderdetail/?orderId=${goodsDetail.companyOrdersId}`
            : `/order/orderlist/orderdetail/?orderId=${goodsDetail.companyOrdersId}`;
        }
        return (
            <div className="wishorder-modal">
                <Modal
                    visible={visible}
                    title={'wish订单详情'}
                    destroyOnClose={true}
                    width={900}
                    okText={'关闭'}
                    onCancel={closeModal}
                    footer={
                        <div><Button onClick={closeModal}>关闭</Button></div>
                    }
                >
                    <div>
                        {this.state.orderInfo ? (
                            <div className="wishorder-modal-content">
                                <div className="wishorder-modal-productInfo">
                                    <h3><span className="wishorder-span-before"></span>产品详情</h3>
                                    <Row>
                                        <Col span={8}>
                                            <div>
                                                <span className="wishorder-span-4" style={{ verticalAlign: 'top' }}>商品图标</span>
                                                <span style={{ display: 'inline-block', margin: '0 4px', verticalAlign: 'top' }}>：</span>
                                                <span className="wishorder-span-content">
                                                    <img src={goodsDetail.skuPicture} style={{ width: 80, height: 80 }} />
                                                </span>
                                            </div>
                                        </Col>
                                        <Col span={12}>
                                            <div>
                                                <span className="wishorder-span-6">平台单号</span>
                                                <span style={{ display: 'inline-block', margin: '0 4px' }}>：</span>
                                                <span className="wishorder-span-content">{goodsDetail.orderId}</span>
                                            </div>
                                            <div>
                                                <span className="wishorder-span-6">YKS单号</span>
                                                <span style={{ display: 'inline-block', margin: '0 4px' }}>：</span>
                                                <span className="wishorder-span-content"><Link to={url} target="_blank">{goodsDetail.companyOrdersId}</Link></span>
                                            </div>
                                            <div>
                                                <span className="wishorder-span-6">产品名称</span>
                                                <span style={{ display: 'inline-block', margin: '0 4px' }}>：</span>
                                                <span className="wishorder-span-content">{goodsDetail.productName}</span>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={8}>
                                            <div>
                                                <span className="wishorder-span-4">平台SKU</span>
                                                <span style={{ display: 'inline-block', margin: '0 4px' }}>：</span>
                                                <span className="wishorder-span-content">{goodsDetail.sellerSku}</span>
                                            </div>
                                        </Col>
                                        <Col span={8}>
                                            <div>
                                                <span className="wishorder-span-6">颜色</span>
                                                <span style={{ display: 'inline-block', margin: '0 4px' }}>：</span>
                                                <span className="wishorder-span-content">{goodsDetail.color}</span>
                                            </div>
                                        </Col>
                                        <Col span={8}>
                                            <div>
                                                <span className="wishorder-span-6">尺寸</span>
                                                <span style={{ display: 'inline-block', margin: '0 4px' }}>：</span>
                                                <span className="wishorder-span-content">{goodsDetail.size}</span>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={24}>
                                            <div>
                                                <span className="wishorder-span-4">销售账号</span>
                                                <span style={{ display: 'inline-block', margin: '0 4px' }}>：</span>
                                                <span className="wishorder-span-content">{goodsDetail.sellerId}</span>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                <div className="wishorder-modal-paymentInfo">
                                    <h3><span className="wishorder-span-before"></span>费用详情</h3>
                                    <Row>
                                        <Col span={8}>
                                            <div>
                                                <span className="wishorder-span-4">交易号</span>
                                                <span style={{ display: 'inline-block', margin: '0 4px' }}>：</span>
                                                <span className="wishorder-span-content">{costDetail.transactionId}</span>
                                            </div>
                                            <div>
                                                <span className="wishorder-span-4">数量</span>
                                                <span style={{ display: 'inline-block', margin: '0 4px' }}>：</span>
                                                <span className="wishorder-span-content">{costDetail.quantity}</span>
                                            </div>
                                            <div>
                                                <span className="wishorder-span-4">客付运费</span>
                                                <span style={{ display: 'inline-block', margin: '0 4px' }}>：</span>
                                                <span className="wishorder-span-content">{costDetail.shipping}</span>
                                            </div>
                                        </Col>
                                        <Col span={8}>
                                            <div>
                                                <span className="wishorder-span-6">付款时间</span>
                                                <span style={{ display: 'inline-block', margin: '0 4px' }}>：</span>
                                                <span className="wishorder-span-content">{timestampFromat(parseInt(costDetail.orderTime), 2)}</span>
                                            </div>
                                            <div>
                                                <span className="wishorder-span-6">礼品</span>
                                                <span style={{ display: 'inline-block', margin: '0 4px' }}>：</span>
                                                <span className="wishorder-span-content">{}</span>
                                            </div>
                                            <div>
                                                <span className="wishorder-span-6">总金额</span>
                                                <span style={{ display: 'inline-block', margin: '0 4px' }}>：</span>
                                                <span className="wishorder-span-content">{costDetail.total}</span>
                                            </div>
                                        </Col>
                                        <Col span={8}>
                                            <div>
                                                <span className="wishorder-span-6">售价</span>
                                                <span style={{ display: 'inline-block', margin: '0 4px' }}>：</span>
                                                <span className="wishorder-span-content">{costDetail.price}</span>
                                            </div>
                                            <div>
                                                <span className="wishorder-span-6">小计</span>
                                                <span style={{ display: 'inline-block', margin: '0 4px' }}>：</span>
                                                <span className="wishorder-span-content">{costDetail.subTotal}</span>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                <div className="wishorder-modal-receiptAddress">
                                    <h3><span className="wishorder-span-before"></span>收货地址</h3>
                                    <Row>
                                        <Col span={8}>
                                            <div>
                                                <span className="wishorder-span-4">收件人</span>
                                                <span style={{ display: 'inline-block', margin: '0 4px' }}>：</span>
                                                <span className="wishorder-span-content">{receivingAddress.buyerName}</span>
                                            </div>
                                        </Col>
                                        <Col span={8}>
                                            <div>
                                                <span className="wishorder-span-6">地址一</span>
                                                <span style={{ display: 'inline-block', margin: '0 4px' }}>：</span>
                                                <span className="wishorder-span-content">{receivingAddress.buyerStreetAddress}</span>
                                            </div>
                                        </Col>
                                        <Col span={8}>
                                            <div>
                                                <span className="wishorder-span-6">地址二</span>
                                                <span style={{ display: 'inline-block', margin: '0 4px' }}>：</span>
                                                <span className="wishorder-span-content">{receivingAddress.buyerStreetAddressTwo ? receivingAddress.buyerStreetAddressTwo : ''}</span>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={8}>
                                            <div>
                                                <span className="wishorder-span-4">国家</span>
                                                <span style={{ display: 'inline-block', margin: '0 4px' }}>：</span>
                                                <span className="wishorder-span-content">{receivingAddress.buyerCountryName}</span>
                                            </div>
                                        </Col>
                                        <Col span={8}>
                                            <div>
                                                <span className="wishorder-span-6">省/州</span>
                                                <span style={{ display: 'inline-block', margin: '0 4px' }}>：</span>
                                                <span className="wishorder-span-content">{receivingAddress.buyerState}</span>
                                            </div>
                                        </Col>
                                        <Col span={8}>
                                            <div>
                                                <span className="wishorder-span-6">城市</span>
                                                <span style={{ display: 'inline-block', margin: '0 4px' }}>：</span>
                                                <span className="wishorder-span-content">{receivingAddress.buyerCity}</span>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={8}>
                                            <div>
                                                <span className="wishorder-span-4">电话</span>
                                                <span style={{ display: 'inline-block', margin: '0 4px' }}>：</span>
                                                <span className="wishorder-span-content">{receivingAddress.buyerPhoneNumber}</span>
                                            </div>
                                        </Col>
                                        <Col span={8}>
                                            <div>
                                                <span className="wishorder-span-6">邮编</span>
                                                <span style={{ display: 'inline-block', margin: '0 4px' }}>：</span>
                                                <span className="wishorder-span-content">{receivingAddress.buyerZipCode}</span>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                <div className="wishorder-modal-receiptAddress">
                                    <h3><span className="wishorder-span-before"></span>物流信息</h3>
                                    <Row>
                                        <Col span={8}>
                                            <div>
                                                <span className="wishorder-span-4">物流状态</span>
                                                <span style={{ display: 'inline-block', margin: '0 4px' }}>：</span>
                                                <span className="wishorder-span-content">{}</span>
                                            </div>
                                            <div>
                                                <span className="wishorder-span-4">追踪号</span>
                                                <span style={{ display: 'inline-block', margin: '0 4px' }}>：</span>
                                                <span className="wishorder-span-content">{logisticsInformation.trackingNumber}</span>
                                            </div>
                                        </Col>
                                        <Col span={8}>
                                            <div>
                                                <span className="wishorder-span-6">物流商</span>
                                                <span style={{ display: 'inline-block', margin: '0 4px' }}>：</span>
                                                <span className="wishorder-span-content">{logisticsInformation.shippingProvider}</span>
                                            </div>
                                            <div>
                                                <span className="wishorder-span-6">预计送达时间</span>
                                                <span style={{ display: 'inline-block', margin: '0 4px' }}>：</span>
                                                <span className="wishorder-span-content">{}</span>
                                            </div>
                                        </Col>
                                        <Col span={8}>
                                            <div>
                                                <span className="wishorder-span-6">标记发货时间</span>
                                                <span style={{ display: 'inline-block', margin: '0 4px' }}>：</span>
                                                <span className="wishorder-span-content">{logisticsInformation.shippedDateStr ? timestampFromat(parseInt(logisticsInformation.shippedDateStr), 2) : null}</span>
                                            </div>
                                            <div>
                                                <span className="wishorder-span-6">最近更新时间</span>
                                                <span style={{ display: 'inline-block', margin: '0 4px' }}>：</span>
                                                <span className="wishorder-span-content">{logisticsInformation.latestUpdateTime ? timestampFromat(parseInt(logisticsInformation.latestUpdateTime), 2) : null}</span>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                {
                                    refundInformation ? (
                                        <div className="wishorder-modal-refundInformation">
                                            <h3><span className="wishorder-span-before"></span>退款信息</h3>
                                            <Row>
                                                <Col span={8}>
                                                    <div>
                                                        <span className="wishorder-span-4">退款时间</span>
                                                        <span style={{ display: 'inline-block', margin: '0 4px' }}>：</span>
                                                        <span className="wishorder-span-content">{refundInformation.refundedTime ? timestampFromat(parseInt(refundInformation.refundedTime), 2) : null}</span>
                                                    </div>
                                                </Col>
                                                <Col span={8}>
                                                    <div>
                                                        <span className="wishorder-span-6">退款数量</span>
                                                        <span style={{ display: 'inline-block', margin: '0 4px' }}>：</span>
                                                        <span className="wishorder-span-content">{refundInformation.refundableNum}</span>
                                                    </div>
                                                </Col>
                                                <Col span={8}>
                                                    <div>
                                                        <span className="wishorder-span-6">退款平台</span>
                                                        <span style={{ display: 'inline-block', margin: '0 4px' }}>：</span>
                                                        <span className="wishorder-span-content">{refundInformation.refundablePlatform}</span>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col span={8}>
                                                    <div>
                                                        <span className="wishorder-span-4">退款金额</span>
                                                        <span style={{ display: 'inline-block', margin: '0 4px' }}>：</span>
                                                        <span className="wishorder-span-content">{refundInformation.merchantResponsibleRefundAmount}</span>
                                                    </div>
                                                </Col>
                                                <Col span={16}>
                                                    <div>
                                                        <span className="wishorder-span-6">退款原因</span>
                                                        <span style={{ display: 'inline-block', margin: '0 4px' }}>：</span>
                                                        <span className="wishorder-span-content">{refundInformation.refundedReason}</span>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    ) : null
                                }
                                <div className="wishorder-modal-receiptAddress">
                                    <h3><span className="wishorder-span-before"></span>订单操作日志</h3>
                                    <Table
                                        columns={this.columns}
                                        pagination={false}
                                        // scroll={{y: 255}}
                                        dataSource={datasaddkey(orderLog)}
                                        bordered
                                    />
                                    <Pagination
                                        className="g-rt"
                                        showTotal={total => `共 ${total} 条`}
                                        pageSizeOptions={['20', '30', '40', '50']}
                                        showSizeChanger
                                        showQuickJumper={{goButton: true}}
                                        current={pageNumber}
                                        defaultCurrent={1}
                                        total={total}
                                        pageSize={pageData}
                                        onChange={this.handlePaginationChange}
                                        onShowSizeChange={this.handlePaginationChange}
                                        />
                                </div>
                            </div>
                        ) : null}
                    </div>
                </Modal>
            </div>
        );
    }
}
