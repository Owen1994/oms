
import React, {Component} from 'react'
import {
    Row,
    Col,
    Form,
    message,
    Select,
    Radio,
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

    selectWarning = ()=>{
        var {getFieldsValue} = this.props.form;
        var { numberPoolType,appointChannels } = getFieldsValue(["isPriorityMarkChannel","numberPoolType","appointChannels"]);
        if(numberPoolType === 2 && (appointChannels === undefined || !appointChannels.toString())){
            message.warning("请先选择指定渠道")
        }
    }

    render() {
        var {getFieldDecorator,getFieldsValue} = this.props.form;
        const {markupData} = this.props
        var { isPriorityMarkChannel,numberPoolType,appointLogisticsTypes,appointChannels } = getFieldsValue(["isPriorityMarkChannel","appointLogisticsTypes","numberPoolType","appointChannels"]);
        const formItemLayout =  this.formItemLayout;
        let ChannelCodearr ,
            codearr = this.props.commonSelectData.newChannelCode || [],
            serviceodeArr = this.props.commonSelectData.newServiceCode || [];
        if(numberPoolType === 2 ){
            if(appointChannels === undefined || !appointChannels.toString()){
                ChannelCodearr = []
            }else {
                ChannelCodearr = codearr.filter(v=>{
                    return appointChannels.includes(v.id)
                })
            }
        }else if(numberPoolType === 3){
            if(appointLogisticsTypes === undefined || !appointLogisticsTypes.toString()){
                ChannelCodearr = []
            }else {
                ChannelCodearr = serviceodeArr.filter(v=>{
                    return appointLogisticsTypes.includes(v.value)
                })
                ChannelCodearr = ChannelCodearr.map(v=>{
                    return {
                        name : v.name,
                        id : v.value
                    }
                })
            }
        }else {
            ChannelCodearr = codearr
        }
        return (
            <div className="newCluenk">
                <div className="title">附加执行</div>
                <div className="content">
                    <Row>
                        <Col span={18} offset={2} >
                            <FormItem {...formItemLayout} label="优先标记渠道" >
                                {getFieldDecorator('isPriorityMarkChannel', {
                                        initialValue: markupData.isPriorityMarkChannel || 0
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
                            isPriorityMarkChannel === 0 ?
                            <Col span={16} offset={4} >
                                <Row>
                                    <Col span={7}>
                                        <FormItem>
                                            {getFieldDecorator('priorityChannelOne', {
                                                initialValue: markupData.priorityChannelOne || undefined
                                            },
                                            )(
                                                <Select 
                                                allowClear
                                                onFocus={this.selectWarning} 
                                                style={{width:"100%"}} 
                                                placeholder="优先级1">
                                                    {ChannelCodearr.map(v => {
                                                        return (
                                                            <Option key={v.id} value={v.id}
                                                            >
                                                                {v.name}
                                                            </Option>
                                                        )
                                                    })}
                                                </Select>
                                            )}
                                        </FormItem>
                                    </Col>
                                    <Col span={7} offset={1}>
                                        <FormItem>
                                            {getFieldDecorator('priorityChannelTwo', {
                                                    initialValue: markupData.priorityChannelTwo || undefined
                                                },
                                            )(
                                                
                                                <Select 
                                                allowClear
                                                onFocus={this.selectWarning} 
                                                style={{width:"100%"}} 
                                                placeholder="优先级2">
                                                    {ChannelCodearr.map(v => {
                                                        return (
                                                            <Option key={v.id} value={v.id}
                                                            >
                                                                {v.name}
                                                            </Option>
                                                        )
                                                    })}
                                                </Select>
                                            )}
                                        </FormItem>
                                    </Col>
                                    <Col span={7} offset={1}>
                                        <FormItem>
                                            {getFieldDecorator('priorityChannelThree', {
                                                    initialValue: markupData.priorityChannelThree || undefined
                                                },
                                            )(
                                                <Select 
                                                allowClear
                                                onFocus = {this.selectWarning}
                                                style={{width:"100%"}} 
                                                placeholder="优先级3">
                                                    {ChannelCodearr.map(v => {
                                                        return (
                                                            <Option key={v.id} value={v.id}
                                                            >
                                                                {v.name}
                                                            </Option>
                                                        )
                                                    })}
                                                </Select>
                                            )}
                                        </FormItem>
                                    </Col>
                                </Row>
                            </Col>
                            :null
                        }
                    </Row>
                </div>
            </div>

        );
    }
}

export default WarehouseOrder
