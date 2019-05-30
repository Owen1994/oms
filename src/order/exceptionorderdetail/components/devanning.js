/**
 *作者: 魏洁(唐峰)
 *功能描述: 订单管理--异常订单--详情页--手工分仓--弹窗
 *参数说明:
 *时间: 2018/5/29 15:46
 */
import React, { Component } from 'react'
import { render } from 'react-dom'
import {
    Form,
    Icon,
    Input,
    Button,
    Select,
    Row,
    Col,
    Radio,
    Table,
    Popconfirm,
    DatePicker,
    message,
    InputNumber,
    Switch,
} from 'antd'
import '../css/css.css'
import * as config from "../../../util/connectConfig";
import Modalmodel from '../../../components/modalmodel'
import axios from "../../../util/axios";
import { datasaddkey, selectValues, dataPack } from "../../../util/baseTool";
import { levelOptions } from "../../../util/options";
import {fetchPost} from "../../../util/fetch";

const FormItem = Form.Item
const Option = Select.Option
const RadioButton = Radio.Button
const RadioGroup = Radio.Group


class WarehouseOrder extends React.Component {
    constructor(props) {
        super(props);
    }
    // 记录 form 中的名称 用于清除数据
    clearArray = []
    // 记录 form 中的名称 用于清除数据
    addClearName = (name)=> {
        if(this.clearArray.includes(name)) return;
        this.clearArray.push(name)
    }


    addselectdata1 = ({ name, message, initialValue = undefined, placeholder = '', disabled = false },result,index) => {
        var _this = this;
        const newname = name.replace(/(.*?)\d+/g, '$1')
        const num = name.replace(/.*?(\d+)/g, '$1')
        this.addClearName(name)
        const optionarr = this.props.commonSelectData.commomwarehouseCode ?
            this.props.commonSelectData.commomwarehouseCode.map((v, i) => <Option key={i} value={v.id}>{v.name}</Option>) : [];
        return (
            <FormItem className="widthAll2"  {...{
                ...this.formItemLayout, ...{
                    wrapperCol: {
                        span: 24,
                    }
                }
            }}>
                {
                    this.props.form.getFieldDecorator(name)(
                        <Select
                            disabled={disabled}
                            placeholder="请选择"
                            onChange={()=>this.getChannelsCallback(index)}
                        >
                            {optionarr.slice(1)}
                            </Select>
                    )
                }
            </FormItem>)
    }
    filterOption = (inputValue, option)=>{
        var props = option.props;
        if(props.children.indexOf(inputValue) != -1 || props.value.indexOf(inputValue) != -1 ){
            return true
        }
        return false
    }
    addselectdata2 = ({ name, message, initialValue = undefined, placeholder = '', disabled = false },result,index) => {

        var data = this.props.devanningtable.data;
        var channleList = data[index].channleList || []
        this.addClearName(name)
        const optionarr = channleList.map((v, i) => <Option key={v.channelCode} value={v.channelCode}>{v.channelName}</Option>);
        return (
            <FormItem className="widthAll2"  {...{
                ...this.formItemLayout, ...{
                    wrapperCol: {
                        span: 24,
                    }
                }
            }}>
                {
                    this.props.form.getFieldDecorator(name)(
                    <Select
                        filterOption={this.filterOption}
                        disabled={disabled}
                        showSearch
                        placeholder="请选择"
                        onChange={()=>this.handleOkCallback(index)}
                    >
                        {optionarr}
                    </Select>
                )
                }
            </FormItem>)
    }

