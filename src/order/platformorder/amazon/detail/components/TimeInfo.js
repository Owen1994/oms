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
class TimeInfo extends Component {
    render() {
        const { amazonListData } = this.props;
        const timeData = amazonListData.timeInfo ? amazonListData.timeInfo : {};
        return (
            <div className="amazon-detail-time-info">
                <img
                    className="amazon-detail-head-img"
                    src={imgVerticalLine}
                    alt=""
                    width="3px"
                    height="12px"
                />
                <span className="amazon-detail-head-label">时间信息</span>

                <Row>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="创单时间"
                        >
                            <span className="amazon-detail-title">{timeData.createTime ? timeData.createTime : ''}</span>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="抓单/导入时间"
                        >
                            <span className="amazon-detail-title">{timeData.grapTime ? timeData.grapTime : ''}</span>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="确认可发货时间"
                        >
                            <span className="amazon-detail-title">{timeData.prepareDeliveryTime ? timeData.prepareDeliveryTime : ''}</span>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="发货时间"
                        >
                            <span className="amazon-detail-title">{timeData.deliveryTime ? timeData.deliveryTime : ''}</span>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="实际标记时间"
                        >
                            <span className="amazon-detail-title">{timeData.markTime ? timeData.markTime : ''}</span>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="可标记开始时间"
                        >
                            <span className="amazon-detail-title">{timeData.mayMarkBeginTime ? timeData.mayMarkBeginTime : ''}</span>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="可标记结束时间"
                        >
                            <span className="amazon-detail-title">{timeData.mayMarkEndTime ? timeData.mayMarkEndTime : ''}</span>
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default TimeInfo;
