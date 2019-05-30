import React, { Component } from 'react';
import {
    Col, Row, Form,
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
class BuyersInfo extends Component {
    render() {
        const { amazonListData } = this.props;
        const buyersData = amazonListData.buyerInfo ? amazonListData.buyerInfo : {};
        return (
            <div className="amazon-detail-buyers-info">
                <img
                    className="amazon-detail-head-img"
                    src={imgVerticalLine}
                    alt=""
                    width="3px"
                    height="12px"
                />
                <span className="amazon-detail-head-label">买家信息</span>

                <Row>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="买家账号"
                        >
                            <span className="amazon-detail-title">{buyersData.buyerAccount ? buyersData.buyerAccount : ''}</span>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="买家邮箱"
                        >
                            <span className="amazon-detail-title">{buyersData.buyerMail ? buyersData.buyerMail : ''}</span>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="来自国家"
                        >
                            <span className="amazon-detail-title">{buyersData.beFormCountry ? buyersData.beFormCountry : ''}</span>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="付款方式"
                        >
                            <span className="amazon-detail-title">{buyersData.paymentWay ? buyersData.paymentWay : ''}</span>
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default BuyersInfo;
