
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
    formItemLayout1 = {
        labelCol: { span: 2 },
        wrapperCol: { span: 22 },
    };
    render() {
        const {
            formItemLayout,
            formItemLayout1
        } = this;
        const { Infos } = this.props;
        return (
            <Title title="物流信息">
                <Row>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="渠道名称"
                        >
                            {Infos.shippingProvider}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="跟踪号"
                        >
                            {Infos.trackingNumber}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="发货时间"
                        >
                            {Infos.shippedDate ? timestampFromat(Infos.shippedDate) : "--"}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <FormItem
                            {...formItemLayout1}
                            label="备注"
                        >
                            {Infos.shipNote}
                        </FormItem>
                    </Col>
                </Row>
            </Title>
        )
    }
}