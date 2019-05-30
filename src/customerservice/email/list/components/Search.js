import React from 'react';
import {
    Form, Button, Radio, Input, DatePicker, Row, Col, message,
} from 'antd';
import moment from 'moment';
import Ctags from '@/components/ctags';
import { READSTATE, OPTIONSTATE } from '../constants';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
// const Search = Input.Search;
const RangePicker = DatePicker.RangePicker;

class MailSearch extends React.Component {
    state = {
    }

    defualtTime = [moment().startOf('day'), moment().endOf('day')]

    // 用于设置时间的一些数据
    orderTime = {
        range: [],
    }

    // 禁用日期范围
    // disabledDate = (current) => {
    //     const { range } = this.orderTime;
    //     if (range.length === 1) {
    //         let nowRange = moment(range[0]);
    //         if (current < nowRange.subtract(2, 'months').add(1, 'days')) {
    //             return true;
    //         }
    //         nowRange = moment(range[0]);
    //         if (current > nowRange.add(2, 'months').subtract(1, 'days')) {
    //             return true;
    //         }
    //     }
    //     return current && current > moment().endOf('day');
    // }

    // 禁用日期范围
    disabledDate = current => current && current > moment().endOf('day');

    onDateChange = (value) => {
        const { form } = this.props;
        const preDate = form.getFieldValue('emailTime');
        setTimeout(() => {
            const values = JSON.parse(JSON.stringify(value));
            const start = moment(values[0]);
            const end = moment(values[1]);
            if (end - start >= 60 * 24 * 60 * 60 * 1000) {
                message.warning('时间跨度不能超过两个月');
                form.setFieldsValue({ emailTime: preDate });
            }
        }, 100);
    }

    orderTimeChange = (arr) => {
        this.orderTime.range = arr;
    }

    statusChange = () => {
        const { onSubmit } = this.props;
        onSubmit(undefined, true);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { onSubmit, openInfo } = this.props;
        const { loading, readStateList, operateStateList } = this.props.listReducer;
        const readState = (readStateList && readStateList.length) ? readStateList : READSTATE;
        const operateState = (operateStateList && operateStateList.length) ? operateStateList : OPTIONSTATE;
        const selectSearch = (
            <div className="selectSearch">
                <Row type="flex" align="middle">
                    <Col span={12}>
                        <FormItem
                            label="接收日期"
                        >
                            {getFieldDecorator('emailTime', {
                                initialValue: this.defualtTime,
                            })(
                                <RangePicker
                                    disabledDate={this.disabledDate}
                                    format="YYYY-MM-DD"
                                    placeholder={['开始日期', '结束日期']}
                                    style={{ width: 270 }}
                                    allowClear={false}
                                    onChange={this.onDateChange}
                                />,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem label="邮件标题">
                            {getFieldDecorator('emailTitle')(
                                <Input disabled={!openInfo.switch} placeholder='请输入邮件标题' />,
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" align="middle">
                    <Col span={12}>
                        <FormItem label="卖家邮箱">
                            {getFieldDecorator('sellerEmail')(
                                <Input placeholder='请输入卖家邮箱' />,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem label="买家邮箱">
                            {getFieldDecorator('buyerEmail')(
                                <Input placeholder='请输入买家邮箱' />,
                            )}
                        </FormItem>
                    </Col>
                </Row>
                {/* <Row type="flex" align="middle">
                    <Col span={24}>
                        <FormItem label="邮件标题">
                            {getFieldDecorator('emailTitle')(
                                <Input placeholder='请输入邮件标题' />,
                            )}
                        </FormItem>
                    </Col>
                </Row> */}
            </div>
        );
        const typeSearch = (
            <div className="typeSearch">
                <Row type="flex" align="middle">
                    <Col span={24}>
                        <div className="typeSearch-l">
                            <div className="selectSearch position-relative">
                                <FormItem label="卖家账号">
                                    {getFieldDecorator('accountName')(
                                        <Input placeholder='请输入卖家账号' style={{ width: 200 }} className='submit-btn-pd' />,
                                    )}
                                </FormItem>
                                <div className="customer-submit-btns customer-submit-sm-btns" style={{ left: 232 }}>
                                    <Button loading={loading} type='primary' onClick={() => onSubmit(undefined, true)}>搜索</Button>
                                    <Button onClick={this.props.onReset} className='customer-reset-btn'>重置</Button>
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
                            label="读取状态"
                        >
                            {getFieldDecorator('readState', {
                                initialValue: [0],
                            })(
                                <Ctags
                                    list={readState}
                                    handleChange={this.statusChange}
                                />,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={24}>
                        <FormItem
                            label="消息状态"
                        >
                            {getFieldDecorator('optionState', {
                                initialValue: [1],
                            })(
                                <Ctags
                                    list={operateState}
                                    handleChange={this.statusChange}
                                />,
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );
        return (
            <div className="breadcrumb overflow-hidden position-relative" style={{ borderTop: '1px solid #EAE9E9' }}>
                <div className="yks-erp-search_order">
                    <div className="select-type pdt-none">
                        {selectSearch}
                        {typeSearch}
                    </div>
                    {ctageSearch}
                </div>
            </div>
        );
    }
}
export default MailSearch;
