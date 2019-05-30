/**
 * 作者: pzt
 * 描述: 速卖通详情页订单详情组件
 * 时间: 2018/4/18 20:28
 **/
import React, {Component} from 'react'
import {render} from 'react-dom'
import {
    Form,
    Row,
    Col,
    Input,
    Tooltip,
} from 'antd'
const FormItem = Form.Item

import '../css/css.css'

class OrderDetail extends React.Component {
    constructor(props) {
        super(props);
    }

    formItemLayout3 = {
        labelCol: {span: 11},
        wrapperCol: {span: 13}
    }

    render () {
        const {getFieldDecorator, getFieldValue} = this.props.form;
        return(
            <div className="newCluenk noborderCluenk">
                <div className="title" id="order-detail" ref={'orderDetail'}> 订单详情</div>
                <div className="content order-detail">
                    <div>
                        <Row>
                            <Col span={6} >
                                <FormItem
                                    label="买家ID"  {...this.formItemLayout3} className={'ant-xs-row'}
                                >
                                    <Tooltip title={getFieldValue('buyer')} placement="topLeft">
                                        {getFieldDecorator('buyer', {
                                            rules: [{required: false, message: '请输入状态'}],
                                        })(
                                                <Input readOnly="true" />
                                        )}
                                    </Tooltip>
                                </FormItem>
                            </Col>
                            <Col span={6} >
                                <FormItem
                                    label="收件人"  {...this.formItemLayout3} className={'ant-xs-row'}
                                >
                                    {getFieldDecorator('consignee', {
                                        rules: [{required: false, message: '收件人'}],
                                    })(
                                        <Input readOnly="true"/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={6} >
                                <FormItem
                                    label="手机"  {...this.formItemLayout3} className={'ant-xs-row'}
                                >
                                    {getFieldDecorator('phone', {
                                        rules: [{required: false, message: '手机'}],
                                    })(
                                        <Input readOnly="true" />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={6} >
                                <FormItem
                                    label="电话"  {...this.formItemLayout3} className={'ant-xs-row'}
                                >
                                    {getFieldDecorator('tel', {
                                        rules: [{required: false, message: '电话'}],
                                    })(
                                        <Input readOnly="true" />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row className={"margin-ms-top"}>
                            <Col span={6} >
                                <FormItem
                                    label="传真"  {...this.formItemLayout3} className={'ant-xs-row'}
                                >
                                    {getFieldDecorator('fax', {
                                        rules: [{required: false, message: '传真'}],
                                    })(
                                        <Input readOnly="true" />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={6} >
                                <FormItem
                                    label="邮编"  {...this.formItemLayout3} className={'ant-xs-row'}
                                >
                                    {getFieldDecorator('zip', {
                                        rules: [{required: false, message: '邮编'}],
                                    })(
                                        <Input readOnly="true" />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={6} >
                                <FormItem
                                    label="地址"  {...this.formItemLayout3} className={'ant-xs-row'}
                                >
                                    <Tooltip title={getFieldValue('address')} placement="topLeft">
                                        {getFieldDecorator('address', {
                                            rules: [{required: false, message: '地址'}],
                                        })(
                                            <Input readOnly="true"/>
                                        )}
                                    </Tooltip>
                                </FormItem>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        )
    }
}
export default OrderDetail;