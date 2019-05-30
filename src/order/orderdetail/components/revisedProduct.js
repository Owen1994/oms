/**
 *作者: 魏洁(唐峰)
 *功能描述: 订单管理--异常订单--详情页--商品信息--修改弹窗
 *参数说明:
 *时间: 2018/5/29 15:52
 */
import React, { Component } from 'react';

import {
    Form,
    Input,
    Select,
    Row,
    Col,
    message
} from 'antd'

const FormItem = Form.Item;
const Option = Select.Option;
import axios from "util/axios";
import * as config from "util/connectConfig";
import { fetchPost } from 'util/fetch';

const select = [{id: '1', name: '无'}, {id: '0', name: '前缀'}, {id: '2', name: '后缀'}];

export default class RevisedproductModal extends Component {

    constructor(props) {
        super(props);
    };

    state = {
        loadingState: false,
    };

    suffix = [
        { name: "前缀", value: 0 },
        { name: "后缀", value: 2 },
    ];

    formItemLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 }
    };

    componentDidMount() {
        const { index, data2 } = this.props.tablemodel2;
        const val = data2[index].record;
        this.props.form.setFieldsValue({
            onlineSku: val.onlineSkuCode || '',   // 在线sku编码
            excsuffix: val.skuAffixType + '' || '1',
            excsuffixSku: val.skuAffix || '',
            exceditsku: val.sku.toUpperCase() || '',
            editskuChinese: val.name || '',
            exceditsalePrice: val.unit || '',
            exceditnum: val.num || '',
            exceditcurrency: 'USD', // 后端已写死USD美元， 2019年1月4日17:47:48， 陈文春
        });

        if(val.sku) {
            fetchPost('/oms/order/manage/motan/ICompanyOrderManageApi/getOrderSkuName', { sku: val.sku }, 2)
                .then(res => {
                    if(res.state === '000001'){
                        this.props.tablemodelaction2({ extraData: {skuClearWeight: res.data.skuClearWeight, skuLogisticsProperty: res.data.skuLogisticsProperty}})
                    }
                })
        }
    };

    //组件销毁时,清除数据
    componentWillUnmount(){
        this.props.form.setFieldsValue({excsuffixSku:''}); //清空下前后缀输入的值
    }

    setViewValue = (skuAffix, isPrefix='1') => {
        this.props.form.setFieldsValue({
            excsuffix: isPrefix,
            excsuffixSku: skuAffix,
        });
    };

    addnumHandle = (rule, value, callback) => {
        const numreg = /^[1-9]\d{0,3}$/;
        if (value && !numreg.test(value)) {
            callback('请输入大于0并小于9999的数字')
        } else if (value === 0) {
            callback('请输入大于0并小于9999的数字')
        } else {
            callback()
        }
    };

    addpriceHandle = (rule, value, callback) => {
        const numreg = /(^[0-9]\d{0,7}?(\.\d{1,2})?$)|(^\d\.\d{1,2}$)/;
        if (value && !numreg.test(value)) {
            callback('请输入大于等于0并小于100000000的金额,小数不超两位')
        } else if (value === 0) {
            callback('请输入大于等于0并小于100000000的金额,小数不超两位')
        } else {
            callback()
        }
    };


    onBlur = (v) => {
        var {amendSkuArrModel,tablemodel2,amendSkuArrAction} = this.props;
        var index = tablemodel2.index;
        var status = this.props.Infos.productInfoStatus;      //控制弹窗上SKU失焦的状态
        const sku = this.props.form.getFieldValue(v);

        status = setTimeout(() => {
            if (sku !== amendSkuArrModel[index]) {
                if(!sku && status) return message.warning("sku 不能为空")
                amendSkuArrModel[index] = sku
                amendSkuArrAction([...amendSkuArrModel])
            } else {
                return
            }

            if (sku && status) {
                axios.post(`${config.api_url}/oms/order/manage/motan/ICompanyOrderManageApi/getOrderSkuName`, { sku })
                    .then(response => {
                        if(!response) return
                        const state = response.data.state
                        if (state === '000001') {
                            const name = response.data.data.name
                            this.props.form.setFieldsValue({ editskuChinese: name })
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

    render() {
        const { getFieldDecorator, resetFields, getFieldValue } = this.props.form;


        // const onlineSku = this.props.tablemodel2.onlineSkuCode;
        const onlineSku = '';

        return (

            <div className="newCluenk cluekBox">

                <div className="content">
                    <Row className="paddingTB8">

                        <Col span={24}>
                            <FormItem  {...this.formItemLayout}
                                label="在线商品编码" className="widthAll"
                            >
                                {getFieldDecorator('onlineSku')(
                                    <Input disabled />
                                )}
                            </FormItem>
                        </Col>

                    </Row>
                    <Row className="paddingTB8">

                        <Col span={10}>

                            <FormItem  {...{
                                labelCol: { span: 12 },
                                wrapperCol: { span: 12 }
                            }}
                                label="前后缀"
                            >

                                {getFieldDecorator('excsuffix', {
                                    initialValue: '1',
                                    rules: [{
                                        required: false,
                                        message: `请输入`
                                    }],
                                })(
                                    <Select 
                                        className="widthAll"
                                        onChange={() => {
                                            resetFields(['excsuffixSku']);
                                        }}
                                    >
                                        {
                                            select.map((item, i) => {
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
                            <FormItem   wrapperCol={{ span: 23,offset:1} }
                                label="" className="widthAll"
                            >
                                {getFieldDecorator('excsuffixSku')(
                                    <Input
                                        placeholder={`请输出正确的前后缀`}
                                        maxLength={100}
                                        disabled={getFieldValue('excsuffix') === '1'}
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <p className="exc-tip-text">请录入正确的商品刊登前缀或后缀 如_USA，UKRO_</p>
                    </Row>
                    <Row className="paddingTB8">

                        <Col span={24}>
                            <FormItem  {...this.formItemLayout}
                                label="SKU" className="widthAll"
                            >

                                {getFieldDecorator('exceditsku', {
                                    rules: [{
                                        required: true,
                                        message: `请输入`
                                    }],
                                })(
                                    <Input
                                        placeholder={`请输入`}
                                        // onBlur={() => this.onBlur('exceditsku')}
                                        maxLength={100}
                                    />
                                )}


                            </FormItem>
                        </Col>

                    </Row>
                    <Row className="paddingTB8">

                        <Col span={24}>
                            <FormItem  {...this.formItemLayout}
                                label="商品中文名" className="widthAll"
                            >
                            {getFieldDecorator('editskuChinese', {
                                    rules: [{
                                        required: true,
                                    }],
                                })(
                                <Input
                                    placeholder={`系统依据SKU自动更新`} disabled
                                    maxLength={100}
                                />
                            )}

                            </FormItem>
                        </Col>

                    </Row>

                    <Row className="paddingTB8">

                        <Col span={24}>
                            <FormItem  {...this.formItemLayout}
                                label="售价" className="widthAll"
                            >

                                {getFieldDecorator('exceditsalePrice', {
                                    rules: [{
                                        required: true,
                                        message: `请输入`
                                    }, { validator: this.addpriceHandle }],

                                })(
                                    <Input
                                        placeholder={`请输入`}
                                        // disabled={this.props.tablemodel2.itemId ? true : false}
                                        maxLength={100}
                                    />
                                )}


                            </FormItem>
                        </Col>

                    </Row>

                    <Row className="paddingTB8">

                        <Col span={24}>
                            <FormItem  {...this.formItemLayout}
                                label="数量" className="widthAll"
                            >

                                {getFieldDecorator('exceditnum', {
                                    rules: [{
                                        required: true,
                                        message: `请输入`
                                    }, { validator: this.addnumHandle }],
                                })(
                                    <Input
                                        placeholder={`请输入`}
                                        // disabled={this.props.tablemodel2.itemId ? true : false}
                                        maxLength={100}
                                    />
                                )}


                            </FormItem>
                        </Col>

                    </Row>

                    <Row className="paddingTB8">

                        <Col span={24}>
                            <FormItem  {...this.formItemLayout}
                                label="币种" className="widthAll"
                            >

                                {getFieldDecorator('exceditcurrency', {
                                    rules: [{ required: true }]
                                })(
                                    <Input
                                        placeholder={`请输入`} disabled
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
