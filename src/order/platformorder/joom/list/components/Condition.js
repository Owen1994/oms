/**
 * 作者: wj
 * 描述: joom条件查询组件
 * 时间: 2018/4/18 20:23
 **/
import React, { Component } from 'react'

import {
    Form,
    Input,
    Button,
    Row,
    Col,
    DatePicker,
    InputNumber,
    Radio,
    Select,
} from 'antd'
import CSelect from '@/components/cselect';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RangePicker = DatePicker.RangePicker;
const Search = Input.Search;
const Option = Select.Option;

class Condition extends Component {

    getDataList = () => {
        const { getParams, getList } = this.props;
        const data = getParams();
        data.pageNumber = 1;
        getList(data)
    }

    reset = () => {
        const { resetFields } = this.props.form;
        resetFields()
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        const selectSearch =  (
            <div className="search_select">
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="创建类型"
                        >
                            {getFieldDecorator('creationType', {
                                initialValue: 0
                            })(
                                <Select>
                                    <Option key={0} value={0}>全部</Option>
                                    <Option key={1} value={1}>线上订单</Option>
                                    <Option key={2} value={2}>手工订单</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="平台佣金"
                        >
                            {getFieldDecorator('platformCommission', {
                                initialValue: 0
                            })(
                                <Select>
                                    <Option key={0} value={0}>全部</Option>
                                    <Option key={1} value={1}>5%</Option>
                                    <Option key={2} value={2}>15%</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="付款时间"
                        >
                        {getFieldDecorator('paymentTime')(
                            <RangePicker
                                placeholder={['开始日期', '结束日期']}
                            />
                        )}
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="店铺账号"
                        >
                            {getFieldDecorator('salesAccount')(
                                <Input placeholder="多个账号使用英文逗号隔开，最大支持20个" />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="订单金额"
                        >
                            {getFieldDecorator('orderAmount1')(
                                <InputNumber
                                    min={0}
                                    precision={2}
                                    placeholder="请输入"
                                    style={{ width: 120 }}
                                />
                            )}
                            <span className="joom-money-separate">~</span>
                            {getFieldDecorator('orderAmount2')(
                                <InputNumber
                                    min={0}
                                    precision={2}
                                    placeholder="请输入"
                                    style={{ width: 120 }}
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="抓单时间"
                        >
                            {getFieldDecorator('grabTime')(
                                <RangePicker
                                    placeholder={['开始日期', '结束日期']}
                                />
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="国家"
                        >
                            {getFieldDecorator('buyerCountry')(
                                <CSelect
                                    code='id'
                                    name='name'
                                    url="/oms/order/manage/motan/CommonBasicsDataApi/queryCountrlData"
                                    apiListType={2}
                                    placeholder={'请选择'}
                                    localSearch={1}
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="发货截止日期"
                        >
                            {getFieldDecorator('shipDeadlineTime')(
                                <RangePicker
                                    placeholder={['开始日期', '结束日期']}
                                />
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );

        const typeSearch = (
            <div className="search_content">
                <FormItem label="搜索内容"
                >
                    {getFieldDecorator('searchType', {
                        initialValue: 0,
                    })(
                        <RadioGroup size="small">
                            <Radio value={0}>平台订单号</Radio>
                            <Radio value={1}>交易号</Radio>
                            <Radio value={2}>平台SKU</Radio>
                            <Radio value={3}>跟踪号</Radio>
                        </RadioGroup>
                    )}
                </FormItem>
                <div className="content_right">
                    {getFieldDecorator('searchContents')(
                        <Search
                            placeholder="双击可批量查询"
                            enterButton="搜索"
                            onDoubleClick={() => this.props.toggleModal()}
                            onSearch={() => this.getDataList()}
                            allowClear
                        />
                    )}
                    <Button type="default" onClick={() => this.reset()}>
                        重置
                    </Button>
                </div>
            </div>
        );

        return (
            <div className="erp-search">
                <Form>
                    {selectSearch}
                    {typeSearch}
                </Form>
            </div>
        );
    }
}

export default Form.create()(Condition)
