/**
 *作者: 任贸华
 *功能描述: 规则信息组件
 *参数说明:
 *时间: 2018/4/16 11:24
 */
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
import * as config from "../../../util/connectConfig";
import Modalmodel from '../../../components/modalmodel'
import axios from "../../../util/axios";
import {closehandle, datasaddkey, selectValues, unbinds} from "../../../util/baseTool";
import {levelOptions} from "../../../util/options";


const FormItem = Form.Item
const Option = Select.Option
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const primaryKeyIdoption = levelOptions('过滤器主键')
const primaryKeyStripoption = levelOptions('过滤器条件')
const filterStripoption = levelOptions('过滤器逻辑')

class WarehouseOrder extends React.Component {
    constructor(props) {
        super(props);
    }

    formItemLayout = {
        labelCol: {span: 8},
        wrapperCol: {span: 16}
    }

    /**
     *作者: 任贸华
     *功能描述: 规则信息初始化
     *参数说明:
     *时间: 2018/4/17 10:21
     */
    componentDidMount() {
        this.props.form.setFieldsValue({ruleName: '', priorityId: undefined, platformName: '', platformId: ''})
    }

    render() {

        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;

        return (
            <div className="newCluenk">
                <div className="title">规则信息</div>
                <div className="content">

                    <Form layout="inline" onSubmit={this.handleSubmit}>

                        <Row className={'pdb6'}>
                            <Col span={9}>
                                <FormItem {...this.formItemLayout}
                                          label="规则名称" className={'wfull'}
                                >

                                    {getFieldDecorator('ruleName', {
                                        rules: [{required: true, message: '规则名称'}],
                                    })(
                                        <Input disabled={this.props.warehouserule.type} placeholder="规则名称"
                                               id="success" maxLength={100}/>
                                    )}
                                </FormItem>
                            </Col>

                        </Row>

                        <Row className={'pdt6'}>
                            <Col span={9}>
                                <FormItem {...this.formItemLayout}
                                          label="销售平台" className={'wfull'}
                                >
                                    {getFieldDecorator('platformName', {
                                            rules: [{required: true, message: '销售平台'}],
                                        },
                                    )(
                                        <Input disabled={this.props.warehouserule.type} readOnly
                                               placeholder={`销售平台`} onClick={selectValues({
                                            obj: this,
                                            url: '/oms/order/manage/motan/ICompanyOrderManageApi/getPlatform',
                                            title: '选择平台',
                                            name: 'platformName',
                                            id: 'platformId',
                                            searchabled: false
                                        })}
                                               maxLength={100}/>
                                    )}
                                    {getFieldDecorator('platformId')(
                                        <Input readOnly maxLength={100} type="hidden"/>
                                    )}
                                    <Icon type="close-circle" className={'commonClose'} onClick={(e) => {
                                        closehandle(e, this)
                                    }}/>
                                </FormItem>
                            </Col>


                            <Col span={11}>
                                <FormItem {...this.formItemLayout}
                                          label="规则优先级" className={'wfull'}
                                >

                                    {getFieldDecorator('priorityId', {
                                        rules: [{required: true, message: '请选择'}], initialValue: undefined
                                    })(
                                        <Select disabled={this.props.warehouserule.type} className={'wfull'}
                                                placeholder="请选择">
                                            {levelOptions('优先级').map(v => {
                                                return (
                                                    <Option key={v.value} value={v.value}
                                                    >
                                                        {v.label}
                                                    </Option>
                                                )
                                            })}
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>

                        </Row>

                    </Form>

                </div>
            </div>
        );
    }
}

export default WarehouseOrder
