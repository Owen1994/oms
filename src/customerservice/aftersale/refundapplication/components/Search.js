import React from 'react';
import { Form, Button, Row, Col, Radio, InputNumber, DatePicker, Cascader, Input } from 'antd';
import CSelect from '../../../../components/cselect';
import Screen from './Screen';
import { searchType } from '../constants';
import moment from 'moment';

import { GET_REFUNDRESON_LIST } from '../../refundreason/constants';
import { fetchPost } from '../../../../util/fetch';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;

class Search extends React.Component {
    state = {
        options: [],
    }

    // 禁用日期范围
    disabledDate = current => current && current > moment().endOf('day');

    componentDidMount() {
        this.getRefundReasons();
    }

    getRefundReasons = () => {
        const platformId = this.props.form.getFieldValue('platformId');
        fetchPost(GET_REFUNDRESON_LIST, {
            platformId,
            group: '1',
            pageNumber: 1,
            pageData: 10000
        }, 2)
            .then((data) => {
                if (data && data.state === '000001') {
                    this.setState({
                        options: data.data.data,
                    });
                }
            });
    }

    onReset = () => {
        this.props.form.resetFields();
    }

    handleBlur = (type) => {
        const { form } = this.props;
        const refundAmountStart = form.getFieldValue('refundAmountStart');
        const refundAmountEnd = form.getFieldValue('refundAmountEnd');
        if (refundAmountStart > refundAmountEnd) {
            // 结束值输入框失焦
            if (type) {
                form.setFieldsValue({ refundAmountEnd: refundAmountStart });
            }
            // 起始值输入框失焦
            else {
                form.setFieldsValue({ refundAmountStart: refundAmountEnd });
            }
        }
    }

    render() {
        const { refundLoading, listFetch } = this.props;
        const { getFieldDecorator } = this.props.form;
        const { options } = this.state;
        const platformId = this.props.form.getFieldValue('platformId');
        const selectSearch = (
            <div className="selectSearch">
                <Row type="flex" align="middle">
                    <Col span={8} className='refund-account-field'>
                        <FormItem label="卖家账号">
                            {getFieldDecorator('sellerAccount')(
                                <CSelect
                                    // list={LIST_CSELECT} // 默认值列表
                                    placeholder="请选择账号"
                                    code="label" // 列表编码字段
                                    name="label" // 列表名称字段
                                    url="/customerServiceSystem/index/api/Pub/autoReplySellerAccount"
                                    mode="multiple" // 是否多选
                                    // maxCount={3} // 最多选择项数量
                                    // formType={1}  // 表单数据类型，不填就是默认值，填1返回对象
                                    params={{ platformId }} // 搜索参数
                                    // apiListType={2}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                    // handleFilter={this.handleFilter} // 搜索结果过滤
                                    localSearch={1} // 是否开启本地过滤检索，默认为 0 不开启，1为 开启
                                />,
                            )}
                        </FormItem>
                        {/* <div onClick={this.changeSellerSearchType}>切换</div> */}
                    </Col>
                    <Col span={8} className='refund-money-field'>
                        <div className='ant-form-item-label'>退款金额：</div>
                        <FormItem>
                            {
                                getFieldDecorator('refundAmountStart')(
                                    <InputNumber
                                        min={0}
                                        placeholder="请输入起始值"
                                        style={{ width: 110 }}
                                        onBlur={() => this.handleBlur(0)}
                                    />
                                )
                            }
                        </FormItem>
                        <div style={{ paddingRight: 10 }}>~</div>
                        <FormItem>
                            {
                                getFieldDecorator('refundAmountEnd')(
                                    <InputNumber
                                        min={0}
                                        placeholder="请输入结束值"
                                        style={{ width: 110 }}
                                        onBlur={() => this.handleBlur(1)}
                                    />
                                )
                            }
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" align="middle" style={{ marginTop: 0 }}>
                    <Col span={8}>
                        <FormItem label="订单创建时间">
                            {getFieldDecorator('orderTime')(
                                <RangePicker
                                    disabledDate={this.disabledDate}
                                    format="YYYY-MM-DD"
                                    placeholder={['开始日期', '结束日期']}
                                    allowClear={false}
                                />,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="退款原因">
                            {getFieldDecorator('refundReasonId')(
                                <Cascader
                                    fieldNames={{ label: 'category', value: 'categoryId' }}
                                    options={options}
                                    allowClear={false}
                                    placeholder="请选择"
                                    style={{ width: 250 }}
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
                                            searchType.map(v => <Radio key={v.id} value={v.id}>{v.name}</Radio>)
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
                                    <Button loading={refundLoading} type='primary' onClick={() => listFetch()}>搜索</Button>
                                    <Button onClick={this.onReset} className='customer-reset-btn'>重置</Button>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        );
        return (
            <div className="refund-appl-search padding-sm-bottom overflow-hidden">
                <div className="yks-erp-search_order">
                    <div className="select-type pdt-none">
                        {selectSearch}
                        {typeSearch}
                    </div>
                    <Screen {...this.props} />
                </div>
            </div>
        );
    }
}
export default Form.create()(Search);
