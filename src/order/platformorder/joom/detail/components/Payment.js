
import React, { Component } from 'react'
import Title from './Title'
import {
    Row,
    Col,
    Form
} from 'antd'
import {
    timestampFromat,
    functions,
} from '../../../../../util/baseTool';
const FormItem = Form.Item;

export default class Info extends Component {
    formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    };
    play = {
        1:"5%",
        2:"15%"
    }
    render() {
        const {
            formItemLayout
        } = this;
        const { Infos } = this.props;
        const currency = ` ${Infos.currency}`
        return (
            <Title title="付款信息">
                <Row>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="商品价格"
                        >
                            {Infos.orderAmount}
                            {currency}
                        </FormItem>
                    </Col>
                    <Col span={8}>

                        <FormItem
                            {...formItemLayout}
                            label="运费"
                        >
                            {Infos.shippingCost}
                            {currency}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="优惠金额"
                        >
                            {Infos.discountsSum}
                            {currency}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="订单总金额"
                        >
                            {Infos.orderTotal}
                            {currency}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="平台佣金"
                        >
                            {Infos.commission}
                            {currency}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="佣金比例"
                        >
                            {this.play[Infos.commissionRate]}
                        </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="卖家收入"
                        >
                            {Infos.orderCost}
                            {currency}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="支付方式"
                        >
                            {Infos.payment}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="付款时间"
                        >
                            {Infos.orderPayTime ? timestampFromat(Infos.orderPayTime) : "--"}
                        </FormItem>
                    </Col>
                </Row>
            </Title>
        )
    }
}