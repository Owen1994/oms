import React from 'react';
import {
    Form,
    Input,
    Button,
    Select,
    Row,
    Col,
    Radio,
    DatePicker,
} from 'antd';
import CSelect from '@/components/cselect';
import { all, allList } from '../../common/json';

import {
    // selectable,
    sendState,
    searchTypeState,
} from '../constants/index';
import Tab from '../../common/tab';
import {
    GET_PLATFORM_API,
    GET_SENDINFMODE_API,
} from '../constants/Api';
import moment from 'moment';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;

export default class SearchComponent extends React.Component {
    // 不变的值；用于 板块切换时  不清除当前值；
    immutableData = [];

    // 禁用日期范围
    disabledDate = current => current && current > moment().endOf('day');

    selectFilter = (v, option) => {
        const { children, value } = option.props;
        v = v && v.trim();
        if (children.includes(v) || value.includes(v)) return true;
    }

    getSelecte = (currentData) => {
        if (!currentData || !currentData.length) return null;
        const { getFieldDecorator } = this.props.form;
        return currentData.map((val) => {
            const {
                list = [],
                isUsing,
                condition_code,
                condition_name,
            } = val;
            if (!isUsing) return null;
            return (
                <Col key={condition_code} span={8}>
                    {condition_code !== 'shippingTimeRange'
                        ? (
                            <FormItem
                                label={condition_name}
                            >
                                {getFieldDecorator(condition_code, {
                                    initialValue: all.key,
                                })(
                                    <Select
                                        showSearch
                                        placeholder="请选择"
                                        filterOption={this.selectFilter}
                                    >
                                        {
                                            list.map(v => (
                                                <Option key={v.key} value={v.key}>{v.label}</Option>
                                            ))
                                        }
                                    </Select>,
                                )}
                            </FormItem>
                        ) : (
                            <FormItem
                                label='发货时间'
                            >
                                {getFieldDecorator(condition_code)(
                                    <RangePicker
                                        format="YYYY-MM-DD"
                                        disabledDate={this.disabledDate}
                                        placeholder={['开始日期', '结束日期']}
                                    />,
                                )}
                            </FormItem>
                        )}
                </Col>
            );
        })
            .filter(v => v);
    }

    getConfiguration = (value) => {
        if (value === all.key) return;
        const { activePlate } = this.props;
        const { queryConfigurationAsync } = this.props;
        queryConfigurationAsync({
            plate: activePlate,
            platformId: value,
        });
    }

    completeCallback = (list) => {
        if (list && Array.isArray(list) && !list.includes(all)) {
            list.unshift(all);
        }
        return list;
    }

    render() {
        const {
            getConfiguration,
        } = this;
        const { activePlate, changeTab, autoreplyDtailList } = this.props;
        const { getFieldDecorator, getFieldsValue } = this.props.form;
        const loading = autoreplyDtailList && autoreplyDtailList.loading;
        const {
            configurationData,
            plateList,
            handleSubmit,
        } = this.props;
        const searchPart = this.getSelecte(configurationData);
        let { platformId } = getFieldsValue(['platformId']);
        if (platformId === all.key) {
            platformId = undefined;
        }
        const typeSearch = (
            <div className="typeSearch">
                <Row type="flex" align="middle">
                    <Col span={24}>
                        <div className="typeSearch-l">
                            <FormItem label="搜索内容">
                                {getFieldDecorator('searchType', {
                                    initialValue: 1,
                                })(
                                    <RadioGroup size="small">
                                        {
                                            searchTypeState.map(v => (<Radio key={v.key} value={v.key}>{v.label}</Radio>))
                                        }
                                    </RadioGroup>,
                                )}
                            </FormItem>
                            <div className="selectSearch position-relative">
                                <FormItem>
                                    {getFieldDecorator('searchContent', {
                                        rules: [{
                                            required: false,
                                            message: '请输入',
                                        }],
                                    })(
                                        <Input placeholder="请输入查询内容" style={{ width: 280 }} className='submit-btn-pd' />
                                    )}
                                </FormItem>
                                <div className="customer-submit-btns customer-submit-md-btns">
                                    <Button loading={loading} type='primary' onClick={() => handleSubmit(1, 20, activePlate)}>搜索</Button>
                                    <Button onClick={this.props.onReset} className='customer-reset-btn'>重置</Button>
                                </div>
                            </div>
                            {/* <div className="typeSearch-r" style={{ left: '465px' }}>
                                {getFieldDecorator('searchContent', {
                                    rules: [{
                                        required: false,
                                        message: '请输入',
                                    }],
                                })(
                                    <Search
                                        placeholder="请输入查询内容"
                                        enterButton="搜索"
                                        size="large"
                                        style={{ width: 280 }}
                                        onSearch={() => handleSubmit(1, 20, activePlate)}
                                    />,
                                )}
                                <Button className="autoreply-detial-sreach-reset" type="default" onClick={() => this.props.onReset()}>
                                    重置
                                </Button>
                            </div> */}
                        </div>

                    </Col>
                </Row>
            </div>
        );
        const selectSearch = (
            <div className="selectSearch autoreply-detail-search">
                <Row key="1" type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="适用平台"
                        >
                            {getFieldDecorator('platformId', {
                                initialValue: all.key,
                            })(
                                <CSelect
                                    list={allList}
                                    handleFilter={this.completeCallback}
                                    code="key" // 列表编码字段
                                    name="label" // 列表名称字段
                                    url={GET_PLATFORM_API}
                                    params={{ applicableTempId: activePlate }} // 搜索参数
                                    apiListType={0}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                    placeholder="请选择"
                                    onChange={getConfiguration}
                                />,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="发送状态"
                        >
                            {getFieldDecorator('sendingState', {
                                initialValue: all.key,
                            })(
                                <Select placeholder="请选择">
                                    {
                                        sendState.map(v => (
                                            <Option key={v.key} value={v.key}>{v.label}</Option>
                                        ))
                                    }
                                </Select>,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="发送方式"
                        >
                            {getFieldDecorator('sendType', {
                                initialValue: all.key,
                            })(
                                <CSelect
                                    list={allList}
                                    handleFilter={this.completeCallback}
                                    code="key" // 列表编码字段
                                    name="label" // 列表名称字段
                                    url={GET_SENDINFMODE_API}
                                    // formType={1}  // 表单数据类型，不填就是默认值，填1返回对象label
                                    params={{
                                        platformId,
                                        applicableTempId: activePlate,
                                    }} // 搜索参数
                                    placeholder="请选择发送方式"
                                    apiListType={0}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                    disabled={!platformId || !activePlate}
                                />,
                            )}
                        </FormItem>
                    </Col>
                </Row>
                {
                    searchPart ? (
                        <Row key="2" type="flex" align="middle" className="autoreply-detail-search-row">
                            {searchPart}
                        </Row>
                    ) : null
                }
            </div>
        );
        return (
            <div className="autoreply-detial-search">
                <Form>
                    <div className="select-type">
                        <Tab onClick={changeTab} list={plateList} defaultValue={activePlate} />
                        {selectSearch}
                        {typeSearch}
                    </div>
                </Form>
            </div>
        );
    }
}
