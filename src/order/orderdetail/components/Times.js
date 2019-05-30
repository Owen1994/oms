import React, {Component} from 'react'
import {render} from 'react-dom'
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

class Times extends React.Component {
    constructor(props) {
        super(props);
    }

    formItemLayout = {
        labelCol: {span: 10},
        wrapperCol: {span: 14}
    }
    state = {
        readonly: true,
        numb1: {len: 0, color: ''},
        numb2: {len: 0, color: ''},
        numb3: {len: 0, color: ''},
        brandSelectorVisible: false,
        categorySelectorVisible: false,
        Selectortype: 'multiple',
        formloading: true,
    }

    companyIntroductionHandle = (n, v) => (e) => {
        const {value} = e.target;
        var len = value.length
        const reg = new RegExp('(.{' + v + '}).*', 'g');
        var color = ''
        if (len > v) {
            e.target.value = e.target.value.replace(reg, '$1');
            len = v
            color = "#ff0000";
        }
        this.setState({[n]: {len: len, color: color}})
    }

    render() {

        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;

        return (
            <div className="newCluenk deliveryParcel padTop10">
                <div className="title">时间信息</div>
                <div className="content">

                    <Row >

                        <Col span={6}>
                            <FormItem
                                label="抓单时间"  {...this.formItemLayout} className="widthAll"
                            >
                                {getFieldDecorator('grabTime', {
                                    rules: [{required: false, message: ''}],
                                })(

                                    <Input readOnly={true}  placeholder="" maxLength={100}/>
                                )}
                            </FormItem>
                        </Col>

                        <Col span={6}>
                            <FormItem
                                label="导入时间"  {...this.formItemLayout} className="widthAll"
                            >
                                {getFieldDecorator('timeImport', {
                                    rules: [{required: false, message: ''}],
                                })(

                                    <Input readOnly={true}  placeholder="" maxLength={100}/>
                                )}
                            </FormItem>
                        </Col>




                        <Col span={6}>
                            <FormItem
                                label="分仓时间"  {...this.formItemLayout} className="widthAll"
                            >
                                {getFieldDecorator('timeWarehouse', {
                                    rules: [{required: false, message: ''}],
                                })(

                                    <Input readOnly={true}  placeholder="" maxLength={100}/>
                                )}
                            </FormItem>
                        </Col>

                        <Col span={6}>
                            <FormItem
                                label="发货时间"  {...this.formItemLayout} className="widthAll"
                            >
                                {getFieldDecorator('timeDeliver', {
                                    rules: [{required: false, message: ''}],
                                })(

                                    <Input readOnly={true}  placeholder="" maxLength={100}/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>


                    <Row >

                        <Col span={6}>
                            <FormItem
                                label="状态更新时间"  {...this.formItemLayout} className="widthAll"
                            >
                                {getFieldDecorator('timeStateUpdate', {
                                    rules: [{required: false, message: ''}],
                                })(
                                    <Input readOnly={true}  placeholder="" className="widthAll"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                label="下单时间"  {...this.formItemLayout} className="widthAll"
                            >
                                {getFieldDecorator('timeOrder', {
                                    rules: [{required: false, message: ''}],
                                })(
                                    <Input readOnly={true}  placeholder="" className="widthAll"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                label="付款时间"  {...this.formItemLayout} className="widthAll"
                            >
                                {getFieldDecorator('timePayment', {
                                    rules: [{required: false, message: ''}],
                                })(
                                    <Input readOnly={true}  placeholder="" className="widthAll"/>
                                )}
                            </FormItem>
                        </Col>

                    </Row>


                </div>
            </div>
        );
    }
}

export default Times
