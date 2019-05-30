/**
 *作者: 陈文春
 *功能描述: 订单导入 - 新增/修改商品信息弹窗
 *时间: 2019年2月18日15:41:27
 */
import React, { Component } from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import {
    Form,
    Input,
    Button,
    Select,
    Row,
    Col,
    Radio,
    DatePicker,
    Checkbox,
    message,
    Modal,
} from 'antd'
import moment from 'moment'

const FormItem = Form.Item
const Option = Select.Option
const RangePicker = DatePicker.RangePicker;
import axios from "@/util/axios";
import * as config from "@/util/connectConfig";
import CSelect from '@/components/cselect';


class AddOrEditModal extends Component {

    state = {
        confirmLoading: false,
        suffixVal: 1,
    }

    formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 }
    }

    select = [
        {id: 1, name: '无'},
        {id: 0, name: '前缀'},
        {id: 2, name: '后缀'},
    ];

    componentWillReceiveProps(nextProps){
        const visible = nextProps.visible;
        const preVisible = this.props.visible;
        const record = nextProps.record;
        if(preVisible !== visible && visible && record){
            this.props.form.setFieldsValue({
                skuAffixType: record.skuAffixType,
                skuAffix: record.skuAffix,
                skuCode: record.skuCode,
                productsName: record.productsName,
                productSalePrice: record.productSalePrice,
                productQuantity: record.productQuantity,
            });
            this.setState({ suffixVal: record.skuAffixType });
        }
    }

    addnumHandle = (rule, value, callback) => {
        const numreg = /^(\d|[1-9]\d+)$/;
        if (value && !numreg.test(value) || value == 0) {
            callback('请输入正整数');
        } else if(value > 9999){
            callback('最大值为9999');
        } else {
            callback()
        }
    }

    onBlur = (v) => {
        const sku = this.props.form.getFieldValue(v);
        if (sku) {
            axios.post(`${config.api_url}/oms/order/manage/motan/ICompanyOrderManageApi/getOrderSkuName`, { sku })
                .then(response => {
                    const state = response.data.state
                    if (state == '000001') {
                        const name = response.data.data.name
                        this.props.form.setFieldsValue({ productsName: name })
                    } else {
                        message.error(`${response.data.msg}`);
                    }
                }).catch(e => {
                    console.log(e);
                })
        }
    }

    onOk = () => {
        const { record, index } = this.props;
        this.setState({ confirmLoading: true });
        this.props.form.validateFieldsAndScroll((err, values) => {
            if(!err){
                values.price = (parseInt(values.productQuantity) * parseFloat(values.productSalePrice)) * 100 / 100;
                values.productPicUrl = '';
                if (record){
                    this.props.modifyTableItem({index, newItem: values});
                    if(record.productFreightCurrency !== values.productFreightCurrency){
                        this.props.changeCurrency({productFreightCurrency: values.productFreightCurrency});
                    }
                } else {
                    this.props.addTableItem(values);
                }
                this.setState({ confirmLoading: false }, () => {
                    this.onCancel();
                });
            } else {
                message.error(err);
            }
        });
    }

    onCancel = () => {
        this.props.onCancel('addOrEditModalVisible', false);
        this.props.form.resetFields();
        this.setState({ confirmLoading: false, suffixVal:1 });
    }
    // 金额校验
    addpriceHandle = (rule, value, callback) => {
        const numreg = /^(\d|[1-9]\d+)(\.\d{1,2})?$/;
        if (value && !numreg.test(value) || value == 0) {
            callback('请输入大于零的金额,小数点不超过两位');
        } else if(value > 9999.99){
            callback('最大值为9999.99');
        } else {
            callback()
        }
    }
    onSuffixSelect = (val) => {
        this.setState({
            suffixVal: val,
            confirmLoading: false,
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { confirmLoading, suffixVal } = this.state;
        const { index, tabledata, record } = this.props;
        let ifCurrencyAble = true;
        if(index !== '' && index === 0 || index === '' && tabledata.length === 0){
            ifCurrencyAble = false;
        }
        return (
            <div>
                <Modal
                    visible={this.props.visible}
                    title={record ? '修改商品' : "添加商品"}
                    // destroyOnClose
                    confirmLoading={confirmLoading}
                    onOk={this.onOk}
                    onCancel={this.onCancel}
                >
                    <div className="content">
                        <Row>
                            <Col span={24}>
                                <FormItem
                                    {...this.formItemLayout}
                                    label="前后缀"
                                >
                                    {getFieldDecorator('skuAffixType', {
                                        initialValue: 1,
                                    })(
                                        <Select
                                            className="widthAll" 
                                            style={{width: '25%'}}
                                            onSelect={this.onSuffixSelect}
                                        >
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
                                    {getFieldDecorator('skuAffix')(
                                        <Input
                                            placeholder={`请输出正确的前后缀`}
                                            maxLength={100}
                                            style={{width: '70%', marginLeft: 14}}
                                            disabled={suffixVal === 1 ? true : false}
                                            onChange={ ()=>{ this.setState({ confirmLoading: false })}}
                                        />
                                    )}
                                </FormItem>
                            </Col>
                            <p className="orderimport-addmodal-p">请录入正确的商品刊登前缀或后缀 如_USA，UKRO_</p>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <FormItem  {...this.formItemLayout}
                                    label="SKU" className="widthAll"
                                >
                                    {getFieldDecorator('skuCode', {
                                        rules: [{
                                            required: true,
                                            message: `请输入`
                                        }],
                                    })(
                                        <Input
                                            placeholder={`请输入`}
                                            onBlur={() => this.onBlur('skuCode')}
                                            maxLength={100}
                                            onChange={ ()=>{ this.setState({ confirmLoading: false })}}
                                        />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <FormItem  {...this.formItemLayout}
                                    label="商品中文名" className="widthAll"
                                >
                                    {getFieldDecorator('productsName', {
                                        rules: [{
                                            required: true,
                                            message: `请输入`
                                        }],
                                    })(
                                        <Input placeholder={`输入sku且鼠标失焦后动态生成`} disabled
                                            onChange={ ()=>{ this.setState({ confirmLoading: false })}}
                                            maxLength={100} />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <FormItem  {...this.formItemLayout}
                                    label="售价" className="widthAll"
                                >
                                    {getFieldDecorator('productSalePrice', {
                                        rules: [{ validator: this.addpriceHandle }, {required: true, message: '请输入售价'}],
                                    })(
                                        <Input placeholder={`请输入`}
                                            // disabled={this.props.tablemodel2.itemId ? true : false}
                                            onChange={ ()=>{ this.setState({ confirmLoading: false })}}
                                            maxLength={100}  />
                                    )}
                                </FormItem>
                            </Col>

                        </Row>
                        <Row>
                            <Col span={24}>
                                <FormItem  {...this.formItemLayout}
                                    label="数量" className="widthAll"
                                >
                                    {getFieldDecorator('productQuantity', {
                                        rules: [{ validator: this.addnumHandle }, {required: true, message: '请输入数量'}],
                                    })(
                                        <Input placeholder={`请输入`} 
                                        // disabled={this.props.tablemodel2.itemId ? true : false}
                                            onChange={ ()=>{ this.setState({ confirmLoading: false })}}
                                            maxLength={100}  />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <FormItem  {...this.formItemLayout}
                                    label="币种" className="widthAll"
                                >
                                    {getFieldDecorator('productFreightCurrency', {
                                        initialValue: tabledata.length > 0 ? tabledata[0].productFreightCurrency : 'USD',
                                    })(
                                        <CSelect
                                            // list={} // 默认值列
                                            code='key' // 列表编码字段
                                            name='label' // 列表名称字段
                                            url="/oms/order/manage/motan/service/api/IOrderManageService/getCurreyList"
                                            params={{ data: {searchColumn: 'name', pageData: 20, pageNumber: 1} }} // 搜索参数
                                            apiListType={2}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                            placeholder={'请选择'}
                                            localSearch={1}
                                            disabled={ifCurrencyAble}
                                            onSelect={ ()=>{ this.setState({ confirmLoading: false })}}
                                        />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default Form.create()(AddOrEditModal);