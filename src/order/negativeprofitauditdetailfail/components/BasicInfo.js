import React, {Component} from 'react'
import {render} from 'react-dom'
import {connect} from 'react-redux'
import {
    Form,
    Input,
    Select,
    Row,
    Col,
    Radio,
} from 'antd'


const FormItem = Form.Item
const Option = Select.Option
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

class BasicInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    formItemLayout3 = {
        labelCol: {span: 10},
        wrapperCol: {span: 14}
    }

    render() {

        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
        const isProfit = this.props.form.getFieldsValue(['isProfit']).isProfit;
        const isFaraway = this.props.form.getFieldsValue(['isFaraway']).isFaraway;

        return (
            <div className="newCluenk cl-warehouse">
                <div className="title">基础信息</div>
                <div className="content">
                    <Row>
                        <Col span={6}>
                            <FormItem
                                label="平台单号"
                                {...this.formItemLayout3}
                                className="widthAll"
                            >
                                {getFieldDecorator('platformOrderNumber', {
                                    rules: [{required: false, message: '请输入平台单号'}],
                                })(
                                    <Input readOnly="true"  id="success" maxLength={100}/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                label="YKS单号"
                                {...this.formItemLayout3}
                                className="widthAll"
                            >
                                {getFieldDecorator('yksOrderNumber', {
                                    rules: [{required: false, message: '请输入YKS单号'}],
                                })(
                                    <Input readOnly="true"  id="success" maxLength={100}/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                label="包裹单号"
                                {...this.formItemLayout3}
                                className="widthAll"
                            >
                                {getFieldDecorator('warehouseOrderNumber', {
                                    rules: [{required: false, message: '请输入包裹单号'}],
                                })(
                                    <Input readOnly="true" id="success" maxLength={100}/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                label="订单来源"
                                {...this.formItemLayout3}
                                className="widthAll"
                            >
                                {getFieldDecorator('name', {
                                    rules: [{required: false, message: '请输入订单来源'}],
                                })(
                                    <Input readOnly="true" id="success" maxLength={100}/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <FormItem
                                label="分配仓库"
                                {...this.formItemLayout3}
                                className="widthAll"
                            >
                                {getFieldDecorator('distribution', {
                                    rules: [{required: false, message: '请输入分配仓库'}],
                                })(
                                    <Input readOnly="true"  id="success" maxLength={100}/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                label="物流渠道"
                                {...this.formItemLayout3}
                                className="widthAll"
                            >
                                {getFieldDecorator('logisticsBusiness', {
                                    rules: [{required: false, message: '请输入物流渠道'}],
                                })(
                                    <Input readOnly="true"  id="success" maxLength={100}/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                label="渠道编码"
                                {...this.formItemLayout3}
                                className="widthAll"
                            >
                                {getFieldDecorator('basicinnfoLogisticsNumber', {
                                    rules: [{required: false, message: '请输入物流渠道'}],
                                })(
                                    <Input readOnly="true"  id="success" maxLength={100}/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                label="平台订单状态"
                                {...this.formItemLayout3}
                                className="widthAll"
                            >
                                {getFieldDecorator('orderStatus', {
                                    rules: [{required: false, message: '平台订单状态'}],
                                })(
                                    <Input readOnly="true"  id="success" maxLength={100}/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <FormItem
                                label="销售账号"
                                {...this.formItemLayout3}
                                className="widthAll"
                            >
                                {getFieldDecorator('account', {
                                    rules: [{required: false, message: '请输入销售账号'}],
                                })(
                                    <Input readOnly="true"  id="success" maxLength={100}/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                label="抓单时间"
                                {...this.formItemLayout3}
                                className="widthAll"
                            >
                                {getFieldDecorator('grabTime', {
                                    rules: [{required: false, message: ''}],
                                })(
                                    <Input readOnly={true}  placeholder="" className="widthAll"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                label="付款时间" 
                                {...this.formItemLayout3}
                                className="widthAll"
                            >
                                {getFieldDecorator('paymentTime', {
                                    rules: [{required: false, message: '请输入付款时间'}],
                                })(
                                    <Input readOnly="true" id="success" maxLength={100}/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                label="是/否负利润"
                                {...this.formItemLayout3}
                                className="widthAll"
                            >
                                {getFieldDecorator('isProfit', {
                                    rules: [{required: false, message: '请输入是/否负利润'}],
                                })(
                                    <Input readOnly="true" className={isProfit == "是" ? "text-danger" : ""} />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <FormItem
                                label="分仓订单状态"
                                {...this.formItemLayout3}
                                className="widthAll"
                            >
                                {getFieldDecorator('warehouseOrderState', {
                                    rules: [{required: false, message: '请输入分仓订单状态'}],
                                })(
                                    <Input readOnly="true" maxLength={100}/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                label="客选物流"
                                {...this.formItemLayout3}
                                className="widthAll"
                            >
                                {getFieldDecorator('trackName', {
                                    rules: [{required: false, message: '请输入客选物流'}],
                                })(
                                    <Input readOnly="true" maxLength={100}/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                label="是/否偏远地区"
                                {...this.formItemLayout3}
                                className="widthAll"
                            >
                                {getFieldDecorator('isFaraway', {
                                    rules: [{required: false, message: '请输入是/否偏远地区'}],
                                })(
                                    <Input readOnly="true" className={isFaraway == "是" ? "text-danger" : ""}/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                label="附加费"
                                {...this.formItemLayout3}
                                className="widthAll"
                            >
                                {getFieldDecorator('remoteFee')(
                                    <Input readOnly="true" maxLength={100}/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default BasicInfo
