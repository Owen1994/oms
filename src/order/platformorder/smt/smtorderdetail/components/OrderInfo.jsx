/**
 * 作者: pzt
 * 描述: 速卖通详情页订单信息组件
 * 时间: 2018/4/18 20:28
 **/
import React, {Component} from 'react'
import {render} from 'react-dom'
import {connect} from 'react-redux'
import {
    Form,
    Modal,
    Button,
    Steps,
    Table,
    Row,
    Col,
    Input,
} from 'antd';
const FormItem = Form.Item

class OrderInfo extends React.Component {
     constructor(props) {
         super(props);
     }

     formItemLayout = {
          labelCol: {span: 11},
         wrapperCol: {span: 13}
     }

    render() {

        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
        const Step = Steps.Step;
        const orderState = this.props.Infos.orderState;
        return (
            <div className="newCluenk noborderCluenk">
                <div className="title" id="order-info" ref={'orderInfo'}> 订单信息</div>
                <div className="content order-info">
                    <div>
                        <Steps size="small" current={orderState}>
                            <Step title="买家下单" />
                            <Step title="买家付款" />
                            <Step title="卖家发货" />
                            <Step title="订单完成" />
                        </Steps>
                    </div>
                    <div className={'order-state-line'}>
                        <Row className={'margin-ms-top padding-md-left padding-md-right'}>
                            <Col span={6}>
                                <FormItem
                                      label="平台"  {...this.formItemLayout} className={'ant-xs-row'}
                                  >
                                      {getFieldDecorator('platform', {
                                          rules: [{required: false, message: '平台'}],
                                      })(
                                          <Input readOnly="true"/>
                                      )}
                                  </FormItem>
                            </Col>
                            <Col span={6} >
                                <FormItem
                                        label="账号"  {...this.formItemLayout} className={'ant-xs-row'}
                                    >
                                        {getFieldDecorator('platformAccount', {
                                            rules: [{required: false, message: '账号'}],
                                        })(
                                            <Input readOnly="true"/>
                                        )}
                                    </FormItem>
                            </Col>
                            <Col span={6}>
                                <FormItem
                                    className={"separated-line"}
                                    label="平台订单号"  {...this.formItemLayout} className={'ant-xs-row'}
                                >
                                    {getFieldDecorator('platformOrderNumber', {
                                        rules: [{required: false, message: '平台订单号'}],
                                    })(
                                        <Input readOnly="true"/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={6} >
                                <FormItem
                                    className={"separated-line spearated-unline"}
                                    label="状态"  {...this.formItemLayout} className={'ant-xs-row'}
                                >
                                    {getFieldDecorator('orderStateName', {
                                        rules: [{required: false, message: '状态'}],
                                    })(
                                        <Input readOnly="true" />
                                    )}
                                </FormItem>
                            </Col>
                          
                        </Row>
                        <Row className={'margin-ms-top padding-md-left padding-md-right'}>
                          <Col span={6} >
                                <FormItem
                                    className={"separated-line"}
                                    label="截止发货时间"  {...this.formItemLayout} className={'ant-xs-row'}
                                >
                                    {getFieldDecorator('deliveryTime', {
                                        rules: [{required: false, message: '截止发货时间'}],
                                    })(
                                        <Input readOnly="true" />
                                    )}
                                </FormItem>
                           </Col>
                        </Row>
                    </div>
                 </div>
            </div>
        );
    }
}

export default OrderInfo;