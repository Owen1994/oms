
import React, {Component} from 'react'
import {
    Row,
    Col,
    Form,
    Input,
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
    handlePlatSelect = (val) => {
        this.props.selectPlatform(val);
    }
    render() {
        var {getFieldDecorator} = this.props.form;
        const formItemLayout =  this.formItemLayout;
        var {platformData,markupData} =this.props;
        return (
            <div className="newCluenk">
                <div className="content">
                    <Row>
                        <Col span={18} offset={2} >
                            <FormItem {...formItemLayout} label="规则名称" >
                                {getFieldDecorator('ruleName', {
                                        rules: [{required: true, message: '规则名称不能为空'}],
                                        initialValue: markupData.ruleName || undefined
                                    },
                                )(
                                    <Input placeholder="请输入规则名称"/>
                                )}
                            </FormItem>
                            <FormItem >
                                {getFieldDecorator('ruleId', {
                                        initialValue: markupData.id || undefined
                                    },
                                )(
                                    <Input type="hidden"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={18} offset={2} >
                            <FormItem {...formItemLayout} label="优先级" >
                                {getFieldDecorator('priority', {
                                        rules: [{required: true, message: '优先级不能为空'}], 
                                        initialValue: markupData.priority || undefined
                                    },
                                )(
                                    <Select style={{width:"100%"}} placeholder="请选择优先级">
                                        {levelOptions('标记规则优先级').map(v => {
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
                        <Col span={18} offset={2} >
                            <FormItem {...formItemLayout} label="销售平台" >
                                {getFieldDecorator('platform', {
                                        rules: [{required: true, message: '规则名称不能为空'}], 
                                        initialValue: markupData.platform || undefined
                                    },
                                )(
                                    
                                    <Select style={{width:"100%"}} placeholder="请选择销售平台" onSelect={this.handlePlatSelect}>
                                        {platformData.map(v => {
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
                        <Col span={18} offset={2} >
                            <FormItem {...formItemLayout} label="状态" >
                                {getFieldDecorator('status', {
                                        rules: [{required: true, message: '规则名称不能为空'}], 
                                        initialValue: markupData.status || 0
                                    },
                                )(
                                    <RadioGroup>
                                        <Radio value={0}>启用</Radio>
                                        <Radio value={1}>停用</Radio>
                                    </RadioGroup>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                </div>
            </div>

        );
    }
}

export default WarehouseOrder
