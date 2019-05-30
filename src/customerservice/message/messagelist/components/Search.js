import React from 'react';
import moment from 'moment';
import {
    Form, Button, Radio, Input, DatePicker, Row, Col, Select, message,
} from 'antd';
// import Screen from './Screen';
// import TextSearch from '../../../../components/TextSearch';
// import BtnSearch from '../../../../components/BtnSearch';
// import { fromJS } from 'immutable';
import { messageTypeList, messageStatusList, labelTypeInitList } from '../constants';
import Functions from '../../../../components/functions';
import Ctags from '@/components/ctags';

const Option = Select.Option;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Search = Input.Search;
const RangePicker = DatePicker.RangePicker;

let a;

export default class SearchCom extends React.Component {
    // 用于设置时间的一些数据
    orderTime = {
        range: [],
    }

    defualtTime = [moment().startOf('day'), moment().endOf('day')]

    // defualtTime1 = [moment().subtract(5, 'day').startOf('day'), moment().endOf('day')]

    // 禁用日期范围
    disabledDate = current => current && current > moment().endOf('day')


    // orderTimeChange = (arr) => {
    //     console.log(arr);
    //     // this.orderTime.range = arr;
    //     if (arr.length === 2) {
    //         return false;
    //     }
    // }

    onDateChange = (value) => {
        const { operateType, form } = this.props;
        const curretnTab = operateType === '1';
        const dateField = curretnTab ? 'messageDate' : 'emailDate';
        const preDate = form.getFieldValue(dateField);
        setTimeout(() => {
            const values = JSON.parse(JSON.stringify(value));
            const start = moment(values[0]);
            const end = moment(values[1]);
            if (end - start >= 60 * 24 * 60 * 60 * 1000) {
                message.warning('时间跨度不能超过两个月');
                form.setFieldsValue({ [dateField]: preDate });
            }
        }, 100);
    }

    messageStatusChange = (key) => {
        const { handleStatusChange } = this.props;
        handleStatusChange(key && key[0]);
    }

    labelTypeChange = (key) => {
        const { handleLabelChange } = this.props;
        handleLabelChange(key);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { operateType, onSubmit, listReducer } = this.props;
        const { loading } = this.props.listReducer;
        // true 站内信 ；  false 买家邮件；
        const curretnTab = operateType === '1';
        const statusList = curretnTab ? listReducer.data.messageStatusList : listReducer.data.emailStatusList;
        const labelTypeList = listReducer.data.tagList || [];
        const postType = curretnTab ? 'messageDate' : 'emailDate';
        const postStatus = curretnTab ? 'messageStatus' : 'emailStatus';
        const selectSearch = (
            <div className="selectSearch">
                <Row type="flex" align="middle">
                    {
                        curretnTab ? (
                            <Col span={8}>
                                <FormItem
                                    label="类型"
                                >
                                    {getFieldDecorator('messageType', {
                                        initialValue: 1,
                                    })(
                                        <Select
                                            style={{ width: '100%' }}
                                            onChange={() => onSubmit()}
                                        >
                                            {
                                                messageTypeList.map(v => (<Option value={v.code} key={v.code}>{v.name}</Option>))
                                            }
                                        </Select>,
                                    )}
                                </FormItem>
                            </Col>
                        ) : null
                    }
                    <Col span={8}>
                        <FormItem
                            label="接收日期"
                        >
                            {getFieldDecorator(postType, {
                                // initialValue: curretnTab ? this.defualtTime : this.defualtTime1,
                                initialValue: this.defualtTime,
                            })(
                                <RangePicker
                                    disabledDate={this.disabledDate}
                                    format="YYYY-MM-DD"
                                    placeholder={['开始日期', '结束日期']}
                                    style={{ width: 270 }}
                                    allowClear={false}
                                    // onCalendarChange={this.orderTimeChange}
                                    onChange={this.onDateChange}
                                />,
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );
        const typeSearch = (
            <div className="typeSearch">
                <Row type="flex" align="middle">
                    <Col span={24}>
                        <div className="typeSearch-l">
                            <FormItem label="搜索类型">
                                {getFieldDecorator('searchType', {
                                    initialValue: 1,
                                })(
                                    <RadioGroup size="small">
                                        <Radio value={1}>卖家账号</Radio>
                                        <Radio value={2}>{curretnTab ? '买家账号' : '卖家邮箱'}</Radio>
                                        <Radio value={3}>{curretnTab ? '订单编号' : '买家邮箱'}</Radio>
                                        {
                                            curretnTab ? <Radio value={4}>买家昵称</Radio> : <Radio value={5}>邮件标题</Radio>
                                        }
                                    </RadioGroup>,
                                )}
                            </FormItem>
                            <div className="selectSearch position-relative">
                                <FormItem>
                                    {getFieldDecorator('searchContent', {
                                        initialValue: undefined,
                                    })(
                                        <Input placeholder='请输入' style={{ width: 200 }} className='submit-btn-pd' />,
                                    )}
                                </FormItem>
                                <div className="customer-submit-btns customer-submit-sm-btns" style={{ width: 265 }}>
                                    <Button loading={loading} type='primary' onDoubleClick={null} onClick={() => onSubmit(undefined, true)}>搜索</Button>
                                    <Button onClick={this.props.onReset} className='customer-reset-btn'>重置</Button>
                                    <Functions {...this.props} functionkey={curretnTab ? '009-000002-000004-003' : '009-000002-000004-009'}>
                                        <Button className="margin-sm-left" onClick={() => this.props.handleOpenModal('syncVisible')}>{`同步${curretnTab ? '站内信' : '邮件'}`}</Button>
                                    </Functions>
                                </div>
                            </div>
                        </div>

                    </Col>
                </Row>
            </div>
        );
        const ctageSearch = (
            <div className="ctageSearch ptb-5">
                <Row type="flex" align="middle">
                    <Col span={24}>
                        <FormItem
                            label="状态类型"
                        >
                            {getFieldDecorator(postStatus, {
                                initialValue: [5],
                            })(
                                <Ctags
                                    list={(statusList && statusList.length) ? statusList : messageStatusList}
                                    handleChange={this.messageStatusChange}
                                />,
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );
        const labelSearch = !curretnTab ? (
            <div className="ctageSearch" style={{ marginTop: -5, paddingBottom: 5 }}>
                <Row type="flex" align="middle">
                    <Col span={24}>
                        <FormItem
                            label="标签类型"
                        >
                            {getFieldDecorator('tagId', {
                                initialValue: [0],
                            })(
                                <Ctags
                                    list={(labelTypeList && labelTypeList.length) ? labelTypeList : labelTypeInitList}
                                    handleChange={this.labelTypeChange}
                                />,
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </div>
        ) : null;
        const hideFormItem = (
            <FormItem>
                {getFieldDecorator('sortType')(
                    <Input type="hidden" />,
                )}
            </FormItem>
        );
        return (
            <div className="breadcrumb overflow-hidden position-relative" style={{ borderTop: '1px solid #EAE9E9' }}>
                <div className="yks-erp-search_order">
                    <div className="select-type pdt-none">
                        {selectSearch}
                        {typeSearch}
                    </div>
                    {ctageSearch}
                    {labelSearch}
                    {hideFormItem}
                </div>
            </div>
        );
    }
}
