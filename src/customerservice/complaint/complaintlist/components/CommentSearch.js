import React from 'react';
import {
    Form, Button, Radio, Input, Row, Col, DatePicker, Select, message,
} from 'antd';
import { COMMENT_STATUS, searchType, COMMENT_TYPE } from '../constants';
import moment from 'moment';
import Ctags from '@/components/ctags';

const Option = Select.Option;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Search = Input.Search;
const RangePicker = DatePicker.RangePicker;

export default class CommentSearch extends React.Component {
    getCommentlist = () => {
        const { getCommentlist } = this.props;
        getCommentlist();
    }

    // 禁用日期范围
    disabledDate = current => current && (current > moment().endOf('day') || current < moment().subtract(90, 'days').startOf('day'))

    // dateField,参数字段名
    handleTimeLimit = (dateField, value) => {
        const { form } = this.props;
        const preDate = form.getFieldValue(dateField);
        setTimeout(() => {
            const values = JSON.parse(JSON.stringify(value));
            const start = moment(values[0]);
            const end = moment(values[1]);
            if (end - start >= 30 * 24 * 60 * 60 * 1000) {
                message.warning('时间跨度不能超过30天');
                form.setFieldsValue({ [dateField]: preDate });
            }
        }, 100);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { commentLoading, commentCount } = this.props;
        let commentlistStatus = COMMENT_STATUS;
        if (commentCount && commentCount.stateNumber) {
            commentlistStatus = commentlistStatus.map((v) => {
                if (!v.code) return v;
                return {
                    code: v.code,
                    name: `${v.name}（${commentCount.stateNumber[v.field]}）`,
                };
            });
        }
        const selectSearch = (
            <div className="selectSearch">
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="评价星级"
                        >
                            {getFieldDecorator('stars', {
                                initialValue: [0],
                            })(
                                <Select
                                    style={{ width: '100%' }}
                                >
                                    {
                                        COMMENT_TYPE.map(v => (<Option value={v.code} key={v.code}>{v.name}</Option>))
                                    }
                                </Select>,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="买家评价日期"
                        >
                            {getFieldDecorator('date', {
                                initialValue: undefined,
                            })(
                                <RangePicker
                                    disabledDate={this.disabledDate}
                                    format="YYYY-MM-DD"
                                    placeholder={['开始日期', '结束日期']}
                                    style={{ width: 270 }}
                                    allowClear={false}
                                    onChange={value => this.handleTimeLimit('date', value)}
                                    // onCalendarChange={this.orderTimeChange}
                                />,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="卖家回复日期"
                        >
                            {getFieldDecorator('sellerReplyTime', {
                                initialValue: undefined,
                            })(
                                <RangePicker
                                    disabledDate={this.disabledDate}
                                    format="YYYY-MM-DD"
                                    placeholder={['开始日期', '结束日期']}
                                    style={{ width: 270 }}
                                    allowClear={false}
                                    onChange={value => this.handleTimeLimit('sellerReplyTime', value)}
                                    // onCalendarChange={this.orderTimeChange}
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
                                        {
                                            searchType.map(v => <Radio value={v.id}>{v.name}</Radio>)
                                        }
                                    </RadioGroup>,
                                )}
                            </FormItem>
                            <div className="selectSearch position-relative">
                                <FormItem>
                                    {getFieldDecorator('searchContent', {
                                        initialValue: undefined,
                                    })(
                                        <Input placeholder='请输入' className='submit-btn-pd' style={{ width: 280 }} />,
                                    )}
                                </FormItem>
                                <div className="customer-submit-btns customer-submit-md-btns">
                                    <Button loading={commentLoading} type='primary' onClick={() => this.getCommentlist()}>搜索</Button>
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
                            label="评价状态"
                        >
                            {getFieldDecorator('status', {
                                initialValue: [1],
                            })(
                                <Ctags
                                    list={commentlistStatus}
                                    handleChange={this.getCommentlist}
                                />,
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );
        return (
            <div className="breadcrumb overflow-hidden position-relative">
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
