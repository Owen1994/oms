/**
 * 作者: pzt
 * 描述: 速卖通详情页时间记录组件
 * 时间: 2018/4/18 20:30
 **/
import React from 'react'
import {
    Form,
    Row,
    Col,
    Input,
} from 'antd'
const FormItem = Form.Item

class TimesRecord extends React.Component {

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
            <div className="newCluenk noborderCluenk">
                <div className="title" id="time-record" ref={'timeRecord'}>时间记录</div>
                <div className="content">
                    <div>
                        <Row >
                            <Col span={6} >
                                <FormItem
                                    label="发货时间"  {...this.formItemLayout3} className={"ant-xs-row"}
                                >
                                    {getFieldDecorator('deliver', {
                                        rules: [{required: false, message: '发货时间'}],
                                    })(
                                        <Input readOnly="true" maxLength={100}/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={6} >
                                <FormItem
                                    label="付款时间"  {...this.formItemLayout3} className={"ant-xs-row"}
                                >
                                    {getFieldDecorator('payment', {
                                        rules: [{required: false, message: '付款时间'}],
                                    })(
                                        <Input readOnly="true" maxLength={100}/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={6} >
                                <FormItem
                                    label="订单创建时间"  {...this.formItemLayout3} className={"ant-xs-row"}
                                >
                                    {getFieldDecorator('create', {
                                        rules: [{required: false, message: '订单创建时间'}],
                                    })(
                                        <Input readOnly="true" maxLength={100}/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={6} >
                                <FormItem
                                    label="抓单时间"  {...this.formItemLayout3} className={"ant-xs-row"}
                                >
                                    {getFieldDecorator('lastGrabTime')(
                                        <Input readOnly="true" maxLength={100}/>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row className="margin-ms-top">
                            <Col span={6} >
                                <FormItem
                                    label="抓单时间"  {...this.formItemLayout3} className={"ant-xs-row"}
                                >
                                    {getFieldDecorator('grabTime', {
                                        rules: [{required: false, message: '抓单时间'}],
                                    })(
                                        <Input readOnly="true" maxLength="100"/>
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
export default TimesRecord;