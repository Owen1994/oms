/**
 *作者: 魏洁(唐峰)
 *功能描述: 订单管理--异常订单--详情页--商品信息--添加商品
 *参数说明:
 *时间: 2018/5/29 15:34
 */
import React, { Component } from 'react';
import {
    Form,
    Input,
    Select,
    Row,
    Col,
    message
} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
import axios from "../../../util/axios";
import * as config from "../../../util/connectConfig";


class Condition extends Component {

    constructor(props) {
        super(props);
    }


    formItemLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 }
    };

    componentDidMount() {

        this.props.form.setFieldsValue({
            addnum: this.props.tablemodel2.addnum,
            addsku: this.props.tablemodel2.addsku.toUpperCase(),
            skuChinese: this.props.tablemodel2.addname,
            addsalePrice: this.props.tablemodel2.addunit,
            addcurrency: 'USD', // 后端已写死USD美元， 2019年1月4日17:47:48， 陈文春
        });

        console.log(this.props)
    }

    addnumHandle = (rule, value, callback) => {
        const numreg = /^(\d|[1-9]\d+)(\.\d+)?$/;
        if (value && !numreg.test(value)) {
            callback('请输入大于零的数字')
        } else if (value === 0) {
            callback('请输入大于零的数字')
        } else {
            callback()
        }
    };

    addpriceHandle = (rule, value, callback) => {
        const numreg = /^(\d|[1-9]\d+)(\.\d{1,2})?$/;
        if (value && !numreg.test(value)) {
            callback('请输入大于零的金额,小数点不超过两位')
        } else if (value === 0) {
            callback('请输入大于零的金额,小数点不超过两位')
        } else {
            callback()
        }
    };

    onBlur = (v) => {
        const sku = this.props.form.getFieldValue(v);
        let status = this.props.Infos.productInfoStatus;      //控制弹窗上SKU失焦的状态
        status = setTimeout(() => {
            if (sku && status) {
                axios.post(`${config.api_url}/oms/order/manage/motan/ICompanyOrderManageApi/getOrderSkuName`, { sku })
                    .then(response => {
                        const state = response.data.state
                        if (state === '000001') {
                            const name = response.data.data.name
                            this.props.form.setFieldsValue({ skuChinese: name })
                        } else {
                            message.error(`${response.data.msg}`);
                        }
                    }).catch(e => {
                        console.log(e);
                    })
            }
        }, 500);
        this.props.baseInfoForm({productInfoStatus:status});
    };

    select = [{id: '1', name: '无'}, {id: '0', name: '前缀'}, {id: '2', name: '后缀'}];

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;

        return (

            <div className="newCluenk addproductBox">

                <div className="content">
                    <Row className="paddingTB8">
                        <Col span={10}>
                            <FormItem
                                {...{ labelCol: { span: 12 }, wrapperCol: { span: 12 } }}
                                label="前后缀"
                            >

                                {getFieldDecorator('skuAffixType', {
                                    initialValue: '1',
                                })(
                                    <Select className="widthAll">
                                        {
                                            this.select.map((item, i) => {
                                                return (
                                                    <Option key={i} value={item.id}>
                                                        {item.name}
                                                    </Option>
                                                )
                                            })
                                        }
                                    </Select>
                                )}

                            </FormItem>
                        </Col>
                        <Col span={14}>
                            <FormItem
                                wrapperCol={{ span: 23,offset:1} }
                                label=""
                                className="widthAll"
                            >
                                {getFieldDecorator('skuAffix')(
                                    <Input
                                        placeholder={`请输出正确的前后缀`}
                                        maxLength={100}
                                        disabled={getFieldValue('skuAffixType') === '1'}
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <p className="exc-tip-text">请录入正确的商品刊登前缀或后缀 如_USA，UKRO_</p>
                    </Row>

                    <Row className="exc-padding-8">

                        <Col span={24}>
                            <FormItem
                                {...this.formItemLayout}
                                label="SKU"
                                className="widthAll"
                            >

                                {getFieldDecorator('addsku', {
                                    rules: [{
                                        required: false,
                                        message: `请输入`
                                    }],
                                })(
                                    <Input
                                        placeholder={`请输入`}
                                        onBlur={() => this.onBlur('addsku')}
                                        maxLength={100}
                                    />
                                )}


                            </FormItem>
                        </Col>

                    </Row>
                    <Row className="exc-padding-8">

                        <Col span={24}>
                            <FormItem
                                {...this.formItemLayout}
                                label="商品中文名"
                                className="widthAll"
                            >

                                {getFieldDecorator('skuChinese', {
                                    rules: [{
                                        required: false,
                                        message: `请输入`
                                    }],
                                })(
                                    <Input
                                        placeholder={`请输入`}
                                        disabled
                                        maxLength={100}
                                    />
                                )}


                            </FormItem>
                        </Col>

                    </Row>

                    <Row className="exc-padding-8">

                        <Col span={24}>
                            <FormItem
                                {...this.formItemLayout}
                                label="售价"
                                className="widthAll"
                            >

                                {getFieldDecorator('addsalePrice', {
                                    rules: [{ validator: this.addpriceHandle }],

                                })(
                                    <Input
                                        placeholder={`请输入`}
                                        disabled={this.props.tablemodel2.itemId ? true : false}
                                        maxLength={100}
                                    />
                                )}


                            </FormItem>
                        </Col>

                    </Row>

                    <Row className="exc-padding-8">
                        <Col span={24}>
                            <FormItem
                                {...this.formItemLayout}
                                label="数量"
                                className="widthAll"
                            >

                                {getFieldDecorator('addnum', {
                                    rules: [{ validator: this.addnumHandle }],
                                })(
                                    <Input
                                        placeholder={`请输入`}
                                        disabled={this.props.tablemodel2.itemId ? true : false}
                                        maxLength={100}
                                    />
                                )}


                            </FormItem>
                        </Col>

                    </Row>

                    <Row className="exc-padding-8">

                        <Col span={24}>
                            <FormItem
                                {...this.formItemLayout}
                                label="币种"
                                className="widthAll"
                            >

                                {getFieldDecorator('addcurrency', {
                                    rules: [{
                                        required: false,
                                        message: `请输入`
                                    }],
                                    // initialValue: this.props.form.getFieldValue('platformFeeCurrency') || undefined
                                })(
                                    <Input
                                        placeholder={`请输入`}
                                        disabled
                                        maxLength={100}
                                    />
                                )}


                            </FormItem>
                        </Col>

                    </Row>

                </div>

            </div>
        );
    }
}

export default Condition
