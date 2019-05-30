/**
 * 订单 - 业绩看板 - 订单分析 - 图表模块
 */
import React from 'react';
import {
    Row,
    Col
} from 'antd';

export default class Listcontent extends React.Component {

    render() {
        const {
            data,
        } = this.props;
        const order = data.sum;
        return (
            <div className="clear">
                <Row>
                    <Col span={16}>
                        <Row>
                            <Col span={8}>
                                <div className="order_quantity">
                                    <h4>订单量</h4>
                                    <p>{order.orderCount ? order.orderCount : 0}</p>
                                    <p>(单位:笔)</p>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div className="sales_volume">
                                    <h4>销售额</h4>
                                    <p>{order.salesAmount ? order.salesAmount : 0}</p>
                                    <p>(单位:$)</p>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div className="customer_unit_price">
                                    <h4>客单价</h4>
                                    <p>{order.customerUnitPrice ? order.customerUnitPrice : 0}</p>
                                    <p>(单位:$)</p>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <div className="pms-analysis-title">
                            <p><span>说明：</span>订单数的统计是按照订单的“付款时间”来计算。</p>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}
