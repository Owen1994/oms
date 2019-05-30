import React, {Component} from 'react';

import {
    Form,
    Select,
    Row,
    Col,
    DatePicker,
} from 'antd'

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
import {levelOptions} from '../../../util/options';


class Condition extends Component {
    constructor(props) {
        super(props);
    }

    formItemLayout3 = {
        labelCol: {
            span: 0
        },
        wrapperCol: {
            span: 24
        }
    };

    formItemLayout2 = {
        labelCol: {
            span: 9
        },
        wrapperCol: {
            span: 15
        }
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const platformId = this.props.platformodel.data || []
        const platformIdselect = platformId.map((v, i) => <Option key={i} value={v.id}>{v.name}</Option>)
        return (
            <div className='newCluenk overflow-hidden'>
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <div className="content">
                    <Row>
                        <Col span={5}>
                        <FormItem
                            {...this.formItemLayout2}
                            label="实时指标"
                            className='ant-xs-row padding-sm-right'>
                            {getFieldDecorator('platformId', {
                                    rules: [
                                        {
                                            required: false,
                                            message: `请选择`,
                                            initialValue: ''
                                        }
                                    ]
                                })(
                                <Select className='ant-xs-row'  placeholder="请选择">
                                    {platformIdselect}
                                </Select>
                                )}
                        </FormItem>
                        </Col>

                        <Col span={4}>
                            <FormItem  {...this.formItemLayout3} className='ant-xs-row padding-sm-right'>
                                {getFieldDecorator('authState', {
                                    rules: [
                                        {
                                            required: false,
                                            message: `请选择`
                                        }
                                    ]
                                })(
                                    <Select
                                        className='ant-xs-row'
                                        disabled
                                        placeholder="请选择">
                                        {levelOptions('授权状态').map(item => {
                                            return (
                                                <Option key={item.value} value={item.value}>
                                                    {item.label}
                                                </Option>
                                            )
                                        })}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>

                        <Col span={4}>
                            <FormItem  {...this.formItemLayout3}
                                className='ant-xs-row padding-sm-right'
                            >
                                {getFieldDecorator('authState', {
                                    rules: [
                                        {
                                            required: false,
                                            message: `请选择`
                                        }
                                    ]
                                })(
                                    <Select
                                        className='ant-xs-row'
                                        disabled
                                        placeholder="请选择">
                                        {levelOptions('授权状态').map(item => {
                                            return (
                                                <Option key={item.value} value={item.value}>
                                                    {item.label}
                                                </Option>
                                            )
                                        })}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={5}></Col>
                        <Col span={6}>
                        <FormItem
                            label="最后更新时间:"
                            className='ant-xs-row text-right'
                            >{getFieldDecorator('platformAccount', {
                                rules: [
                                    {
                                        required: false,
                                        message: `请输入`
                                    }
                                ]
                            })(<span>{this.props.ringdataAllmodel.data.updateTime}</span>)}

                            </FormItem>

                        </Col>
                    </Row>
                    </div>
                </Form>
            </div>
        );
    }
}

export default Condition
