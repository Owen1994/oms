import React, { Component } from 'react';
import {
    Col, Form, Row,
} from 'antd';
const FormItem = Form.Item;

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};
const imgVerticalLine = require('../img/VerticalLine.png');

/**
 * 订单信息
 */
class MoneyInfo extends Component {
    render() {
        const { amazonListData } = this.props;
        const moneyData = amazonListData.moneyInfo ? amazonListData.moneyInfo : {};
        return (
            <div className="amazon-detail-buyers-info">
                <img
                    className="amazon-detail-head-img"
                    src={imgVerticalLine}
                    alt=""
                    width="3px"
                    height="12px"
                />
                <span className="amazon-detail-head-label">金额信息</span>

                <Row>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="商品总金额"
                        >
                            <span className="amazon-detail-title">{moneyData.currency ? moneyData.currency : ''}&nbsp;</span>
                            <span className="amazon-detail-title">{moneyData.productSum ? moneyData.productSum : '0'}</span>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="优惠金额"
                        >
                            <span className="amazon-detail-title">{moneyData.currency ? moneyData.currency : ''}&nbsp;</span>
                            <span className="amazon-detail-title">{moneyData.discountMoney ? moneyData.discountMoney : '0'}</span>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="平台佣金"
                        >
                            <span className="amazon-detail-title">{moneyData.currency ? moneyData.currency : ''}&nbsp;</span>
                            <span className="amazon-detail-title">{moneyData.platformCommission ? moneyData.platformCommission : '0'}</span>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="平台交易费"
                        >
                            <span className="amazon-detail-title">{moneyData.currency ? moneyData.currency : ''}&nbsp;</span>
                            <span className="amazon-detail-title">{moneyData.platformTradingFee ? moneyData.platformTradingFee : '0'}</span>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="客付运费"
                        >
                            <span className="amazon-detail-title">{moneyData.currency ? moneyData.currency : ''}&nbsp;</span>
                            <span className="amazon-detail-title">{moneyData.buyerPayFreight ? moneyData.buyerPayFreight : '0'}</span>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="客付运费税费"
                        >
                            <span className="amazon-detail-title">{moneyData.currency ? moneyData.currency : ''}&nbsp;</span>
                            <span className="amazon-detail-title">{moneyData.buyerPayFreightTax ? moneyData.buyerPayFreightTax : '0'}</span>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="实付金额"
                        >
                            <span className="amazon-detail-title">{moneyData.currency ? moneyData.currency : ''}&nbsp;</span>
                            <span className="amazon-detail-title">{moneyData.realPayment ? moneyData.realPayment : '0'}</span>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="订单总金额"
                        >
                            <span className="amazon-detail-title">{moneyData.currency ? moneyData.currency : ''}&nbsp;</span>
                            <span className="amazon-detail-title">{moneyData.orderSum ? moneyData.orderSum : '0'}</span>
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default MoneyInfo;
