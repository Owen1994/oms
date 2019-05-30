import React from 'react'
import moment from 'moment';
import {
    Form,
    Input,
    Button,
    Radio,
    DatePicker,
    Row,
    Col,
} from 'antd';
import Ctags from '../../../../../components/ctags'
import CSelect from '../../../../../components/cselect'
import {
    GET_SHOPEE_SITE,
} from '../constants/Api'
import { ORDER_TYPE, DELIVERY_TYPE } from '../constants/index'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Search = Input.Search;
const RangePicker = DatePicker.RangePicker;

export default class SearchComponent extends React.Component {
    // 用于设置时间的一些数据
    orderTime = {
        range: []
    }

    // 禁用日期范围
    disabledDate = (current) => {
        var { range } = this.orderTime
        if (range.length == 1) {
            var nowRange = moment(range[0])
            if (current < nowRange.subtract(1, "months").add(1, "days")) {
                return true
            }
            nowRange = moment(range[0])
            if (current > nowRange.add(1, "months").subtract(1, "days")) {
                return true
            }
        }
        return current && current > moment().endOf('day');
    }

    orderTimeChange = (arr) => {
        this.orderTime.range = arr
    }

    //重置
    resetFields = () => {
        this.props.form.resetFields();
        this.props.form.setFieldsValue({ orderTime: [] });
    };

    handleSubmit = () => {
        const { getList, getParams } = this.props;
        let params = getParams();
        params.pageNumber = 1;
        getList(params)
    }

    render() {
        const { getFieldDecorator, getFieldsValue } = this.props.form;
        const { showCache } = this.props;
        const { handleSubmit } = this;
        const { orderTime, grapTime } = getFieldsValue(["orderTime", "grapTime"])
        const ctageSearch = (
            <div className="search_tag">
                <Row type="flex" align="middle">
                    <Col span={6}>
                        <FormItem
                            label="创建类型"
                        >
                            {getFieldDecorator('createType', {
                                initialValue: showCache.createType ? showCache.createType : [-1]
                            })(
                                <Ctags
                                    list={ORDER_TYPE}
                                    handleChange={handleSubmit}
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="发货类型"
                        >
                            {getFieldDecorator('deliveryType', {
                                initialValue: showCache.deliveryType ? showCache.deliveryType : [-1]
                            })(
                                <Ctags
                                    list={DELIVERY_TYPE}
                                    handleChange={handleSubmit}
                                />
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );
        const selectSearch = (
            <div className="search_select">
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="主账号"
                        >
                            {getFieldDecorator('parentSellerId', {
                                initialValue: showCache.parentSellerId ? showCache.parentSellerId : undefined
                            })(
                                <Input placeholder="请输入主账号" />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="下单时间"
                        >
                            {getFieldDecorator('orderTime', {
                                initialValue: showCache.orderTime ? showCache.orderTime : undefined
                            })(
                                <RangePicker
                                    disabledDate={this.disabledDate}
                                    format="YYYY-MM-DD"
                                    placeholder={['开始日期', '结束日期']}
                                    style={{ width: 270 }}
                                    disabled={grapTime && !!grapTime.length}
                                    onCalendarChange={this.orderTimeChange}
                                />
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="站点"
                        >
                            {getFieldDecorator('siteCode', {
                                initialValue: showCache.siteCode ? showCache.siteCode : undefined
                            })(
                                <CSelect
                                    list={showCache.siteCode ? showCache.siteCode : []} // 默认值列表
                                    code='key'
                                    name='key'
                                    url={GET_SHOPEE_SITE}
                                    params={{
                                        data: {
                                            searchColumn: 'name',
                                            pageData: 50,
                                            pageNumber: 1
                                        }
                                    }}
                                    apiListType={3}
                                    placeholder={'请选择'}
                                    localSearch={1}
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="抓单时间"
                        >
                            {getFieldDecorator('grapTime', {
                                initialValue: showCache.grapTime ? showCache.grapTime : undefined
                            })(
                                <RangePicker
                                    disabledDate={this.disabledDate}
                                    format="YYYY-MM-DD"
                                    placeholder={['开始日期', '结束日期']}
                                    style={{ width: 270 }}
                                    disabled={orderTime && !!orderTime.length}
                                    onCalendarChange={this.orderTimeChange}
                                />
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );

        const typeSearch = (
            <div className="search_content">
                <FormItem label="搜索类型">
                    {getFieldDecorator('searchType', {
                        initialValue: showCache.searchType ? showCache.searchType : 1,
                    })(
                        <RadioGroup size="small">
                            <Radio value={1}>销售账号</Radio>
                            <Radio value={2}>订单号</Radio>
                        </RadioGroup>
                    )}
                </FormItem>
                <div className="content_right">
                    {getFieldDecorator('searchContent', {
                        initialValue: showCache.searchContent ? showCache.searchContent : undefined,
                        rules: [{
                            required: false,
                            message: `请输入`
                        }],
                    })(
                        <Search
                            placeholder="双击可批量查询"
                            enterButton="搜索"
                            onDoubleClick={this.props.toggleModal}
                            onSearch={handleSubmit}
                            allowClear
                        />
                    )}
                    <Button type="default" onClick={this.props.onReset}>
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
                    {ctageSearch}
                </Form>
            </div>
        )
    }
}
