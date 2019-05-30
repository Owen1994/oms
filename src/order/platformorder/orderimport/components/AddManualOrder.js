/**
 *  作者：陈文春
 *  描述：订单导入页面 - 新建手工订单组件
 *  时间：2019年2月13日10:15:30
 */
import React from 'react';
import {
    Form,
    Col,
    Row,
    Input,
    DatePicker,
    Button,
    message,
    Tooltip,
    Select,
} from 'antd';

import CSelect from '@/components/cselect';
import ProductInfo from './NewProductInfo.js';
import { fetchPost } from '@/util/fetch.js';
import { setPageCache, getPageCache } from '@/util/PageCache';

const FormItem = Form.Item;
const TextArea = Input.TextArea;
const Option = Select.Option;
const platformName = {'MM': 'mymall'};

export default class AddManualOrder extends React.Component {
    state = {
        platform: '',
        receiveCountry: '',
        amount: 0,
        freight: 0,
        platformList: '',
        accountList: '',
        siteList: '',
    }

    componentDidMount(){
        // 恢复缓存数据
        getPageCache().then((params) => {
            if(params){
                const { formData, tableData, list } = params;
                const receiveCountry = formData.receiveCountry && formData.receiveCountry[0].name;
                const platform = formData.salePlatform[0].id;
                this.setState({
                    receiveCountry: receiveCountry ? receiveCountry : '',
                    platform,
                    platformList: list.platformList,
                    accountList: list.accountList,
                    siteList: list.siteList,
                }, () => {
                    this.props.form.setFieldsValue(formData);
                    tableData.map(v => {
                        this.props.addTableItem(v);
                    });
                });
            }
        });
    }

    componentWillUnmount(){
        this.handleReset();
    }

    formItemLayout = {
        labelCol: {span: 8},
        wrapperCol: {span: 14}
    }

    formItemLayout2 = {
        labelCol: {span: 0},
        wrapperCol: {span: 20}
    }

    componentWillReceiveProps(nextProps){
        // 计算总金额
        const tabledata = nextProps.tabledata;
        const preTabledata = this.props.tabledata;
        if(tabledata !== preTabledata){
            let sum = 0;
            tabledata.map(v => {
                sum += parseFloat(v.price);
            });
            sum += parseFloat(nextProps.form.getFieldValue('freightChargesAmount'));
            this.setState({ amount: sum });
        }
    }

    // 金额输入校验
    addpriceHandle = (rule, value, callback) => {
        const numreg = /^(\d+)(\.\d{1,2})?$/;
        if (value && !numreg.test(value)) {
            callback('请输入非负金额,小数点不超过两位')
        } else {
            callback()
        }
    }

    // 平台选择事件
    handlePlatformSelect = (val) => {
        setTimeout(()=>{
            this.setState({
                platform: val,
                platformList: this.props.form.getFieldValue('salePlatform'),
                accountList: '',
                siteList: '',
            });
            this.props.form.resetFields(['ordersBelongAccount', 'saleSite']);
        },50);
    }

    // 国家全称选择事件
    handleCountrySelect = (valObj) => {
        this.setState({ receiveCountry: valObj[0].name });
        this.props.form.setFieldsValue({'receiveCountryCode': valObj[0].id});
    }

    // 保存
    handleSave = () => {
        const values = this.props.form.getFieldsValue();
        setPageCache({
            formData: values,
            tableData: this.props.tabledata,
            list: {
                platformList: this.props.form.getFieldValue('salePlatform'),
                accountList: this.props.form.getFieldValue('ordersBelongAccount'),
                siteList: this.props.form.getFieldValue('saleSite'),
            }
        });
        message.info('保存成功');
    }

    // 重置
    handleReset = () => {
        this.props.form.resetFields();
        this.props.clearTableItem();
        this.setState({
            platform: '',
            receiveCountry: '',
            amount: 0,
            freight: 0,
            platformList: '',
            accountList: '',
            siteList: '',
        });
    }

