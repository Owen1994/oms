import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {
    Col, Row, Form,
} from 'antd';
const FormItem = Form.Item;

const imgVerticalLine = require('../img/VerticalLine.png');

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};

/**
 * 订单信息
 */
class OrderInfo extends Component {
    render() {
        const { amazonListData } = this.props;
        const orderData = amazonListData.basicInfo ? amazonListData.basicInfo : {};
        let isOne = false;
        let isTwo = false;
        let isThree = false;
        if (orderData.platformState) {
            switch (orderData.platformState) {
                case '1':
                    isOne = true;
                    break;
                case '2':
                    isOne = true;
                    isTwo = true;
                    break;
                case '3':
                    isOne = true;
                    isTwo = true;
                    isThree = true;
                    break;
                case '4':
                    isOne = true;
                    isTwo = true;
                    isThree = true;
                    break;
                default:
                    isOne = false;
                    isTwo = false;
                    isThree = false;
                    break;
            }
        }
        let url = '';
        if (orderData){
            url = orderData.isException ?
            `/order/exceptionorderlist/exceptionorderdetail/?orderId=${orderData.companyOrdersId}`
            : `/order/orderlist/orderdetail/?orderId=${orderData.companyOrdersId}`;
        }
        return (
            <div className="amazon-detail-order-info">
                <img
                    className="amazon-detail-head-img"
                    src={imgVerticalLine}
                    alt=""
                    width="3px"
                    height="12px"
                />
                <span className="amazon-detail-head-label">订单信息</span>

                <Row>
                    <Col span={1} offset={1}>
                        <div className="amazon-detail-order-progress progress-circle">
                            <div className={isOne ? "circle-true" : "circle-false"}>
                                <span>1</span>
                            </div>
                        </div>
                    </Col>
                    <Col span={7}>
                        <div className={isTwo ? "line-true" : "line-false"}/>
                    </Col>
                    <Col span={1}>
                        <div className="amazon-detail-order-progress progress-circle">
                            <div className={isTwo ? "circle-true" : "circle-false"}>
                                <span>2</span>
                            </div>
                        </div>
                    </Col>
                    <Col span={7}>
                        <div className={isThree ? "line-true" : "line-false"}/>
                    </Col>
                    <Col span={1}>
                        <div className="amazon-detail-order-progress progress-circle">
                            <div className={isThree ? "circle-true" : "circle-false"}>
                                <span>3</span>
                            </div>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col span={3}>
                        <div className="amazon-detail-order-progress-title">
                            <span className={isOne ? "span-true" : "span-false"}>买家下单</span>
                        </div>
                    </Col>
                    <Col span={3} offset={5}>
                        <div className="amazon-detail-order-progress-title">
                            <span className={isTwo ? "span-true" : "span-false"}>审核完成待发货</span>
                        </div>
                    </Col>
                    <Col span={3} offset={5}>
                        <div className="amazon-detail-order-progress-title">
                            <span className={isThree ? "span-true" : "span-false"}>卖家发货/订单取消</span>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="平台名称"
                        >
                            <span className="amazon-detail-title">{orderData.platform ? orderData.platform : ''}</span>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="账号"
                        >
                            <span className="amazon-detail-title">{orderData.sellerAccount ? orderData.sellerAccount : ''}</span>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="国家"
                        >
                            <span className="amazon-detail-title">{orderData.country ? orderData.country : ''}</span>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="平台订单号"
                        >
                            <span className="amazon-detail-title">{orderData.platformOrderNumber ? orderData.platformOrderNumber : ''}</span>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="YKS单号"
                        >
                            <Link className="amazon-detail-title" to={url} target="_blank">{orderData.companyOrdersId}</Link>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="订单来源"
                        >
                            <span className="amazon-detail-title">{orderData.orderSource ? orderData.orderSource : ''}</span>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="订单总金额"
                        >
                            <span className="amazon-detail-title">{orderData.currency ? orderData.currency : ''}&nbsp;</span>
                            <span className="amazon-detail-title">{orderData.orderMoney ? orderData.orderMoney : ''}</span>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="发货类型"
                        >
                            <span className="amazon-detail-title">{orderData.deliveryType ? orderData.deliveryType : ''}</span>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="发货方式"
                        >
                            <span className="amazon-detail-title">{orderData.deliveryWay ? orderData.deliveryWay : ''}</span>
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default OrderInfo;
