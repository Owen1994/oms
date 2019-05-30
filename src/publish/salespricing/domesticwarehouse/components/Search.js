import React from 'react';
import { Form, Input, InputNumber, Row, Col, Button, message } from 'antd';
import CSelect from '@/components/cselect';

import { fetchPost } from "../../../../util/fetch";
import { GET_PLATFORM, GET_RULES, GET_PROFIT_RATE } from '../constants';

const TextArea = Input.TextArea;
const FormItem = Form.Item;

class Search extends React.Component {
    state = {
    }

    ruleChange = (value) => {
        const { platformCode } = this.state;
        const data = { platform: platformCode, ruleId: value };
        fetchPost(GET_PROFIT_RATE, { data })
            .then(data => {
                if(data && data.state === "000001") {
                    const res = data.data;
                    this.props.form.setFieldsValue({ 'profitsRate': res.profitsRate });
                }
            })
    }

    platformChange = (value) => {
        this.setState({ platformCode: value });
    }

    render() {
        const { platformCode } = this.state;
        const { btnDisabled } = this.props;
        const { basicRule, platform, profitsRate, skus } = this.props.pricingStatesReducer;
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const searchForm = (
            <div className="selectSearch">
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="平台"
                        >
                            {getFieldDecorator('platformCode', {
                                rules: [{required: true, message: '请选择平台'}],
                                initialValue: platform.length > 0 ? platform[0].code : '',
                            })(
                                <CSelect
                                    list={platform}
                                    // handleFilter={this.completeCallback}
                                    code="code" // 列表编码字段
                                    name="name" // 列表名称字段
                                    url={GET_PLATFORM}
                                    params={{
                                        data: {
                                            modelName: 'platformList',
                                            searchColumn: "name"
                                        }
                                    }} // 搜索参数
                                    apiListType={0}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                    onChange={this.platformChange}
                                    placeholder="请选择平台"
                                    localSearch={1}
                                />,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem
                            label="售价计算规则"
                        >
                            {getFieldDecorator('basicId', {
                                rules: [{required: true, message: '请选择售价计算规则'}],
                                initialValue: basicRule.length > 0 ? basicRule[0].key : '',
                            })(
                                <CSelect
                                    disabled={!getFieldValue('platformCode')}
                                    list={basicRule}
                                    // handleFilter={this.completeCallback}
                                    code="key" // 列表编码字段
                                    name="label" // 列表名称字段
                                    url={GET_RULES}
                                    params={{
                                        data: {
                                            platform: platformCode,
                                            searchColumn: "ruleName"
                                        }
                                    }} // 搜索参数
                                    apiListType={0}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                    placeholder="请选择售价计算规则"
                                    onChange={this.ruleChange}
                                    localSearch={1}
                                />,
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" align="middle">
                    <Col span={24}>
                        <FormItem
                            label="利润率(%)"
                        >
                            {getFieldDecorator('profitsRate', {
                                rules: [{required: true, message: '请输入利润率'}],
                                initialValue: profitsRate,
                            })(
                                <InputNumber min={0} precision={2}  placeholder="请输入利润率" />,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={24} className='margin-sm-top'>
                        <FormItem
                            label="SKU"
                        >
                            {getFieldDecorator('skus', {
                                rules: [{required: true, message: '请输入SKU'}],
                                initialValue: skus,
                            })(
                                <TextArea
                                    autosize={{ minRows: 6, maxRows: 6 }}
                                    placeholder='请输入SKU，多个换行输入，支持复合SKU'
                                />,
                            )}
                        </FormItem>
                    </Col>
                    <div className='domestic-submit-btn'>
                        <Button disabled={btnDisabled} className='noselect-type-btn' type='primary' onClick={() => this.props.onSubmit()}>计算</Button>
                        <Button disabled={btnDisabled} onClick={() => this.props.onReset()}>重置</Button>
                    </div>
                </Row>
            </div>
        )
        return (
            <div className="search breadcrumb overflow-hidden">
                <div className="yks-erp-search_order">
                    <Form layout="inline">
                        <div className="select-type pdt-none">
                            {searchForm}
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}
export default Form.create()(Search);
