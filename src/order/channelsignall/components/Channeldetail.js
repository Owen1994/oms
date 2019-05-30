/**
 *作者: 唐峰
 *功能描述: 渠道标记--修改页--渠道信息(顶部)
 *参数说明:
 *时间: 2018/4/4 14:42
 */
import React, {Component} from 'react'
import qs from 'qs'
import {
    Form,
    Input,
    Button,
    Select,
    Row,
    Col,
    Radio,
    DatePicker,
    Icon,
    message,
} from 'antd'

const FormItem = Form.Item
const Option = Select.Option
const RangePicker = DatePicker.RangePicker;  
import {levelOptions} from '../../../util/options';
import axios from "../../../util/axios";
import * as config from "../../../util/connectConfig";
import {selectValues, closehandle, functions} from '../../../util/baseTool';

class Channeldetail extends Component {

    constructor(props) {
        super(props);
    }

    state={
        loading: false,
        platformVisible:false,
        handleStatus:false,
        isSave:false
    }

    formItemLayout = {
        labelCol: {span: 10},
        wrapperCol: {span: 14}
    }

    formItemLayout2 = {
        labelCol: {span: 5},
        wrapperCol: {span: 19}
    }

    //保存按钮
    handleSubmit = (e) => {
        const or = typeof e == 'object' ? true : false
        or && e.preventDefault();
        const newobj = {}
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                for (let i in values) {
                    if(i == 'channelLogisticsAttr'){
                        newobj['channelLogisticsAttr'] = values[i];
                    }
                    if (values[i] || values[i] === 0) {
                        if (i == 'range-time') {
                            const arr = values[i].map(v => v.format("YYYY-MM-DD"));
                            newobj['startTime'] = arr[0] ? arr[0] : ''
                            newobj['endTime'] = arr[1] ? arr[1] : ''
                        } else if(/editIsAvailable|editWarehouseCode|editWarehouseChannelSign|editWarehouseName/g.test(i)){
                            continue
                        }else {
                            newobj[i] = values[i]
                        }
                    }
                }
                // 保存主信息
                if(newobj){
                    const buttontype = this.props.buttonType.buttonType;
                    const postUrl = buttontype === '2'?`${config.api_url}/oms/order/manage/motan/IOrderManageConfigApi/saveChanneDetail`:`${config.api_url}/oms/order/manage/motan/IOrderManageConfigApi/addSaveChannelDetail`;
                    axios.post(postUrl, newobj)
                        .then(response => {
                            this.setState({isSave:true})
                            if(response.status === 200){
                                if(response.data.state == "000001"){
                                    this.setState({handleStatus:!this.state.handleStatus });
                                    message.success(response.data.msg || '成功');
                                    buttontype === '2'?this.props.baseInfoForm({isAdd:false}):this.props.baseInfoForm({isAdd:true})  //状态控制 仓库信息/标记信息/第三方信息的新增按钮是否可用
                                }else{
                                    message.error(response.data.msg);
                                }
                            }
                        })
                        .catch(e => {
                            message.error("服务器响应失败！")
                        })
                    }
            }
        });
    }

    rangeConfig = {
        rules: [{type: 'array', required: false, message: '请选择'}],
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

    //修改按钮 控制状态
    handleStatu = () => {
        this.setState({
            handleStatus:!this.state.handleStatus
        })
    }

    //平台编号请求
    platformSelect =() =>{
        this.props.platformsearchaction({visible:true,fileds:'platformId'})
        this.props.fetchsearchplatform({key: 'data', value: {isPass: 'no',}})
    }

    //组件销毁时
    componentWillUnmount(){
        this.props.form.resetFields();
    }

    render() {
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,resetFields} = this.props.form;
        let { isSave } = this.state
        const locationarr = window.location.href.split('?');
        const orderId = locationarr.length > 1 ? qs.parse(locationarr[1])['orderId'] ? qs.parse(locationarr[1])['orderId'] : '' : '';  //获取ID

        const { TextArea } = Input;
        const RadioGroup = Radio.Group;
        const buttontype = this.props.buttonType.buttonType; //获取父页面的按钮类型
        const radioState = this.props.Infos.radioState;
        const radioVal = radioState == 0 ? "启用" : "停用";
        const radioClass =  radioState == 0 ? "" : "ant-radio-state";

        return buttontype === '1'?(
            <div className="newCluenk channel-detail">
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <div className="title">
                        <Row>
                            <Col span={22}>渠道信息</Col>
                            <Col span={2}>
                                <Radio checked={true} className={radioClass}>
                                    {radioVal}
                                    <FormItem>
                                    {getFieldDecorator('isAvailable', {
                                        rules: [{
                                            required: false,
                                            message: `状态`
                                        }],
                                    })(
                                        <Input type='hidden' readOnly="true" placeholder="" maxLength={100}/>
                                    )}
                                    </FormItem>
                                </Radio>
                            </Col>
                        </Row>
                    </div>
                    <div className="content">
                        <Row >
                            <Col span={6}>
                                <FormItem  {...this.formItemLayout}
                                           label="渠道编号" className={'ant-xs-row padding-sm-right'}
                                >
                                    {getFieldDecorator('newChannelCode', {
                                        rules: [{
                                            required: false,
                                            message: `请输入渠道编号`
                                        }],
                                    })(
                                        <Input disabled={!!orderId} placeholder="" maxLength={100}/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={6}>
                                <FormItem  {...this.formItemLayout}
                                           label="渠道中文名称" className={'ant-xs-row padding-sm-right'}
                                >
                                    {getFieldDecorator('channelCnName', {
                                        rules: [{
                                            required: false,
                                            message: `请输入渠道中文名称`
                                        }],
                                    })(
                                        <Input readOnly="true" placeholder="" maxLength={100}/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={6}>
                                <FormItem  {...this.formItemLayout}
                                           label="渠道英文名称" className={'ant-xs-row padding-sm-right'}
                                >
                                    {getFieldDecorator('channelEnName', {
                                        rules: [{
                                            required: false,
                                            message: `请输入渠道英文名称`
                                        }],
                                    })(
                                        <Input readOnly="true" placeholder="" maxLength={100}/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={6}>
                                <FormItem  {...this.formItemLayout}
                                           label="承运商编号" className={'ant-xs-row padding-sm-right'}
                                >
                                    {getFieldDecorator('companyCarrierCode', {
                                        rules: [{
                                            required: false,
                                            message: `请输入渠道承运商编号`
                                        }],
                                    })(
                                        <Input readOnly="true" placeholder="" maxLength={100}/>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row >
                            <Col span={6}>
                                <FormItem  {...this.formItemLayout}
                                           label="承运商名称" className={'ant-xs-row padding-sm-right'}
                                >
                                    {getFieldDecorator('companyCarrierName', {
                                        rules: [{
                                            required: false,
                                            message: `请输入渠道承运商名称`
                                        }],
                                    })(
                                        <Input readOnly="true" placeholder="" maxLength={100}/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={6}>
                                <FormItem  {...this.formItemLayout}
                                           label="渠道网址" className={'ant-xs-row padding-sm-right'}
                                >
                                    {getFieldDecorator('channelWebSite', {
                                        rules: [{
                                            required: false,
                                            message: `请输入渠道网址`
                                        }],
                                    })(
                                        <Input readOnly="true" placeholder="" maxLength={100}/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={6}>
                                <FormItem  {...this.formItemLayout}
                                           label="渠道类型" className={'ant-xs-row padding-sm-right'}>
                                    {getFieldDecorator('channelType', {
                                        rules: [{required: false, message: '请选择'}], initialValue:''
                                    })(
                                        <Select readOnly={true} disabled={true}  className={'ant-xs-row'} placeholder="请选择">
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
                                <FormItem  {...this.formItemLayout}
                                           label="渠道分组" className={'ant-xs-row padding-sm-right'}
                                >
                                    {getFieldDecorator('channelGroup', {
                                        rules: [{required: false, message: '请选择'}], initialValue: ''
                                    })(
                                        <Select readOnly={true} disabled={true}  className={'ant-xs-row'} placeholder="请选择">
                                            {levelOptions('渠道分组').map(item => {
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
                        </Row>
                        <Row >
                            <Col span={6}>
                                <FormItem  {...this.formItemLayout}
                                        label="是否追踪" className={'ant-xs-row padding-sm-right'}
                                >

                                    {getFieldDecorator('trackingType', {
                                        rules: [{required: false, message: '请选择'}], initialValue: ''
                                    })(
                                        <Select disabled={true}  className={'ant-xs-row'} placeholder="请选择">
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
                                <FormItem  {...this.formItemLayout}
                                           label="渠道所属国家" className={'ant-xs-row padding-sm-right'}
                                >
                                    {getFieldDecorator('channelCountry', {
                                        rules: [{
                                            required: false,
                                            message: `请输入渠道所属国家`
                                        }],
                                    })(
                                        <Input readOnly="true" placeholder="" maxLength={100}/>
                                    )}
                                    {getFieldDecorator('countryId')(
                                        <Input readOnly maxLength={100} type="hidden"/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={6}>
                                <FormItem  {...this.formItemLayout}
                                           label="可发国家" className={'ant-xs-row padding-sm-right'}
                                >
                                    {getFieldDecorator('developingCountry', {
                                        rules: [{
                                            required: false,
                                            message: `请输入可发国家`
                                        }],
                                    })(
                                        <Input readOnly="true" placeholder="" maxLength={100}/>
                                    )}

                                </FormItem>
                            </Col>
                            <Col span={6}>
                                <FormItem  {...this.formItemLayout}
                                           label="例外国家" className={'ant-xs-row padding-sm-right'}
                                >
                                    {getFieldDecorator('outLineCountries', {
                                        rules: [{
                                            required: false,
                                            message: `请输入例外国家`
                                        }],
                                    })(
                                        <Input readOnly="true" placeholder="" maxLength={100}/>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row >
                            <Col span={6}>
                                <FormItem  {...this.formItemLayout}
                                           label="发货最短时长" className={'ant-xs-row padding-sm-right'}
                                >
                                    {getFieldDecorator('shortestLength', {
                                        rules: [{
                                            required: false,
                                            message: `请输入发货最短时长`
                                        }],
                                    })(
                                        <Input readOnly="true" placeholder="" maxLength={100}/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={6}>
                                <FormItem  {...this.formItemLayout}
                                           label="发货最长时长" className={'ant-xs-row padding-sm-right'}
                                >
                                    {getFieldDecorator('longestLength', {
                                        rules: [{
                                            required: false,
                                            message: `请输入发货最长时长`
                                        }],
                                    })(
                                        <Input readOnly="true" placeholder="" maxLength={100}/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={6}>
                                <FormItem  {...this.formItemLayout}
                                           label="渠道最大重量" className={'ant-xs-row padding-sm-right'}
                                >
                                    {getFieldDecorator('channelMaxWeight', {
                                        rules: [{
                                            required: false,
                                            message: `渠道最大重量`
                                        }],
                                    })(
                                        <Input readOnly="true" placeholder="" maxLength={100}/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={6}>
                                <FormItem  {...this.formItemLayout}
                                           label="物流属性" className={'ant-xs-row padding-sm-right'}
                                >
                                    {getFieldDecorator('channelLogisticsAttr', {
                                        rules: [{
                                            required: false,
                                            message: `请输入物流属性`
                                        }],
                                    })(
                                        <Input readOnly="true" placeholder="" maxLength={100}/>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row >
                            <Col span={12}>
                                <FormItem  {...this.formItemLayout2}
                                           label="渠道扩展信息" className={'ant-xs-row padding-sm-right'}
                                >
                                    {getFieldDecorator('extendInfo', {
                                        rules: [{
                                            required: false,
                                            message: `渠道扩展信息`
                                        }],
                                    })(
                                        <TextArea readOnly rows={3} />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                    </div>
                </Form>
            </div>
    ):(
                <div className="newCluenk">
                    <Form layout="inline" onSubmit={this.handleSubmit}>
                        <div className="title">
                            <Row className={'channel-title'}>
                                <Col span={18}>渠道信息</Col>
                                <Col span={6}>
                                    <FormItem {...this.formItemLayout}
                                                label="" className={'ant-xs-row padding-sm-right'}
                                    >
                                        {getFieldDecorator('isAvailable', {
                                            rules: [{required: false, message: '请选择'}],
                                            initialValue: buttontype == '3'?0:'',
                                        })(
                                            <RadioGroup disabled={this.state.handleStatus} onChange={this.onChange} className={'padding-xm-top'}>
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
                                    <FormItem  {...this.formItemLayout}
                                               label="渠道编号" className={'ant-xs-row padding-sm-right'}
                                    >
                                        {getFieldDecorator('newChannelCode', {
                                            rules: [{
                                                required: true,
                                                message: `请输入渠道编号`
                                            }],
                                        })(
                                            <Input disabled={!!orderId || this.state.handleStatus || isSave} placeholder={`请输入渠道编号`} maxLength={100}/>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={6}>
                                    <FormItem  {...this.formItemLayout}
                                               label="渠道中文名称" className={'ant-xs-row padding-sm-right'}
                                    >
                                        {getFieldDecorator('channelCnName', {
                                            rules: [{
                                                required: true,
                                                message: `请输入渠道中文名称`
                                            }],
                                        })(
                                            <Input disabled={this.state.handleStatus} placeholder={`请输入渠道中文名称`} maxLength={100}/>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={6}>
                                    <FormItem  {...this.formItemLayout}
                                               label="渠道英文名称" className={'ant-xs-row padding-sm-right'}
                                    >
                                        {getFieldDecorator('channelEnName', {
                                            rules: [{
                                                required: false,
                                                message: `请输入渠道英文名称`
                                            }],
                                        })(
                                            <Input disabled={this.state.handleStatus} placeholder={`请输入渠道英文名称`} maxLength={100}/>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={6}>
                                    <FormItem  {...this.formItemLayout}
                                               label="承运商编号" className={'ant-xs-row padding-sm-right'}
                                    >
                                        {getFieldDecorator('companyCarrierCode', {
                                            rules: [{
                                                required: false,
                                                message: `请输入渠道承运商编号`
                                            }],
                                        })(
                                            <Input disabled={this.state.handleStatus} placeholder={`请输入渠道承运商编号`} maxLength={100}/>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row className={'pad-top-bottom8'}>
                                <Col span={6}>
                                    <FormItem  {...this.formItemLayout}
                                               label="承运商名称" className={'ant-xs-row padding-sm-right'}
                                    >
                                        {getFieldDecorator('companyCarrierName', {
                                            rules: [{
                                                required: false,
                                                message: `请输入渠道承运商名称`
                                            }],
                                        })(
                                            <Input disabled={this.state.handleStatus} placeholder={`请输入渠道承运商名称`} maxLength={100}/>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={6}>
                                    <FormItem  {...this.formItemLayout}
                                               label="渠道网址" className={'ant-xs-row padding-sm-right'}
                                    >
                                        {getFieldDecorator('channelWebSite', {
                                            rules: [{
                                                required: false,
                                                message: `请输入渠道网址`
                                            }],
                                        })(
                                            <Input disabled={this.state.handleStatus} placeholder={`请输入渠道网址`} maxLength={100}/>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={6}>
                                    <FormItem {...this.formItemLayout}
                                              label="渠道类型" className={'ant-xs-row padding-sm-right'}
                                    >
                                        {getFieldDecorator('channelType', {
                                            rules: [{required: false, message: '请选择'}]
                                        })(
                                            <Select disabled={this.state.handleStatus} className={'ant-xs-row'} placeholder="请选择">
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
                                    <FormItem {...this.formItemLayout}
                                              label="渠道分组" className={'ant-xs-row padding-sm-right'}
                                    >
                                        {getFieldDecorator('channelGroup', {
                                            rules: [{required: false, message: '请选择'}]
                                        })(
                                            <Select disabled={this.state.handleStatus} className={'ant-xs-row'} placeholder="请选择">
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
                                    <FormItem {...this.formItemLayout}
                                            label="是否追踪" className={'ant-xs-row padding-sm-right'}
                                    >
                                        {getFieldDecorator('trackingType', {
                                            rules: [{required: false, message: '请选择'}]
                                        })(
                                            <Select disabled={this.state.handleStatus} className={'ant-xs-row'} placeholder="请选择">
                                                {levelOptions('是否追踪').map(item => {
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
                                <Col span={6}>
                                    <FormItem  {...this.formItemLayout}
                                               label="渠道所属国家" className={'ant-xs-row padding-sm-right'}
                                    >

                                        {getFieldDecorator('channelCountry', {
                                            rules: [{
                                                required: false,
                                                message: `请输入渠道所属国家`
                                            }],
                                        })(
                                            <Input disabled={this.state.handleStatus} readOnly placeholder={`请选择渠道所属国家`} onClick={
                                                selectValues({
                                                obj: this,
                                                url: '/oms/order/manage/motan/CommonBasicsDataApi/queryCountrlData',
                                                title: '渠道国家',
                                                name: 'channelCountry',
                                                id: 'countryId',
                                                })
                                                }
                                                maxLength={100}/>
                                        )}
                                        {getFieldDecorator('countryId')(
                                            <Input readOnly maxLength={100} type="hidden"/>
                                        )}
                                        <Icon type="close-circle" className={'commonClose'} onClick={(e) => {
                                            closehandle(e, this)
                                        }}/>
                                    </FormItem>
                                </Col>
                                <Col span={6}>
                                    <FormItem  {...this.formItemLayout}
                                               label="可发国家" className={'ant-xs-row padding-sm-right'}
                                    >
                                        {getFieldDecorator('developingCountry', {
                                            rules: [{
                                                required: false,
                                                message: `请输入可发国家`
                                            }],
                                        })(
                                            <Input disabled={this.state.handleStatus} readOnly placeholder={`请选择可发国家`} onClick={
                                                selectValues({
                                                obj: this,
                                                url: '/oms/order/manage/motan/CommonBasicsDataApi/queryCountrlData',
                                                title: '可发国家',
                                                name: 'developingCountry',
                                                id: 'countryId',
                                                })
                                                }
                                                maxLength={100}/>
                                        )}
                                        {getFieldDecorator('countryId')(
                                            <Input readOnly maxLength={100} type="hidden"/>
                                        )}
                                        <Icon type="close-circle" className={'commonClose'} onClick={(e) => {
                                            closehandle(e, this)
                                        }}/>
                                    </FormItem>
                                </Col>
                                <Col span={6}>
                                    <FormItem  {...this.formItemLayout}
                                               label="例外国家" className={'ant-xs-row padding-sm-right'}
                                    >
                                        {getFieldDecorator('outLineCountries', {
                                            rules: [{
                                                required: false,
                                                message: `请输入例外国家`
                                            }],
                                        })(
                                            <Input disabled={this.state.handleStatus} readOnly placeholder={`请选择例外国家`} onClick={
                                                selectValues({
                                                obj: this,
                                                url: '/oms/order/manage/motan/CommonBasicsDataApi/queryCountrlData',
                                                title: '例外国家',
                                                name: 'outLineCountries',
                                                id: 'countryId',
                                                })
                                                }
                                                maxLength={100}/>
                                        )}
                                        {getFieldDecorator('countryId')(
                                            <Input readOnly maxLength={100} type="hidden"/>
                                        )}
                                        <Icon type="close-circle" className={'commonClose'} onClick={(e) => {
                                            closehandle(e, this)
                                        }}/>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row className={'pad-top-bottom8'}>
                                <Col span={6}>
                                    <FormItem  {...this.formItemLayout}
                                               label="发货最短时长" className={'ant-xs-row padding-sm-right'}
                                    >
                                        {getFieldDecorator('shortestLength', {
                                            rules: [{
                                                required: false,
                                                message: `请输入正确数字,小数点最多为1位!`,
                                                validator: this.checkNumber1,
                                            }],
                                        })(
                                            <Input disabled={this.state.handleStatus} addonAfter={'天'} placeholder={`请输入发货最短时长`} maxLength={100}/>
                                        )}

                                    </FormItem>
                                </Col>
                                <Col span={6}>
                                    <FormItem  {...this.formItemLayout}
                                               label="发货最长时长" className={'ant-xs-row padding-sm-right'}
                                    >
                                        {getFieldDecorator('longestLength', {
                                            rules: [{
                                                required: false,
                                                message: `请输入正确数字,小数点最多为1位!`,
                                                validator: this.checkNumber1,
                                            }],
                                        })(
                                            <Input disabled={this.state.handleStatus} addonAfter={'天'} placeholder={`请输入发货最长时长`} maxLength={100}/>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={6}>
                                    <FormItem  {...this.formItemLayout}
                                               label="渠道最大重量" className={'ant-xs-row padding-sm-right'}
                                    >
                                        {getFieldDecorator('channelMaxWeight', {
                                            rules: [{
                                                required: false,
                                                message: `请输入正确数字,小数点最多为3位!`,
                                                validator: this.checkNumber2,
                                            }],
                                        })(
                                            <Input disabled={this.state.handleStatus} addonAfter={'g'} placeholder={`请输入渠道最大重量`}  maxLength={100}/>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={6}>
                                    <FormItem  {...this.formItemLayout}
                                               label="物流属性" className={'ant-xs-row padding-sm-right'}
                                    >
                                        {getFieldDecorator('channelLogisticsAttr', {
                                            rules: [{
                                                required: false,
                                                message: `请输入物流属性`
                                            }],
                                        })(
                                            <Input disabled={this.state.handleStatus} placeholder={`请输入`}  maxLength={100}/>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row className={'pad-top-bottom8'}>
                                <Col span={12}>
                                    <FormItem  {...this.formItemLayout2}
                                            label="渠道扩展信息" className={'ant-xs-row padding-sm-right'}
                                    >
                                        {getFieldDecorator('extendInfo', {
                                            rules: [{
                                                required: false,
                                                message: `请输入正确的JSON格式!`,
                                                validator: this.checkJSON,
                                            }],
                                        })(
                                            <TextArea disabled={this.state.handleStatus} placeholder={`请输入渠道扩展信息`} />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row className={'pad-top-bottom8'}>
                                <Col span={24}>
                                    <div className={'text-center'}>
                                        <FormItem>
                                            <Button
                                                type="primary"
                                                loading={this.state.loading}
                                                htmlType="submit"
                                                disabled={this.state.handleStatus}
                                            >
                                                保存
                                            </Button>
                                        </FormItem>
                                        <FormItem className={'margin-md-left'}>
                                            <Button 
                                            onClick={this.handleStatu} 
                                            disabled={!this.state.handleStatus}>
                                                修改
                                            </Button>
                                        </FormItem>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Form>
                </div>
        );
    }
}

export default Channeldetail