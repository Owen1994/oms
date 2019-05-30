/**
 * 作者: pzt
 * 描述: 详情页资金详情组件
 * 时间: 2018/4/18 20:27
 **/
import React, {Component} from 'react'
import {render} from 'react-dom'
import {connect} from 'react-redux'
import {
    Table
    ,Form,
    Row,
    Col,
    Input
} from 'antd'
import '../css/css.css'
const FormItem = Form.Item


class CapitalDetail extends React.Component {
    constructor(props) {
        super(props);
    }
    formItemLayout3 = {
        labelCol: {span: 11},
        wrapperCol: {span: 13}
    }

    render() {
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
        return (
            <div>
                <div className="newCluenk noborderCluenk">
                    <div className="title" id="capital-detail" ref="capitalDetail">订单总额</div>
                    <div className="content capital-detail">
                        <Row>
                            <Col span={6}>
                                <FormItem
                                    label="产品价格"  {...this.formItemLayout3} className={'ant-xs-row'}
                                >
                                    {getFieldDecorator('productPrice', {
                                        rules: [{required: false, message: '产品价格'}],
                                    })(
                                        <Input readOnly="true" placeholder=""  maxLength={100}/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={6}>
                                <FormItem
                                    label="运费"  {...this.formItemLayout3} className={'ant-xs-row'}
                                >
                                    {getFieldDecorator('freight', {
                                        rules: [{required: false, message: '运费'}],
                                    })(
                                        <Input readOnly="true" placeholder=""  maxLength={100}/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={6}>
                                <FormItem
                                    label="价格调整"  {...this.formItemLayout3} className={'ant-xs-row'}
                                >
                                    {getFieldDecorator('priceAdjustment', {
                                        rules: [{required: false, message: '价格调整'}],
                                    })(
                                        <Input readOnly="true" placeholder=""  maxLength={100}/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={6}>
                                <FormItem
                                    label="优惠金额"  {...this.formItemLayout3} className={'ant-xs-row'}
                                >
                                    {getFieldDecorator('discount', {
                                        rules: [{required: false, message: '优惠金额'}],
                                    })(
                                        <Input readOnly="true" placeholder=""  maxLength={100}/>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row className={'margin-ms-top'}>
                            <Col span={6}>
                                <FormItem
                                    label="订单总额"  {...this.formItemLayout3} className={'ant-xs-row'}
                                >
                                    {getFieldDecorator('sum', {
                                        rules: [{required: false, message: '订单总额'}],
                                    })(
                                        <Input readOnly="true" placeholder=""  maxLength={100}/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={6}>
                                <FormItem
                                    label="交易手续费"  {...this.formItemLayout3} className={'ant-xs-row'}
                                >
                                    {getFieldDecorator('transactionFee', {
                                        rules: [{required: false, message: '交易手续费'}],
                                    })(
                                        <Input readOnly="true" placeholder=""  maxLength={100}/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={6}>
                                <FormItem
                                    label="预计可得"  {...this.formItemLayout3} className={'ant-xs-row'}
                                >
                                    {getFieldDecorator('estimate', {
                                        rules: [{required: false, message: '预计可得'}],
                                    })(
                                        <Input readOnly="true" placeholder=""  maxLength={100}/>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className="newCluenk noborderCluenk">
                    <div className="title">收款金额</div>
                    <div className="content capital-detail">
                        <Row>
                            <Col span={6}>
                                <FormItem
                                    label="买家应付"  {...this.formItemLayout3} className={'ant-xs-row'}
                                >
                                    {getFieldDecorator('meet', {
                                        rules: [{required: false, message: '买家应付'}],
                                    })(
                                        <Input readOnly="true" placeholder=""  maxLength={100}/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={6}>
                                <FormItem
                                    label="已付款"  {...this.formItemLayout3} className={'ant-xs-row'}
                                >
                                    {getFieldDecorator('payment1', {
                                        rules: [{required: false, message: '已付款'}],
                                    })(
                                        <Input readOnly="true" placeholder=""  maxLength={100}/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={6}>
                                <FormItem
                                    label="支付方式"  {...this.formItemLayout3} className={'ant-xs-row'}
                                >
                                    {getFieldDecorator('payWay', {
                                        rules: [{required: false, message: '支付方式'}],
                                    })(
                                        <Input readOnly="true" placeholder=""  maxLength={100}/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={6}>
                                <FormItem
                                    label="收款日期"  {...this.formItemLayout3} className={'ant-xs-row'}
                                >
                                    {getFieldDecorator('paymentTime', {
                                        rules: [{required: false, message: '收款日期'}],
                                    })(
                                        <Input readOnly="true" placeholder=""  maxLength={100}/>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        )
    }
}

export default CapitalDetail;