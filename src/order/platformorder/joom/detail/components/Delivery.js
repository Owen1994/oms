
import React, { Component } from 'react'
import Title from './Title'
import {
    Row,
    Col,
    Form
} from 'antd'

const FormItem = Form.Item;

export default class Info extends Component {
    formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    };
    render() {
        const {
            formItemLayout
        } = this;
        const { Infos } = this.props;
        return (
            <Title title="收货信息">
                <Row>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="买家ID"
                        >
                            {Infos.buyerId}
                        </FormItem>
                    </Col>
                    <Col span={8}>

                        <FormItem
                            {...formItemLayout}
                            label="收件人"
                        >
                            {Infos.buyerName}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="电话号码"
                        >
                            {Infos.buyerPhoneNumber}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="国家"
                        >
                            {Infos.buyerCountry}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="省/州"
                        >
                            {Infos.buyerState}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="市"
                        >
                            {Infos.buyerCity}
                        </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="街道1"
                        >
                            {Infos.buyerStreet1}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="街道2"
                        >
                            {Infos.buyerStreet2}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="邮编"
                        >
                            {Infos.buyerZipcode}
                        </FormItem>
                    </Col>
                </Row>
            </Title>
        )
    }
}