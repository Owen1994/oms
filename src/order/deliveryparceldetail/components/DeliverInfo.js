/**
 * 作者: 陈林
 * 描述:实际发货信息组件
 * 时间: 2018/4/18 0018 下午 8:51
 **/
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
import {functions} from "util/baseTool";

const FormItem = Form.Item
const Option = Select.Option
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

class DeliverInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    formItemLayout = {
        labelCol: {span: 5},
        wrapperCol: {span: 19}
    }
    formItemLayout3 = {
        labelCol: {span: 10},
        wrapperCol: {span: 14}
    }

    render() {

        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;

        return (
            <div className="newCluenk cl-warehouse">
                <div className="title">实际发货信息</div>
                <div className="content">
                    <Row>
                        <Col span={6}>
                            <FormItem
                                label="内单号"  {...this.formItemLayout3} className="widthAll">
                                {getFieldDecorator('outerOrdersId', {
                                    rules: [{required: false, message: '请输入内单号'}],
                                })(
                                    <Input readOnly="true" id="success" maxLength={100}/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                label="状态"  {...this.formItemLayout3} className="widthAll">
                                {getFieldDecorator('state', {
                                    rules: [{required: false, message: '请输入状态'}],
                                })(
                                    <Input readOnly="true" id="success" maxLength={100}/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                label="发货仓库"  {...this.formItemLayout3} className="widthAll">
                                {getFieldDecorator('warehouseDeliver', {
                                    rules: [{required: false, message: '请输入发货仓库'}],
                                })(
                                    <Input readOnly="true" id="success" maxLength={100}/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                label="物流渠道"  {...this.formItemLayout3} className="widthAll">
                                {getFieldDecorator('logisticsBusinessa', {
                                    rules: [{required: false, message: '请输入物流渠道'}],
                                })(
                                    <Input readOnly="true" id="success" maxLength={100}/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <FormItem
                                label="渠道编码"  {...this.formItemLayout3} className="widthAll">
                                {getFieldDecorator('logisticsNumber', {
                                    rules: [{required: false, message: '请输入渠道编码'}],
                                })(
                                    <Input readOnly="true" id="success" maxLength={100}/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                label="跟踪号1"  {...this.formItemLayout3} className="widthAll">
                                {getFieldDecorator('waybillNumber1', {
                                    rules: [{required: false, message: '请输入跟踪号1'}],
                                })(
                                    <Input readOnly="true" id="success" maxLength={100}/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                label="跟踪号2"  {...this.formItemLayout3} className="widthAll">
                                {getFieldDecorator('waybillNumber2', {
                                    rules: [{required: false, message: '请输入跟踪号2'}],
                                })(
                                    <Input readOnly="true" id="success" maxLength={100}/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                label="重量"  {...this.formItemLayout3} className="widthAll">
                                {getFieldDecorator('weight', {
                                    rules: [{required: false, message: '请输入重量'}],
                                })(
                                    <Input readOnly="true" id="success" maxLength={100}/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <FormItem
                                label="运费"  {...this.formItemLayout3} className="widthAll">
                                {getFieldDecorator('freight', {
                                    rules: [{required: false, message: '请输入运费'}],
                                })(
                                    <Input readOnly="true" id="success" maxLength={100}/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                label="客服"  {...this.formItemLayout3} className="widthAll">
                                {getFieldDecorator('customerService', {
                                    rules: [{required: false, message: '请输入客服'}],
                                })(
                                    <Input readOnly="true" id="success" maxLength={100}/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                label="发货时间"  {...this.formItemLayout3} className="widthAll">
                                {getFieldDecorator('deliverTime', {
                                    rules: [{required: false, message: '请输入发货时间'}],
                                })(
                                    <Input readOnly="true" id="success" maxLength={100}/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            {
                                functions(this, '001-000003-000001-000001-002') ?
                                    <FormItem
                                        label="物流面单"  {...this.formItemLayout3} className="widthAll">
                                        {getFieldDecorator('logisticsSurface')(
                                            <a className="text-success font-sm"
                                               href={this.props.Infos.logisticsSurface ? this.props.Infos.logisticsSurface : 'javascript:;'}
                                               target='_blank'>{this.props.Infos.logisticsSurface ? '点击查看' : ''}</a>
                                        )}
                                    </FormItem>
                                    : null}
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default DeliverInfo
