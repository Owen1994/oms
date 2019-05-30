import React, { Component } from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import actions from '../actions'
import moment from 'moment'
import qs from 'qs'
import { levelOptions } from '../../../util/options'
import {
    Form,
    Icon,
    Input,
    Button,
    Select,
    Row,
    Col,
    Radio,
    Cascader,
    Upload,
    Table,
    Popconfirm,
    Modal,
    DatePicker,
    message,
    Spin,
} from 'antd'
import '../css/css.css'

const FormItem = Form.Item
const Option = Select.Option
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

class AmountInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    formItemLayout = {
        labelCol: { span: 10 },
        wrapperCol: { span: 14 }
    }

    render() {

        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        return (
            <div className="newCluenk padTop10 deliveryParcel">
                <div className="title">金额信息</div>
                <div className="content">

                    <Row>
                        <Col span={6}>
                            <FormItem
                                label="订单总金额"  {...this.formItemLayout} className="widthAll"
                            >
                                {getFieldDecorator('orderAmount', {
                                    rules: [{ required: false, message: '' }],
                                })(
                                    <Input readOnly={true} placeholder="" id="success" maxLength={100} />
                                    )}
                            </FormItem>
                        </Col>
                        <Col span={6}>

                            <FormItem
                                label="销售金额"  {...this.formItemLayout} className="widthAll"
                            >
                                {getFieldDecorator('saleAmount', {
                                    rules: [{ required: false, message: '' }],

                                })(
                                    <Input readOnly={true} placeholder="" id="success" maxLength={100} />
                                    )}

                            </FormItem>
                        </Col>
                        <Col span={6}>

                            <FormItem
                                label="买家实付运费"  {...this.formItemLayout} className="widthAll"
                            >
                                {getFieldDecorator('freightChargesAmount', {
                                    rules: [{ required: false, message: '' }],
                                })(
                                    <Input readOnly={true} placeholder="" id="success" maxLength={100} />
                                    )}
                            </FormItem>
                        </Col>
                        <Col span={6}>

                            <FormItem
                                label="买家实付金额"  {...this.formItemLayout} className="widthAll"
                            >
                                {getFieldDecorator('buyerPaymentAmount', {
                                    rules: [{ required: false, message: '' }],
                                })(
                                    <Input readOnly={true} placeholder="" id="success" maxLength={100} />
                                    )}
                            </FormItem>
                        </Col>

                    </Row>

                    <Row>

                        <Col span={6}>
                            <FormItem
                                label="优惠金额"  {...this.formItemLayout} className="widthAll"
                            >
                                {getFieldDecorator('excellentCostAmount', {
                                    rules: [{ required: false, message: '' }],
                                })(
                                    <Input readOnly={true} placeholder="" id="success" maxLength={100} />
                                    )}
                            </FormItem>
                        </Col>
                        <Col span={6}>

                            <FormItem
                                label="调整金额"  {...this.formItemLayout} className="widthAll"
                            >
                                {getFieldDecorator('sellerAdjustAmount', {
                                    rules: [{ required: false, message: '' }],
                                })(
                                    <Input readOnly={true} placeholder="" id="success" maxLength={100} />
                                    )}
                            </FormItem>
                        </Col>
                        <Col span={6}>

                            <FormItem
                                label="卖家实收金额"  {...this.formItemLayout} className="widthAll"
                            >
                                {getFieldDecorator('sellerIncomeAmount', {
                                    rules: [{ required: false, message: '' }],
                                })(
                                    <Input readOnly={true} placeholder="" id="success" maxLength={100} />
                                    )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                label="平台交易费"  {...this.formItemLayout} className="widthAll"
                            >
                                {getFieldDecorator('platformTradeAmount', {
                                    rules: [{ required: false, message: '' }],
                                })(
                                    <Input readOnly={true} placeholder="" id="success" maxLength={100} />
                                    )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <FormItem
                                label="卖家实收运费"  {...this.formItemLayout} className="widthAll"
                            >
                                {getFieldDecorator('sellerIncomeFreight', {
                                    rules: [{ required: false, message: '' }],
                                })(
                                    <Input readOnly={true} placeholder="" id="success" maxLength={100} />
                                    )}
                            </FormItem>
                        </Col>
                        <Col span={6}>

                            <FormItem
                                label="汇率"  {...this.formItemLayout} className="widthAll"
                            >
                                {getFieldDecorator('rate', {
                                    rules: [{ required: false, message: '' }],
                                })(
                                    <Input readOnly={true} placeholder="" id="success" maxLength={100} />
                                    )}
                            </FormItem>
                        </Col>
                        <Col span={6}>

                            <FormItem
                                label="付款方式"  {...this.formItemLayout} className="widthAll"
                            >
                                {getFieldDecorator('payway', {
                                    rules: [{ required: false, message: '' }],
                                })(
                                    <Input readOnly={true} placeholder="" id="success" maxLength={100} />
                                    )}
                            </FormItem>
                        </Col>
                       
                    </Row>
                </div>
            </div>
        );
    }
}

export default AmountInfo
