import React, { Component } from 'react';
import {
    Col, Form, Row,
} from 'antd';
const FormItem = Form.Item;

const imgVerticalLine = require('../img/VerticalLine.png');

const formItemLayout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 },
};

/**
 * 采购单基本信息
 */
class OrderInfoView extends Component {
    render() {
        const { mainDataList } = this.props;
        const data = mainDataList.orderInfo;

        return (
            <div className='al-Order-Info'>
                <Form layout="horizontal">
                    <div className="al-grid-list">
                        <img
                            className="al-group-img"
                            src={imgVerticalLine}
                            alt=""
                            width="3px"
                            height="12px"
                        />
                        <span className="al-group-label">订单信息</span>
                        <Row>
                            <Col span={7}>
                                <FormItem
                                    {...formItemLayout}
                                    label="阿里订单号"
                                >
                                    <div className="al-grid-list-item">{data.alOrderNumber || '--'}</div>
                                </FormItem>
                            </Col>
                            <Col span={7}>
                                <FormItem
                                    {...formItemLayout}
                                    label="阿里订单金额"
                                >
                                    <div className="al-grid-list-item">{data.orderMoney || '--'}</div>
                                </FormItem>
                            </Col>
                            <Col span={7}>
                                <FormItem
                                    {...formItemLayout}
                                    label="阿里订单下单时间"
                                >
                                    <div className="al-grid-list-item">{data.ordersTime || '--'}</div>
                                </FormItem>
                            </Col>

                            <Col span={7}>
                                <FormItem
                                    {...formItemLayout}
                                    label="运费"
                                >
                                    <div className="al-grid-list-item">{data.freight || '--'}</div>
                                </FormItem>
                            </Col>
                            <Col span={7}>
                                <FormItem
                                    {...formItemLayout}
                                    label="退款金额"
                                >
                                    <div className="al-grid-list-item">{data.refundMoney || '--'}</div>
                                </FormItem>
                            </Col>
                            <Col span={7}>
                                <FormItem
                                    {...formItemLayout}
                                    label="付款时间"
                                >
                                    <div className="al-grid-list-item">{data.payTime || '--'}</div>
                                </FormItem>
                            </Col>

                            <Col span={7}>
                                <FormItem
                                    {...formItemLayout}
                                    label="折扣"
                                >
                                    <div className="al-grid-list-item">{data.discount || '--'}</div>
                                </FormItem>
                            </Col>
                            <Col span={7}>
                                <FormItem
                                    {...formItemLayout}
                                    label="阿里订单状态"
                                >
                                    <div className="al-grid-list-item">{data.alOrderState || '--'}</div>
                                </FormItem>
                            </Col>
                        </Row>
                    </div>
                </Form>
            </div>
        );
    }
}

export default OrderInfoView;