    timerId = 0
    getChannelsCallback=(key)=>{

        clearTimeout(this.timerId)
        this.timerId = setTimeout(()=>{
            this.timerId = -1
            var index = Number(key)+1 || 1;
            var values = this.props.form.getFieldsValue();
            const template = {
                order_separate: [{
                    warehouseCode: '',
                    separate_goods: [{ skuCode: '', skuCount: '' }],
                    recommend: '',
                }],
            }
            const data = dataPack(template, values).order_separate[index-1]

            if(data){
                this.setState({operability:false})
                const oldSeparateGoods = this.props.tablemodel2.upper;
                var skuArr = data.separate_goods.map((v, i)=>{
                    const sgRecord = oldSeparateGoods[i] ? oldSeparateGoods[i] : undefined;
                    return {
                        skuCode:v.skuCode,
                        count:v.skuCount, 
                        skuAffix: sgRecord && sgRecord.skuAffix ? sgRecord.skuAffix : '', 
                        skuAffixType: sgRecord && (sgRecord.skuAffixType || Number(sgRecord.skuAffixType) === 0) ? sgRecord.skuAffixType : ''
                    }
                })
                var params = {
                    warehouse:data.warehouseCode,
                    skuArr,
                    orderId:this.props.form.getFieldValue("yksOrderNumber"),
                    recommend: data.recommend ? 1 : 0
                }
                var dataList = this.props.devanningtable.data;
                dataList[index-1].trialdata = {}
                this.props.devanningTableaction({data:[...dataList]})
                var loading = message.loading('正在获取物流渠道', 0)
                var setFieldsValue = this.props.form.setFieldsValue;
                var name = "channelCode" + index
                setFieldsValue({[name]:""})
                axios.post(`${config.api_url}/oms/order/manage/motan/ICompanyOrderManageApi/recommendedChannels`, params)
                    .then(response => {
                        loading();
                        this.timerId = 0
                        this.setState({operability:true});
                        if (response && response.status == 200) {
                            var channleList;
                            if (response.data.state == '000001') {
                                channleList =response.data.channleList
                                if(!channleList || !channleList.length){
                                    channleList = []
                                    message.warning("当前仓库无可走渠道")
                                }else {
                                    message.info("成功获取可走渠道")
                                }
                            } else {
                                channleList = []
                                message.error(response.data.msg)
                            }
                            var data = this.props.devanningtable.data;
                            data[index-1].channleList = channleList;
                            this.props.devanningTableaction({data:[...data]})
                        }else {
                            var data = this.props.devanningtable.data;
                            data[index-1].channleList = [];
                            this.props.devanningTableaction({data:[...data]})
                        }
                    }).catch(e => {
                        var data = this.props.devanningtable.data;
                        data[index-1].channleList = [];
                        this.props.devanningTableaction({data:[...data]})
                        this.setState({operability:true})
                        this.timerId = 0
                        loading()
                    })
            }
        },1000)
    }

    setTrialdata = (text,record,i)=>{
        if(!text) return ""
        const { key } = record
        return (
            <div>
                {
                    text.result?
                    <Row>
                        <Col span={10}>
                            结果：
                        </Col>

                        <Col span={14}>
                            {text.result}
                        </Col>
                    </Row>
                    :null
                }
                {
                    this.props.form.getFieldDecorator(`result${key}`, {
                        initialValue: text.result
                    })(
                        <Input type="hidden" />
                    )
                }
                {
                    this.props.form.getFieldDecorator(`currency${key}`, {
                        initialValue: text.currency
                    })(
                        <Input type="hidden" />
                    )
                }
                 {
                    this.props.form.getFieldDecorator(`prodCode${key}`, {
                        initialValue: text.prodCode
                    })(
                        <Input type="hidden" />
                    )
                }
                {
                    this.props.form.getFieldDecorator(`freight${key}`, {
                        initialValue: text.freight
                    })(
                        <Input type="hidden" />
                    )
                }
                {
                    this.props.form.getFieldDecorator(`remoteFee${key}`, {
                        initialValue: text.remoteFee
                    })(
                        <Input type="hidden" />
                    )
                }
                {
                    text.channelName?
                    <Row>
                        <Col span={10}>
                            推荐渠道：
                        </Col>

                        <Col span={14}>
                            {text.channelName}
                        </Col>
                    </Row>
                    :null
                }
            </div>
        )
    }

    formItemLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 }
    }
    state = {
        readonly: true,
        formloading: true,
        operability : true
    }

    /**
     * 核实当条分仓信息 调用试算接口
     */
    handleOkCallback = (key)=>{
        if(this.timerId == -1) return ;
        clearTimeout(this.timerId)
        this.timerId = setTimeout(()=>{
            var index = Number(key)+1 || 1;
            var values = this.props.form.getFieldsValue();
            const template = {
                order_separate: [{
                    warehouseCode: '',
                    channelCode: '',
                    separate_goods: [{ skuCode: '', skuCount: '' }]
                }],
            }
            const data = dataPack(template, values).order_separate[index-1]
            if(data && this.checkInfo(data)){
                    this.setState({operability:false})

                    const oldSeparateGoods = this.props.tablemodel2.upper;
                    var skuArr = data.separate_goods.map((v, i)=>{
                        const sgRecord = oldSeparateGoods[i] ? oldSeparateGoods[i] : undefined;
                        return {
                            skuCode:v.skuCode,
                            count:v.skuCount,
                            skuAffix: sgRecord && sgRecord.skuAffix ? sgRecord.skuAffix : '', 
                            skuAffixType: sgRecord && (sgRecord.skuAffixType || Number(sgRecord.skuAffixType) === 0) ? sgRecord.skuAffixType : ''
                        };
                    })
                    var params = {
                        channel:data.channelCode || "",
                        warehouse:data.warehouseCode,
                        skuArr,
                        orderId:this.props.form.getFieldValue("yksOrderNumber")
                    }
                    var loading = message.loading('正在计算', 0)
                    fetchPost(`${config.api_url}/oms/order/manage/motan/ICompanyOrderManageApi/trialShipping`, params)
                        .then(response => {
                            loading()
                            this.setState({operability:true})
                            if (response.state == '000001') {
                                var {result,channelName,channelCode, currency, freight, remoteFee,prodCode } =response
                                // currency: '', freight: '', remoteFee: ''
                                var data = this.props.devanningtable.data;
                                data[index-1].trialdata = {
                                    result,channelName,channelCode, currency, freight, remoteFee, prodCode,
                                }
                                this.props.devanningTableaction({data:[...data]})
                            } else {
                                const data = this.props.devanningtable.data;
                                data[index-1].trialdata = {
                                    result: null,
                                    channelName: null,
                                    channelCode: null,
                                    currency: null,
                                    freight: null,
                                    remoteFee: null,
                                    prodCode: null
                                }
                                this.props.devanningTableaction({data:[...data]})
                                message.error(response.msg)
                            }
                        }).catch(e => {
                            this.setState({operability:true})
                            loading()
                            console.log(e);
                        })
            }
        },1500)
    }
    /**
     * 作者：魏洁
     * 描述：校验 调用试算接口参数
     * 时间：2018-4-17
     * @param <Array> data
     */

    checkInfo = (data)=>{
        var flag = true;
        Object.keys(data).forEach(v=>{
            if(v === "separate_goods" ){
                var num = 0
                data[v].forEach(val=>{
                    num += Number(val.skuCount)
                })
                if(num <=0){
                    flag = false
                }
            }else if(data[v] === undefined || data[v] === null || data[v] === ""){
                flag = false
            }
        })
        return flag
    }
    setCodeName = (id,data)=>{
        for(var i = 0,l=data.length;i<l;i++){
            if(id === data[i].id){
                return data[i].name
            }
        }
        return ""
    }
    /**
     * 作者: pzt
     * 描述: 优选推荐操作
     * 时间: 2018/12/4 10:10
     **/
    handleSwitch = (value)=>{
        // console.log(value)
    }
    addSwitchData = ({ name, message, initialValue = []}) => {
        const {getFieldDecorator} = this.props.form;
        const newinitialValue = initialValue.length ? initialValue : [this.props.devanningtable.data[0].recommend.initialValue] ? [this.props.devanningtable.data[0].recommend.initialValue] : [];
        const arr = newinitialValue.map((v, i) => (
            <FormItem key={i}>
                {getFieldDecorator(`${name}`, {
                    valuePropName: 'checked',
                    initialValue: v
                })(
                    <Switch />
                )}
            </FormItem>
           )
        )
        return <div>{arr}</div>
    }

    addinputdata = ({ name, message, placeholder = '', initialValue = [], disabled = true, required = false, type = 'string', }) => {
        const newinitialValue = initialValue.length ? initialValue : this.props.devanningtable.data["0"].skuCode.initialValue ? this.props.devanningtable.data["0"].skuCode.initialValue : [];
        const arr = newinitialValue.map((v, i) => {
            return (
            <FormItem key={i}  {...{
                ...this.formItemLayout, ...{
                    wrapperCol: {
                        span: 24,
                    }
                }
            }}>
                {this.props.form.getFieldDecorator(`${name}_${i}`, {
                    rules: [{ required: required, message: message, type: type },],
                    initialValue: v,
                })(
                    <Input
                        placeholder={placeholder}
                        disabled={disabled}
                        maxLength={30}
                    />
                )}
            </FormItem>)
        })
        return <div>{arr}</div>
    }

    addspandata = ({ name, message, placeholder = '', initialValue = [], disabled = true, required = false, type = 'string', }) => {
        const newinitialValue = initialValue.length ? initialValue : this.props.devanningtable.data["0"].skuAffix.initialValue ? this.props.devanningtable.data["0"].skuAffix.initialValue : [];
        const arr = newinitialValue.map((v, i) => {
            return (
            <FormItem key={i}  {...{
                ...this.formItemLayout, ...{
                    wrapperCol: {
                        span: 24,
                    }
                }
            }}>
                {this.props.form.getFieldDecorator(`${name}_${i}`, {
                    rules: [{ required: required, message: message, type: type },],
                    initialValue: v,
                })(
                    <Input
                        placeholder={placeholder}
                        disabled={disabled}
                        maxLength={30}
                    />
                )}
            </FormItem>)
        })
        return <div>{arr}</div>
    }

    skunumChange = (name, v, rule, value, callback) => {
        callback()
    }

    addinputdata2 = ({ name, message, placeholder = '', initialValue = [], isadd, disabled = false, required = false, type = 'string', }, result, index) => {
        const newinitialValue = initialValue.length ? initialValue : this.props.devanningtable.data["0"].skuCode.initialValue ? this.props.devanningtable.data["0"].skuCode.initialValue : [];
        // debugger
        let isskuCount = false;
        if (name.match('skuCount')) {
            isskuCount = true
        }
        const arr = newinitialValue.map((v, i) => {
            var mark = `${name}_${i}`
            this.addClearName(mark)

            return (<FormItem key={i}  {...{
                ...this.formItemLayout, ...{
                    wrapperCol: {
                        span: 24,
                    }
                }
            }}>
                {this.props.form.getFieldDecorator(mark, {
                    rules: [{
                        validator: (rule, value, callback) => {
                            this.skunumChange(mark, v, rule, value, callback)
                        },
                    }],
                    initialValue: (isskuCount && isadd) ? 0 : v,
                })(
                    <InputNumber min={0}  disabled={disabled} maxLength={30}
                        onChange={() => {
                            this.handleOkCallback(index)
                         }}
                    />
                )}
            </FormItem>)
        }


        )
        return <div>{arr}</div>
    }


    Modalshow = (index) => () => {
        this.props.modalmodelaction({ devanningvisible: true, })
        this.props.devanningTableaction({ delkey: index, })
    }

    /**
     * 作者: pzt
     * 描述: SKU库存信息
     * 时间: 2018/12/5 14:42
     * @param <string> dataIndex
     **/
    handleSkuStock = (record, dataIndex)=>{
        const skuStock = record.skuStock || [];
        const elem = skuStock.map((item, index) => {
            return <p key={index}>{item[dataIndex]}</p>
        });
        return <div className="tablecell-flex">{elem}</div>
    }

    columns = [
        {
            key: "No",
            title: '分仓订单',
            className: 'column-order',
            dataIndex: 'No',
            width: 80,
        },
        {
            key: "skuCode",
            title: '产品',
            dataIndex: 'skuCode',
            render: this.addinputdata,
            width: 120,
        },
        {
            key: "skuAffix",
            title: '前后缀',
            dataIndex: 'skuAffix',
            render: this.addspandata,
            width: 80,
        },
        {
            key: "skuCount",
            title: '数量',
            dataIndex: 'skuCount',
            render: this.addinputdata2,
            width: 80,
        }, {
            key: "warehouseCode",
            title: '发货仓',
            dataIndex: 'warehouseCode',
            render: this.addselectdata1,
            width: 120,
        },
        {
            key: "channelCode",
            title: '物流渠道',
            dataIndex: 'channelCode',
            render: this.addselectdata2,
            width: 120,
        },
        {
            key: "result",
            title: '试算结果',
            dataIndex: 'trialdata',
            render: this.setTrialdata,
            width: 200,
        },
        {
            key: "recommend",
            title: '优选推荐',
            dataIndex: 'recommend',
            render: this.addSwitchData,
            // render: (text,record, index) => {
            //     const {getFieldDecorator} = this.props.form;
            //     return (
            //         <div>
            //             <FormItem>
            //                 {getFieldDecorator(`recommend_${index}`, {
            //                     valuePropName: 'checked',
            //                     initialValue: true
            //                 })(
            //                     <Switch />
            //                 )}
            //             </FormItem>
            //         </div>
            //     )
            // }
        },
        {
            key: "Operation",
            title: '操作',
            dataIndex: 'Operation',
            width: 60,
            render: (text, record, index) => {
                return (
                    this.props.devanningtable.data.length > 1 ?
                        (
                            <div>
                                {
                                    index != 0 ?
                                        <a onClick={this.Modalshow(index)}>{'删除'}</a>
                                        : null
                                }
                            </div>) : null
                );
            }
        }
    ];

    /**
     * 作者：魏洁
     * 描述：sku 库存查询列表
     * 时间：2018-4-17
     */
    skucolumns = [
        {
            key: "skuCode",
            title: 'SKU',
            dataIndex: 'skuCode',
            render: text => text,
        }, {
            key: "skuCount",
            title: '订单数量',
            dataIndex: 'skuCount',
            render: text => text,
        }, {
            key: "warehouse",
            title: '仓库',
            dataIndex: 'warehouse',
            render: (text, record) => this.handleSkuStock(record, 'warehouse'),
        }, {
            key: "storage",
            title: '储位',
            dataIndex: 'storage',
            render: (text, record) => this.handleSkuStock(record, 'storage'),
        }, {
            key: "stock",
            title: '实际库存',
            dataIndex: 'stock',
            render: (text, record) => this.handleSkuStock(record, 'stock'),
        }, {
            key: "availableStock",
            title: '可用量',
            dataIndex: 'availableStock',
            render: (text, record) => this.handleSkuStock(record, 'availableStock'),
        }, {
            key: "occupancyStock",
            title: '订单占用',
            dataIndex: 'occupancyStock',
            render: (text, record) => this.handleSkuStock(record, 'occupancyStock'),
        }
        // , {
        //     key: "handle",
        //     title: '操作',
        //     width: 120,
        //     render: (text, record, index) => {
        //         return <a href="javascript:;" onClick={() => {
        //             this.getRepertory(text)
        //         }}>查库存</a>
        //     }
        // },
    ];

    /**
     * 作者：魏洁
     * 描述：库存查询结果列表
     * 时间：2018-4-17
     */
    repertoryListColumns = [
        {
            key: "warehouse",
            title: '仓库',
            dataIndex: 'warehouse',
            width: 120,
            render: text => text,
        }, {
            key: "storage",
            title: '储位',
            dataIndex: 'storage',
            width: 120,
            render: text => text,
        }, {
            key: "stock",
            title: '实际库存',
            dataIndex: 'stock',
            width: 80,
            render: text => text,
        }, {
            key: "availableStock",
            title: '可用量',
            dataIndex: 'availableStock',
            width: 80,
            render: text => text,
        }, {
            key: "occupancyStock",
            title: '订单占用',
            dataIndex: 'occupancyStock',
            width: 80,
            render: text => text,
        },
    ]
    /**
     * 作者：魏洁
     * 描述：获取库存接口
     * 时间：2018-4-17
     * @param <Object> data
     */
    getRepertory = (data) => {
        if (data.searchData) {
            this.props.modalmodelaction({ repertoryvisible: true })
            this.props.repertoryListAction(data.searchData)
            return
        }
        axios.post(`${config.api_url}/oms/order/manage/motan/ICompanyOrderManageApi/getStockBySkuName`,
            {
                skuCode: data.sku
            }
        ).then(response => {

            if (response.status == 200) {
                if (response.data.state == '000001') {
                    this.props.modalmodelaction({ repertoryvisible: true })
                    data.searchData = response.data.data
                    this.props.repertoryListAction(data.searchData)
                } else {
                    message.error(response.data.msg)
                }

            }
        }).catch(e => {
            console.log(e)
        })

    }
    ModalhandleOk = () => {
        const data = [...this.props.devanningtable.data];
        const delkey = this.props.devanningtable.delkey;
        data.splice(delkey, 1);
        this.props.modalmodelaction({ ModalText: '删除中···', confirmLoading: true, })
        setTimeout(() => {
            this.props.devanningTableaction({ data: data, });
            this.props.modalmodelaction({
                devanningvisible: false,
                confirmLoading: false,
            });
        }, 500);
    }
    ModalhandleCancel = (value) => () => {
        this.props.modalmodelaction({ [value]: false })
    }

    handleAdd = (isadd = false) => {
        const { count, data } = this.props.devanningtable;
        const newData = {
            key: count + '',
            No: count + '',
            warehouseCode: { name: 'warehouseCode' + count, message: '发货仓', placeholder: '发货仓', },
            channelCode: { name: 'channelCode' + count, message: '物流渠道', placeholder: '物流渠道', },
            skuCode: { name: 'skuCode' + count, message: '产品', placeholder: '产品', },
            skuAffix: { name: 'skuAffix' + count, message: '前后缀', placeholder: '前后缀', },
            skuCount: { name: 'skuCount' + count, message: '数量', placeholder: '数量', isadd },
            recommend: { name: 'recommend' + count, message: '优选推荐', placeholder: '优选推荐' },
            Operation: '删除',
        };

        this.props.devanningTableaction({ data: [...data, newData], count: count + 1, })
    }


    render() {
        const { getFieldDecorator, getFieldsValue } = this.props.form;
        const { data } = this.props.devanningtable;
        const productInfo = this.props.tablemodel2.upper || []
        const skuList = datasaddkey(productInfo)
        var repertoryList = this.props.repertoryListModel;

        var repertoryListContent = (
            <Table
                className="margin-ms-bottom"
                columns={this.repertoryListColumns}
                pagination={false}
                dataSource={repertoryList}
                bordered
            />
        )

        var { platformOrderId, yksOrderNumber, timePayment, oiCountryName } = getFieldsValue(["platformOrderId", "yksOrderNumber", "timePayment", "oiCountryName"])


        const columns = this.columns;
        var {operability} = this.state
        return (
            <div className="exc-splitOrder">
                <div className={!operability ? "exc-splitOrder-mask":""}></div>
                <Row type="flex" justify="space-between" className="margin-ms-bottom">
                    <Col>
                        平台单号：{platformOrderId}
                    </Col>
                    <Col>
                        YKS单号：{yksOrderNumber}
                    </Col>
                    <Col>
                        付款时间：{timePayment}
                    </Col>
                    <Col>
                        国家：{oiCountryName}
                    </Col>
                </Row>

                <Table
                    className="tablece-flex margin-ms-bottom"
                    columns={this.skucolumns}
                    pagination={false}
                    dataSource={skuList}
                    bordered
                />
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <Table
                        columns={columns}
                        pagination={false}
                        dataSource={data}
                        bordered
                        footer={() => <div className="text-center"><Button
                            className="editable-add-btn" onClick={() => this.handleAdd(true)}>+添加分仓</Button>
                        </div>}
                    />
                </Form>
                <Modalmodel  {...{
                    ...this.props.modalmodel,
                    visible: this.props.modalmodel.devanningvisible,
                    ModalText: '确认删除吗?',
                }}
                    onOk={this.ModalhandleOk}
                    confirmLoading={this.props.modalmodel.confirmLoading}
                    onCancel={this.ModalhandleCancel('devanningvisible')} />

                {/*<Modalmodel  {...{*/}
                    {/*...this.props.modalmodel,*/}
                    {/*width: 700,*/}
                    {/*visible: this.props.modalmodel.repertoryvisible,*/}
                    {/*title: "库存查询",*/}
                    {/*ModalText: repertoryListContent,*/}
                    {/*footer: null*/}
                {/*}}*/}
                    {/*confirmLoading={this.props.modalmodel.confirmLoading}*/}
                    {/*onCancel={this.ModalhandleCancel('repertoryvisible')} />*/}

            </div>
        );
    }
}

export default WarehouseOrder
