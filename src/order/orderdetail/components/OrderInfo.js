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

class OrderInfo extends React.Component {
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
                <div className="title">基础资料</div>
                <div className="content">
                    <Row>
                        <Col span={6}>
                            <FormItem
                                label="平台单号"  {...this.formItemLayout} className="widthAll"
                            >
                                {getFieldDecorator('platformOrderId', {
                                    rules: [{ required: false, message: '请输入平台单号' }],

                                })(
                                    <Input readOnly={true} placeholder="" id="success" maxLength={100} />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>

                            <FormItem
                                label="销售账号"  {...this.formItemLayout} className="widthAll"
                            >
                                {getFieldDecorator('marketAccount', {
                                    rules: [{ required: false, message: '请输入销售账号' }],

                                })(
                                    <Input readOnly={true} placeholder="" id="success" maxLength={100} />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                label="YKS单号"  {...this.formItemLayout} className="widthAll"
                            >
                                {getFieldDecorator('yksOrderNumber', {
                                    rules: [{ required: false, message: '' }],
                                })(
                                    <Input readOnly={true} placeholder="" id="success" maxLength={100} />
                                )}
                            </FormItem>
                        </Col>
                        {/* <Col span={6}>

                            <FormItem
                                label="买家邮箱"  {...this.formItemLayout} className="widthAll"
                            >
                                {getFieldDecorator('buyerEmail', {
                                    rules: [{ required: false, message: '' }],
                                })(
                                    <Input readOnly={true} placeholder="" id="success" maxLength={100} />
                                )}
                            </FormItem>
                        </Col> */}
                        <Col span={6}>
                            <FormItem
                                label="订单状态"  {...this.formItemLayout} className="widthAll"
                            >
                                {getFieldDecorator('orderState', {
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
                                label="订单来源"  {...this.formItemLayout} className="widthAll"
                            >
                                {getFieldDecorator('orderType', {
                                    rules: [{ required: false, message: '' }],

                                })(
                                    <Input readOnly={true} placeholder="" id="success" maxLength={100} />
                                )}

                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                label="销售平台"  {...this.formItemLayout} className="widthAll"
                            >
                                {getFieldDecorator('platformName', {
                                    rules: [{ required: false, message: '' }],
                                })(
                                    <Input readOnly={true} placeholder="" id="success" maxLength={100} />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>

                            <FormItem
                                label="国家"  {...this.formItemLayout} className="widthAll"
                            >
                                {getFieldDecorator('oiCountryName', {
                                    rules: [{ required: false, message: '' }],
                                })(
                                    <Input readOnly={true} placeholder="" id="success" maxLength={100} />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                label="买家账号"  {...this.formItemLayout} className="widthAll"
                            >
                                {getFieldDecorator('buyerAccount', {
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
                                label="客服人员"  {...this.formItemLayout} className="widthAll"
                            >
                                {getFieldDecorator('customerService', {
                                    rules: [{ required: false, message: '' }],
                                })(
                                    <Input readOnly={true} placeholder="" id="success" maxLength={100} />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                label="客选物流"  {...this.formItemLayout} className="widthAll"
                            >
                                {getFieldDecorator('logisticsBusiness', {
                                    rules: [{ required: false, message: '' }],
                                })(
                                    <Input readOnly={true} placeholder="" id="success" maxLength={100} />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                label="物流追踪码"  {...this.formItemLayout} className="widthAll"
                            >
                                {getFieldDecorator('trackingNumber', {
                                    rules: [{ required: false, message: '' }],
                                })(
                                    <Input readOnly={true} placeholder="" id="success" maxLength="100" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                label="海神订单"  {...this.formItemLayout} className="widthAll"
                            >
                                {getFieldDecorator('isClickFarming')(
                                    <Input readOnly={true} maxLength="100" />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default OrderInfo
