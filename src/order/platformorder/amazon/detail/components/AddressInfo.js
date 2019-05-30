import React, { Component } from 'react';
import {
    Col, Form, Row,
} from 'antd';
const FormItem = Form.Item;

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};

const formItemLayout1 = {
    labelCol: { span: 2 },
    wrapperCol: { span: 22 },
};

const imgVerticalLine = require('../img/VerticalLine.png');

/**
 * 订单信息
 */
class AddressInfo extends Component {
    render() {
        const { amazonListData } = this.props;
        const addressData = amazonListData.addressInfo ? amazonListData.addressInfo : {};
        return (
            <div className="amazon-detail-address-info">
                <img
                    className="amazon-detail-head-img"
                    src={imgVerticalLine}
                    alt=""
                    width="3px"
                    height="12px"
                />
                <span className="amazon-detail-head-label">地址信息</span>

                <Row>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="收货人"
                        >
                            <span className="amazon-detail-title">{addressData.receiver ? addressData.receiver : ''}</span>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="国家全称(简称):"
                        >
                            <span className="amazon-detail-title">{addressData.receivingCountry ? addressData.receivingCountry : ''}</span>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="邮编"
                        >
                            <span className="amazon-detail-title">{addressData.receivingMail ? addressData.receivingMail : ''}</span>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="固定电话"
                        >
                            <span className="amazon-detail-title">{addressData.fixLineTelphone ? addressData.fixLineTelphone : ''}</span>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="移动电话"
                        >
                            <span className="amazon-detail-title">{addressData.mobilePhone ? addressData.mobilePhone : ''}</span>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="省/州"
                        >
                            <span className="amazon-detail-title">{addressData.province ? addressData.province : ''}</span>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="市"
                        >
                            <span className="amazon-detail-title">{addressData.city ? addressData.city : ''}</span>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="区/县"
                        >
                            <span className="amazon-detail-title">{addressData.county ? addressData.county : ''}</span>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={22}>
                        <FormItem
                            {...formItemLayout1}
                            label="地址1"
                        >
                            <span className="amazon-detail-title">{addressData.detailAddress1 ? addressData.detailAddress1 : ''}</span>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={22}>
                        <FormItem
                            {...formItemLayout1}
                            label="地址2"
                        >
                            <span className="amazon-detail-title">{addressData.detailAddress2 ? addressData.detailAddress2 : ''}</span>
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default AddressInfo;
