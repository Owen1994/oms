
import React, {Component} from 'react'
import {
    Row,
    Col,
    Form,
    Input,
    Select,
    Radio,
    message
} from "antd"

import {levelOptions} from "../../../util/options";
// 标记规则优先级
const FormItem = Form.Item
const Option = Select.Option
const RadioGroup = Radio.Group;

class WarehouseOrder extends Component {
    constructor(props) {
        super(props);
    }

    formItemLayout = {
        labelCol: {span: 8},
        wrapperCol: {span: 16}
    }
    componentWillReceiveProps(next){
        let markupData = next.markupData
        if(markupData !== this.props.markupData){
            let params = {}
            if(markupData.markType !== undefined){
                params.markType = markupData.markType
            }
            if(markupData.isUserNumberPool !== undefined){
                params.isUserNumberPool = markupData.isUserNumberPool
            }
            if(markupData.numberPoolType !== undefined){
                
                params.numberPoolType = markupData.numberPoolType
            }
            this.props.form.setFieldsValue(params)
        }
    }
    
    limitSelectedAccounts = {
        value:null,
        length:10,
    }
    onChange =(value,str = "渠道")=>{
        if(value && (value.length>this.limitSelectedAccounts.length)){
            let index = value.indexOf(this.limitSelectedAccounts.value)
            value.splice(index,1)
            return message.warning(`${str}最多可以选择${this.limitSelectedAccounts.length}个`)
        }
    }
    onSelect =(value)=>{
        this.limitSelectedAccounts.value = value
    }
    render() {
        const ChannelCodearr = this.props.commonSelectData.newChannelCode || []
        const ServiceCodearr = this.props.commonSelectData.newServiceCode || []
        const channelOption = ChannelCodearr.map(v => {
            return (
                <Option key={v.id} value={v.id}
                >
                    {v.name}
                </Option>
            )
        })
        const serviceOption = ServiceCodearr.map(v => {
            return (
                <Option key={v.value} value={v.value}
                >
                    {v.name}
                </Option>
            )
        })
        const {markupData} = this.props
        var {getFieldDecorator,getFieldsValue} = this.props.form;
        var {markType,isUserNumberPool,numberPoolType} = getFieldsValue(["markType","isUserNumberPool","numberPoolType"]);
        if(numberPoolType === undefined && markupData.numberPoolType === 2){
            numberPoolType = 2
        }
        if(numberPoolType === undefined && markupData.numberPoolType === 3){
            numberPoolType = 3
        }
        const formItemLayout =  this.formItemLayout;
        return (
            <div className="newCluenk">
                <div className="title">执行动作</div>
                <div className="content">
                    <Row>
                        <Col span={18} offset={2} >
                            <FormItem {...formItemLayout} label="标记动作" >
                                {getFieldDecorator('markType', {
                                        rules: [{required: true, message: '标记动作为必选'}], 
                                        initialValue: markupData.markType || 0
                                    },
                                )(
                                    <RadioGroup>
                                        <Radio value={0}>自动标记</Radio>
                                        <Radio value={1}>手动标记</Radio>
                                    </RadioGroup>
                                )}
                            </FormItem>
                        </Col>
                        {
                            markType === 0 ?
                            (
                                <div>
                                    <Col span={18} offset={2} >
                                        <FormItem {...formItemLayout} label="是否使用号码池" >
                                            {getFieldDecorator('isUserNumberPool', {
                                                    rules: [{required: true, message: '是否使用号码池为必选'}], 
                                                    initialValue: markupData.isUserNumberPool || 0
                                                },
                                            )(
                                                <RadioGroup>
                                                    <Radio value={0}>是</Radio>
                                                    <Radio value={1}>否</Radio>
                                                </RadioGroup>
                                            )}
                                        </FormItem>
                                    </Col>
                                    {
                                        isUserNumberPool === 0 || isUserNumberPool === undefined ?
                                        <div>
                                            <Col span={18} offset={8} >
                                                <FormItem {...formItemLayout}>
                                                    {getFieldDecorator('numberPoolType', {
                                                            initialValue: markupData.numberPoolType || 0
                                                        },
                                                    )(
                                                        <RadioGroup>
                                                            <Radio value={0}>优先使用外部</Radio>
                                                            <Radio value={1}>优先使用内部</Radio>
                                                        </RadioGroup>
                                                        
                                                    )}
                                                </FormItem>
                                            </Col>
                                            
                                            <Col span={18} offset={8} >
                                                <FormItem {...formItemLayout}>
                                                    {getFieldDecorator('numberPoolType')(
                                                        <RadioGroup>
                                                            <Radio value={2}>指定渠道顶替</Radio>
                                                            <Radio value={3}>指定运输方式</Radio>
                                                        </RadioGroup>
                                                        
                                                    )}
                                                </FormItem>
                                            </Col>
                                            
                                            {
                                                numberPoolType === 2 ?
                                                <Col span={12} offset={8} >
                                                    <FormItem >
                                                        {getFieldDecorator('appointChannels', {
                                                                initialValue: markupData.appointChannels || undefined
                                                            },
                                                        )(
                                                            
                                                            <Select 
                                                            mode="multiple"
                                                            onChange={(v)=>this.onChange(v)}
                                                            onSelect={this.onSelect}
                                                            style={{width:"100%"}} 
                                                            placeholder="渠道支持多选">
                                                                {channelOption}
                                                            </Select>
                                                        )}
                                                    </FormItem>
                                                </Col>
                                                : null 
                                            }
                                            {
                                                numberPoolType === 3 ?
                                                <Col span={12} offset={8} >
                                                    <FormItem >
                                                        {getFieldDecorator('appointLogisticsTypes', {
                                                                initialValue: markupData.appointLogisticsTypes || undefined
                                                            },
                                                        )(
                                                            
                                                            <Select 
                                                            mode="multiple"
                                                            onChange={(v)=>this.onChange(v,"运输方式")}
                                                            onSelect={this.onSelect}
                                                            style={{width:"100%"}} 
                                                            placeholder="运输方式支持多选">
                                                                {serviceOption}
                                                            </Select>
                                                        )}
                                                    </FormItem>
                                                </Col>
                                                : null 
                                            }
                                        </div>
                                        : null
                                    }
                                </div>
                                
                            )
                            : null
                        }
                        
                    </Row>
                </div>
            </div>

        );
    }
}

export default WarehouseOrder
