/**
 * 作者: pzt
 * 描述: 渠道信息（重构）
 * 时间: 2018/12/11 11:28
 **/
import React, {Component} from 'react'
import qs from 'qs'
import {
    Form,
    Input,
    Select,
    Row,
    Col,
    Radio,
    DatePicker,
} from 'antd'
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const RadioGroup = Radio.Group;
import CSelect from '../../../components/cselect';
import { levelOptions } from "../../../util/options";

class ChannelDetail extends Component {
    state={
        loading: false,
        platformVisible:false,
        orderId: null,
    };

    formItemLayout = {
        labelCol: {span: 10},
        wrapperCol: {span: 14}
    };

    formItemLayout2 = {
        labelCol: {span: 5},
        wrapperCol: {span: 19}
    };

    rangeConfig = {
        rules: [{type: 'array', required: false, message: '请选择'}],
    };

    componentDidMount(){
        const locationarr = window.location.href.split('?');
        const orderId = locationarr.length > 1 ? qs.parse(locationarr[1])['orderId'] ? qs.parse(locationarr[1])['orderId'] : '' : '';  //获取ID
        this.setState({orderId})
    }

    //发货时间数字验证
    checkNumber1 = (rule, value, callback) => {
        const numreg = /^(\d|[1-9]\d+)(\.\d{1})?$/;
        if (value && !numreg.test(value)) {
            callback(null)
        } else if (!value || value.length == 0) {
            callback()
        } else {
            callback()
        }
    }

    //最大重量数字验证
    checkNumber2 = (rule, value, callback) => {
        const numreg = /^(\d|[1-9]\d+)(\.\d{1,3})?$/;
        if (value && !numreg.test(value)) {
            callback(null)
        } else if (!value || value.length == 0) {
            callback()
        } else {
            callback()
        }
    }

    //异步的JSON转换
    tojson = (str) =>{
        let promise = new Promise(function(resolve,reject){
            let result = JSON.stringify(JSON.parse(str))
            resolve(result)
        })
        return promise
    }

    //JSON格式校验
    checkJSON = (rule, value, callback)=>{
        if(value && value.length>0 && isNaN(Number(value))){
            this.tojson(value).then(
                function(val){
                    let obj =JSON.parse(val);   //转成Object
                    if(val.length == 2){        //判断是不是空[] 或者 空{}
                        callback(null);         //为空[] 或者 空{}就提示错误
                    }else if(!obj.length){      //判断是数组对象还是{},{}是没有length的
                        callback();             //如果是{}对象就不提示错误
                    }else{
                        callback(null);
                    }
                }
            ).catch(                            //经过tojson()后的错误回调
                function(err){
                    callback(err);              //提示错误
                }
            )
        }else if(!value || value.length == 0){            //当input框为空的时候,不提示错误
            callback();
        }else{
            callback(null);     //这个不加参数,input直接填写数字会没效果,但是填其他参数又会报异步的警告
        }
    }