    // 创建
    handleCreate = () => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if(!err){
                const obj = {};
                const data = this.props.tabledata;
                const { amount, receiveCountry } = this.state;
                if(data.length === 0){
                    return message.info('请至少添加一条商品信息');
                }
                obj.buyerMessageInfo = {msgContent: values.msgContent};
                obj.orderInfo = {
                    buyerAccount: values.buyerAccount || '',  // 买家账号
                    freightChargesAmount: values.freightChargesAmount || 0,  // 客付运费
                    lastDeliveryTime: values.lastDeliveryTime ? values.lastDeliveryTime.valueOf() : '',  // 截止发货时间 时间戳
                    orderAmount: amount || 0,    // 订单总金额
                    orderSourceId: values.orderSourceId || '',    // 平台单号
                    ordersBelongAccount: values.ordersBelongAccount ? values.ordersBelongAccount[0].id : '',    // 销售账号
                    payRecordNum: values.payRecordNum || '',  // 交易号
                    platTrackingNo: values.platTrackingNo || '',  // 跟踪号
                    productFreightCurrency: data[0].productFreightCurrency || '',  // 币种
                    salePlatform: values.salePlatform ? values.salePlatform[0].id : '',  // 销售平台
                    saleSite: values.saleSite ? values.saleSite[0].key : '',  // 站点
                    shipmentServiceLevelCategory: values.shipmentServiceLevelCategory || '',    // 物流类型
                };
                obj.productInfo = data;
                obj.receiverInfo = {
                    mobileNo: values.mobileNo || '',
                    phoneNumber: values.phoneNumber || '',
                    receiveAddressOne: values.receiveAddressOne || '',
                    receiveAddressTwo: values.receiveAddressTwo || '',
                    receiveCity: values.receiveCity || '',
                    receiveCountry: receiveCountry || '',
                    receiveCountryCode: values.receiveCountryCode || '',
                    receiveDeltaProvince: values.receiveDeltaProvince || '',
                    receiveEmail: values.receiveEmail || '',
                    receiveFullName: values.receiveFullName || '',
                    receiveZip: values.receiveZip || '',
                    socialContact: values.socialContact || '',
                };
                fetchPost('/oms/order/manage/motan/service/api/IOrderManageService/importOrder', obj, 1);
            }
        });
    }

    // 输入客付运费
    handleFreightChange = (e) => {
        const val = e.target.value > 0 ? e.target.value : 0;
        const prevFreight = this.state.freight;
        const { amount } = this.state;
        const change = parseFloat(val - prevFreight);
        this.setState({
            amount: amount + change,
            freight: val,
        });
    }

    // 过滤平台单号
    filterOrderId = (rule, value, callback) => {
        const reg = /^[0-9a-zA-Z-]{1,}$/;
        if (value && !reg.test(value)) {
            callback('平台单号只支持字母、数字和横杠');
        } else if(!value) {
            callback('平台单号只支持字母、数字和横杠');
        } else {
            callback()
        }
    }

    render (){
        const { getFieldDecorator } = this.props.form;
        const { platform, amount, platformList, accountList, siteList } = this.state;
        const data = this.props.tabledata;
        return(
            <Form>
                <div className="newCluenk orderimport-addorder" style={{marginBottom: 85}}>
                    <h1 style={{borderBottom: '1px solid #EAE9E9', fontSize: 16, padding: '10px 20px'}}>新建手工订单</h1>
                    <h3><span className="orderimport-span-before"></span>订单信息</h3>
                    <Row>
                        <Col span={8}>
                            <FormItem
                                {...this.formItemLayout}
                                label="平台单号"
                            >
                                {getFieldDecorator('orderSourceId', {
                                    rules: [{ validator: this.filterOrderId }, {required: true, message: '请输入平台单号'}],
                                })(
                                    <Input placeholder="请输入" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem
                                {...this.formItemLayout}
                                label="交易号"
                            >
                                {getFieldDecorator('payRecordNum')(
                                    <Input placeholder="请输入" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem
                                {...this.formItemLayout}
                                label="销售平台"
                            >
                                {getFieldDecorator('salePlatform', {
                                    rules: [{required: true, message: '请选择销售平台'}],
                                })(
                                    <CSelect
                                        list={platformList ? platformList : []} // 默认值列
                                        // isNotCache  // 默认有初始数据缓存 为true时不用缓存
                                        code='id' // 列表编码字段
                                        name='name' // 列表名称字段
                                        url="/oms/order/manage/motan/ICompanyOrderManageApi/getPlatform"
                                        // mode='multiple' // 是否多选
                                        // maxCount={3} // 最多选择项数量
                                        formType={1}  // 表单数据类型，不填就是默认值，填1返回对象
                                        params={{ data: {searchColumn: 'name', pageData: 20, pageNumber: 1} }} // 搜索参数
                                        apiListType={2}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                        placeholder={'请选择'}
                                        localSearch={1}
                                        onSelect={this.handlePlatformSelect}
                                    />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row className="padding-sm">
                        <Col span={8}>
                            <FormItem
                                {...this.formItemLayout}
                                label="买家账号"
                            >
                                {getFieldDecorator('buyerAccount', {
                                    rules: [{required: true, message: '请输入买家账号'}],
                                })(
                                    <Input placeholder="请输入" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem
                                {...this.formItemLayout}
                                label="跟踪号"
                            >
                                {getFieldDecorator('platTrackingNo')(
                                    <Input placeholder="请输入" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem
                                {...this.formItemLayout}
                                label="截止发货时间"
                            >
                                {getFieldDecorator('lastDeliveryTime')(
                                    <DatePicker
                                        showTime
                                        style={{width: '100%'}}
                                        format="YYYY-MM-DD HH:mm:ss"
                                    />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    {
                        platform ? (
                            <Row>
                                <Col span={8}>
                                    <FormItem
                                        {...this.formItemLayout}
                                        label="销售账号"
                                    >
                                        {getFieldDecorator('ordersBelongAccount', {
                                            rules: [{required: true, message: '请选择销售账号'}],
                                        })(
                                            <CSelect
                                            list={accountList ? accountList : []} // 默认值列
                                                code='id' // 列表编码字段
                                                name='name' // 列表名称字段
                                                url="/oms/order/manage/motan/service/api/IOrderManageService/getSellerIds"
                                                // mode='multiple' // 是否多选
                                                // maxCount={3} // 最多选择项数量
                                                formType={1}  // 表单数据类型，不填就是默认值，填1返回对象
                                                params={{ data: {platformCode: platform, searchColumn: 'sellerId', pageData: 20, pageNumber: 1} }} // 搜索参数
                                                apiListType={2}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                                placeholder={'请选择'}
                                                localSearch={1}
                                                onChange={(val)=>{this.setState({ accountList: val})}}
                                            />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem
                                        {...this.formItemLayout}
                                        label="站点"
                                    >
                                        {getFieldDecorator('saleSite')(
                                            <CSelect
                                            list={siteList ? siteList : []} // 默认值列
                                                code='key' // 列表编码字段
                                                name='label' // 列表名称字段
                                                url="/oms/order/manage/motan/service/api/IOrderManageService/getPlatformSite"
                                                // mode='multiple' // 是否多选
                                                // maxCount={3} // 最多选择项数量
                                                formType={1}  // 表单数据类型，不填就是默认值，填1返回对象
                                                params={{ searchColumn: 'name', pageData: 20, pageNumber: 1, platform }} // 搜索参数
                                                apiListType={2}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                                placeholder={'请选择'}
                                                // handleChange={this.props.handleChange} // 触发下拉事件
                                                localSearch={1}
                                                onChange={(val)=>{this.setState({ siteList: val})}}
                                            />
                                        )}
                                    </FormItem>
                                </Col>
                                {
                                    // 亚马逊平台展示物流类型选项
                                    platform === 'YA' ? (
                                        <Col span={8}>
                                            <FormItem
                                                {...this.formItemLayout}
                                                label="物流类型"
                                            >
                                                {getFieldDecorator('shipmentServiceLevelCategory', {
                                                    initialValue: 'standard'
                                                })(
                                                    <Select>
                                                        <Option key={1} value="standard">标准</Option>
                                                        <Option key={2} value="expedited">加急</Option>
                                                    </Select>
                                                )}
                                            </FormItem>
                                        </Col>
                                    ) : null
                                }
                            </Row>
                        ) : null
                    }
                    <ProductInfo {...this.props}/>
                    <h3><span className="orderimport-span-before"></span>地址信息</h3>
                    <Row>
                        <Col span={8}>
                            <FormItem
                                {...this.formItemLayout}
                                label="收货人"
                            >
                                {getFieldDecorator('receiveFullName', {
                                    rules: [{required: true, message: '请输入收货人'}],
                                })(
                                    <Input placeholder="请输入" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem
                                {...this.formItemLayout}
                                label="国家全称"
                            >
                                {getFieldDecorator('receiveCountry', {
                                    rules: [{required: true, message: '请选择国家全称'}],
                                })(
                                    <CSelect
                                        // list={selectInitVal} // 默认值列
                                        code='id' // 列表编码字段
                                        name='name' // 列表名称字段
                                        url="/oms/order/manage/motan/CommonBasicsDataApi/queryCountrlData"
                                        // mode='multiple' // 是否多选
                                        // maxCount={3} // 最多选择项数量
                                        formType={1}  // 表单数据类型，不填就是默认值，填1返回对象
                                        params={{ searchColumn: 'name', pageData: 20, pageNumber: 1 }} // 搜索参数
                                        apiListType={2}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                        placeholder={'请选择'}
                                        handleChange={this.handleCountrySelect} // 触发下拉事件
                                        // onSelect={this.handleSelect}
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem
                                {...this.formItemLayout}
                                label="国家简称"
                            >
                                {getFieldDecorator('receiveCountryCode')(
                                    <Input placeholder="根据国家全称变化" readOnly disabled />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row className="padding-sm">
                        <Col span={8}>
                            <FormItem
                                {...this.formItemLayout}
                                label="邮编"
                            >
                                {getFieldDecorator('receiveZip', {
                                    rules: [{required: true, message: '请输入邮编'}],
                                })(
                                    <Input placeholder="请输入" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem
                                {...this.formItemLayout}
                                label="固话"
                            >
                                {getFieldDecorator('phoneNumber')(
                                    <Input placeholder="请输入" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem
                                {...this.formItemLayout}
                                label="移动电话"
                            >
                                {getFieldDecorator('mobileNo')(
                                    <Input placeholder="请输入" />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <FormItem
                                {...this.formItemLayout}
                                label="邮箱"
                            >
                                {getFieldDecorator('receiveEmail')(
                                    <Input placeholder="请输入" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem
                                {...this.formItemLayout}
                                label="社交账号"
                            >
                                {getFieldDecorator('socialContact')(
                                    <Input placeholder="请输入" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem
                                {...this.formItemLayout}
                                label="省/洲"
                            >
                                {getFieldDecorator('receiveDeltaProvince', {
                                    rules: [{required: true, message: '请输入省/洲'}],
                                })(
                                    <Input placeholder="请输入" />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row className="padding-sm">
                        <Col span={8}>
                            <FormItem
                                {...this.formItemLayout}
                                label="市"
                            >
                                {getFieldDecorator('receiveCity', {
                                    rules: [{required: true, message: '请输入市'}],
                                })(
                                    <Input placeholder="请输入" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem
                                {...this.formItemLayout}
                                label="街道1"
                            >
                                {getFieldDecorator('receiveAddressOne', {
                                    rules: [{required: true, message: '请输入街道'}],
                                })(
                                    <Input placeholder="请输入" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem
                                {...this.formItemLayout}
                                label="街道2"
                            >
                                {getFieldDecorator('receiveAddressTwo')(
                                    <Input placeholder="请输入" />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <h3><span className="orderimport-span-before"></span>订单备注</h3>
                    <Row className="padding-sm">
                        <Col span={8}>
                            <FormItem
                                {...this.formItemLayout2}
                            >
                                {getFieldDecorator('msgContent')(
                                    <TextArea
                                        style={{marginLeft: 40}}
                                        autosize={{ minRows: 2, maxRows: 6 }}
                                        placeholder="请输入订单备注"
                                    />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                </div>
                <div className="orderimport-bottom-wrapper">
                    <div className="orderimport-bottom">
                        <Row>
                            <Col span={16} style={{clear: 'both'}}>
                                <div className="orderimport-bottom-amount">{`订单总金额: ${data.length > 0 ? data[0].productFreightCurrency : 'USD'} ${amount}`}</div>
                                <div className="orderimport-bottom-freight">
                                    <FormItem
                                        {...{labelCol: {span: 10}, wrapperCol: {span: 14}}}
                                        label={`客付运费(${data.length > 0 ? data[0].productFreightCurrency : 'USD'})`}
                                    >
                                        {getFieldDecorator('freightChargesAmount', {
                                            rules: [{ validator: this.addpriceHandle }, {required: true, message: '请输入客服运费'}],
                                            initialValue: 0
    ,                                    })(
                                            <Input placeholder="请输入" onChange={this.handleFreightChange} />
                                        )}
                                    </FormItem>
                                </div>
                            </Col>
                            <Col span={6} style={{textAlign: 'right'}}>
                                <Tooltip title="切换到其它页面前请先保存数据." placement="top">
                                    <Button type="primary" onClick={() => this.handleSave()}>保存</Button>
                                </Tooltip>
                                <Button style={{margin: '0 10px'}} onClick={() => this.handleReset()}>重置</Button>
                                <Button type="primary" onClick={() => this.handleCreate()}>创建</Button>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Form>
        )
    }
}