    //组件销毁时
    componentWillUnmount(){
        this.props.form.resetFields();
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        let { orderId } = this.state;
        const {
            outLineCountriesArr,
            developingCountryArr,
            channelCountryArr,
        } = this.props;
        return(
            <div className="newCluenk">
                <div className="title">
                    <Row className={'channel-title'}>
                        <Col span={18}>渠道信息</Col>
                        <Col span={6}>
                            <FormItem
                                {...this.formItemLayout}
                                className={'ant-xs-row padding-sm-right'}
                            >
                                {getFieldDecorator('channel[isAvailable]', {
                                    initialValue: 0,
                                })(
                                    <RadioGroup
                                        className={'padding-xm-top'}
                                    >
                                        <Radio value={0}>启用</Radio>
                                        <Radio value={1}>停用</Radio>
                                    </RadioGroup>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                </div>
                <div className="content">
                    <Row className={'pad-top-bottom8'}>
                        <Col span={6}>
                            <FormItem
                                {...this.formItemLayout}
                                label="渠道编号"
                                className={'ant-xs-row padding-sm-right'}
                            >
                                {getFieldDecorator('channel[newChannelCode]', {
                                    rules: [{
                                        required: true,
                                        message: `请输入渠道编号`
                                    }],
                                })(
                                    <Input
                                        disabled={!!orderId}
                                        placeholder={`请输入渠道编号`}
                                        maxLength={100}
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                {...this.formItemLayout}
                                label="渠道中文名称"
                                className={'ant-xs-row padding-sm-right'}
                            >
                                {getFieldDecorator('channel[channelCnName]', {
                                    rules: [{
                                        required: true,
                                        message: `请输入渠道中文名称`
                                    }],
                                })(
                                    <Input
                                        placeholder={`请输入渠道中文名称`}
                                        maxLength={100}
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                {...this.formItemLayout}
                                label="渠道英文名称"
                                className={'ant-xs-row padding-sm-right'}
                            >
                                {getFieldDecorator('channel[channelEnName]')(
                                    <Input
                                        placeholder={`请输入渠道英文名称`}
                                        maxLength={100}
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                {...this.formItemLayout}
                                label="承运商编号"
                                className={'ant-xs-row padding-sm-right'}
                            >
                                {getFieldDecorator('channel[companyCarrierCode]')(
                                    <Input
                                        placeholder={`请输入渠道承运商编号`}
                                        maxLength={100}
                                    />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row className={'pad-top-bottom8'}>
                        <Col span={6}>
                            <FormItem
                                {...this.formItemLayout}
                                label="承运商名称"
                                className={'ant-xs-row padding-sm-right'}
                            >
                                {getFieldDecorator('channel[companyCarrierName]', {
                                    rules: [{
                                        required: true,
                                        message: `请输入渠道承运商名称`
                                    }],
                                })(
                                    <Input
                                        placeholder={`请输入渠道承运商名称`}
                                        maxLength={100}
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                {...this.formItemLayout}
                                label="渠道网址"
                                className={'ant-xs-row padding-sm-right'}
                            >
                                {getFieldDecorator('channel[channelWebSite]', {
                                    rules: [{
                                        required: false,
                                        message: `请输入渠道网址`
                                    }],
                                })(
                                    <Input
                                        placeholder={`请输入渠道网址`}
                                        maxLength={100}
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                {...this.formItemLayout}
                                label="渠道类型"
                                className={'ant-xs-row padding-sm-right'}
                            >
                                {getFieldDecorator('channel[channelType]', {
                                    rules: [{required: false, message: '请选择'}]
                                })(
                                    <Select
                                        className={'ant-xs-row'}
                                        placeholder="请选择"
                                    >
                                        {levelOptions('渠道类型').map(item => {
                                            return (
                                                <Option
                                                    key={item.value}
                                                    value={item.value}
                                                >
                                                    {item.label}
                                                </Option>
                                            )
                                        })}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                {...this.formItemLayout}
                                label="渠道分组"
                                className={'ant-xs-row padding-sm-right'}
                            >
                                {getFieldDecorator('channel[channelGroup]', {
                                    rules: [{required: false, message: '请选择'}]
                                })(
                                    <Select
                                        className={'ant-xs-row'}
                                        placeholder="请选择"
                                    >
                                        {levelOptions('渠道分组').map(item => {
                                            return (
                                                <Option key={item.value} value={item.value}
                                                >
                                                    {item.label}
                                                </Option>
                                            )
                                        })}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row className={'pad-top-bottom8'}>
                        <Col span={6}>
                            <FormItem
                                {...this.formItemLayout}
                                label="是否追踪"
                                className={'ant-xs-row padding-sm-right'}
                            >
                                {getFieldDecorator('channel[trackingType]', {
                                    rules: [{required: true, message: '请选择'}]
                                })(
                                    <Select
                                        className={'ant-xs-row'}
                                        placeholder="请选择"
                                    >
                                        {levelOptions('是否追踪').map(item => {
                                            return (
                                                <Option
                                                    key={item.value}
                                                    value={item.value}
                                                >
                                                    {item.label}
                                                </Option>
                                            )
                                        })}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                {...this.formItemLayout}
                                label="渠道所属国家"
                                className="ant-xs-row padding-right"
                                style={{paddingRight: 10}}
                            >
                                {getFieldDecorator('channel[channelCountry]')(
                                    <CSelect
                                        list={channelCountryArr}
                                        code='id' // 列表编码字段
                                        name='name' // 列表名称字段
                                        url='/oms/order/manage/motan/CommonBasicsDataApi/queryCountrlData'
                                        params={{searchColumn: 'name',pageNumber:1, pageData:20}} // 搜索参数
                                        localSearch = {1}
                                        apiListType={2}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                {...this.formItemLayout}
                                label="可发国家"
                                className="ant-xs-row padding-right"
                                style={{paddingRight: 10}}
                            >
                                {getFieldDecorator('channel[developingCountryObj]')(
                                    <CSelect
                                        list={developingCountryArr}
                                        code='id' // 列表编码字段
                                        name='name' // 列表名称字段
                                        url='/oms/order/manage/motan/CommonBasicsDataApi/queryCountrlData'
                                        params={{searchColumn: 'name',pageNumber:1, pageData:20}} // 搜索参数
                                        formType={1}  // 表单数据类型，不填就是默认值，填1返回对象
                                        localSearch = {1}
                                        apiListType={2}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                {...this.formItemLayout}
                                label="例外国家"
                                className="ant-xs-row padding-right"
                                style={{paddingRight: 10}}
                            >
                                {getFieldDecorator('channel[outLineCountriesObj]')(
                                    <CSelect
                                        list={outLineCountriesArr}
                                        code='id' // 列表编码字段
                                        name='name' // 列表名称字段
                                        url='/oms/order/manage/motan/CommonBasicsDataApi/queryCountrlData'
                                        params={{searchColumn: 'name',pageNumber:1, pageData:20}} // 搜索参数
                                        formType={1}  // 表单数据类型，不填就是默认值，填1返回对象
                                        localSearch = {1}
                                        apiListType={2}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                    />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row className={'pad-top-bottom8'}>
                        <Col span={6}>
                            <FormItem
                                {...this.formItemLayout}
                                label="发货最短时长"
                                className={'ant-xs-row padding-sm-right'}
                            >
                                {getFieldDecorator('channel[shortestLength]', {
                                    rules: [{
                                        required: false,
                                        message: `请输入正确数字,小数点最多为1位!`,
                                        validator: this.checkNumber1,
                                    }],
                                })(
                                    <Input
                                        addonAfter={'天'}
                                        placeholder={`请输入发货最短时长`}
                                        maxLength={100}
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                {...this.formItemLayout}
                                label="发货最长时长"
                                className={'ant-xs-row padding-sm-right'}
                            >
                                {getFieldDecorator('channel[longestLength]', {
                                    rules: [{
                                        required: false,
                                        message: `请输入正确数字,小数点最多为1位!`,
                                        validator: this.checkNumber1,
                                    }],
                                })(
                                    <Input
                                        addonAfter={'天'}
                                        placeholder={`请输入发货最长时长`}
                                        maxLength={100}
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                {...this.formItemLayout}
                                label="渠道最大重量"
                                className={'ant-xs-row padding-sm-right'}
                            >
                                {getFieldDecorator('channel[channelMaxWeight]', {
                                    rules: [{
                                        required: false,
                                        message: `请输入正确数字,小数点最多为3位!`,
                                        validator: this.checkNumber2,
                                    }],
                                })(
                                    <Input
                                        addonAfter={'g'}
                                        placeholder={`请输入渠道最大重量`}
                                        maxLength={100}
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                {...this.formItemLayout}
                                label="物流属性"
                                className={'ant-xs-row padding-sm-right'}
                            >
                                {getFieldDecorator('channel[channelLogisticsAttr]', {
                                    rules: [{
                                        required: false,
                                        message: `请输入物流属性`
                                    }],
                                })(
                                    <Input
                                        placeholder={`请输入`}
                                        maxLength={100}
                                    />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row className={'pad-top-bottom8'}>
                        <Col span={12}>
                            <FormItem
                                {...this.formItemLayout2}
                                label="渠道扩展信息"
                                className={'ant-xs-row padding-sm-right'}
                            >
                                {getFieldDecorator('channel[extendInfo]', {
                                    rules: [{
                                        required: false,
                                        message: `请输入正确的JSON格式!`,
                                        validator: this.checkJSON,
                                    }],
                                })(
                                    <TextArea
                                        placeholder={`请输入渠道扩展信息`}
                                    />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default ChannelDetail