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
    GET_EBAY_SITE,
    SEARCH_EBAY_ACCOUNT,
} from '../constants/Api'
import { ORDER_TYPE } from '../constants/index'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Search = Input.Search;
const RangePicker = DatePicker.RangePicker;

export default class SearchComponent extends React.Component {

    // 用于设置时间的一些数据
    orderTime = {
        range: []
    };

    rangeConfig = {
        rules: [{ type: 'array', required: false, message: '请选择' }],
    };

    // 禁用日期范围
    disabledDate = (current) => {
        const { range } = this.orderTime;
        if (range.length === 1) {
            let nowRange = moment(range[0]);
            if (current < nowRange.subtract(1, "months").add(1, "days")) {
                return true
            }
            nowRange = moment(range[0]);
            if (current > nowRange.add(1, "months").subtract(1, "days")) {
                return true
            }
        }
        return current && current > moment().endOf('day');
    };

    orderTimeChange = (arr) => {
        this.orderTime.range = arr
    };

    // 重置
    resetFields = () => {
        this.props.form.resetFields();
        this.props.form.setFieldsValue({ orderTimes: [] });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { handleSubmit } = this.props;

        const selectSearch =  (
            <div className="search_select">
                <Row type="flex" align="middle">
                        <Col span={8}>
                            <FormItem
                                label="站点"
                            >
                                {getFieldDecorator('site')(
                                    <CSelect
                                        code='ebSiteCode' // 列表编码字段
                                        name='ebSiteCode' // 列表名称字段
                                        url={GET_EBAY_SITE}
                                        params={{
                                            data: {
                                                searchColumn: 'name',
                                                pageData: 50,
                                                pageNumber: 1
                                            }
                                        }}
                                        apiListType={1}
                                        placeholder={'请选择'}
                                        localSearch={1}
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8} className="multiple">
                            <FormItem
                                label="销售账号"
                            >
                                {getFieldDecorator('account')(
                                    <CSelect
                                        code='label'
                                        name='label'
                                        url={SEARCH_EBAY_ACCOUNT}
                                        mode='multiple'
                                        maxCount={20}
                                        params={{
                                            data: {
                                                searchColumn: 'name',
                                                pageData: 30,
                                                pageNumber: 1
                                            }
                                        }}
                                        apiListType={1}
                                        placeholder={'请选择'}
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem
                                label="下单时间"
                            >
                                {getFieldDecorator('orderTimes',{
                                    ...this.rangeConfig,
                                    initialValue: [moment().startOf('day').subtract(1, 'months'), moment().endOf('day')]
                                })(
                                    <RangePicker
                                        showTime={{
                                            hideDisabledOptions: true,
                                            defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
                                        }}
                                        format="YYYY-MM-DD HH:mm"
                                        placeholder={['开始日期', '结束日期']}
                                        onCalendarChange={this.orderTimeChange}
                                        disabledDate={this.disabledDate}
                                        allowClear={false}
                                    />
                                )}
                            </FormItem>
                        </Col>
                </Row>
                <Row type="flex" align="middle">
                        <Col span={8}>
                            <FormItem
                                label="付款时间"
                            >
                                {getFieldDecorator('paymentTimes', this.rangeConfig)(
                                    <RangePicker
                                        showTime={{
                                            hideDisabledOptions: true,
                                            defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
                                        }}
                                        format="YYYY-MM-DD HH:mm"
                                        placeholder={['开始日期', '结束日期']}
                                        onCalendarChange={this.orderTimeChange}
                                        disabledDate={this.disabledDate}
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem
                                label="抓单时间"
                            >
                                {getFieldDecorator('orderCacheTimes', this.rangeConfig)(
                                    <RangePicker
                                        showTime={{
                                            hideDisabledOptions: true,
                                            defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
                                        }}
                                        format="YYYY-MM-DD HH:mm"
                                        placeholder={['开始日期', '结束日期']}
                                        onCalendarChange={this.orderTimeChange}
                                        disabledDate={this.disabledDate}
                                    />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
            </div>
        );

        const typeSearch = (
            <div className="search_content">
                <FormItem
                    label="搜索内容"
                >
                    {getFieldDecorator('searchType', {
                        initialValue: 1,
                    })(
                        <RadioGroup size="small">
                            <Radio value={1}>平台单号</Radio>
                            <Radio value={2}>跟踪号</Radio>
                            <Radio value={3}>买家账号</Radio>
                            <Radio value={4}>销售记录号</Radio>
                        </RadioGroup>
                    )}
                </FormItem>
                <div className="content_right">
                    {getFieldDecorator('searchContents', {
                        rules: [{
                            required: false,
                            message: `请输入`
                        }],
                    })(
                        <Search
                            placeholder="双击可批量查询"
                            enterButton="搜索"
                            onDoubleClick={() => this.props.toggleModal()}
                            onSearch={() => this.props.handleSubmit()}
                        />
                    )}
                    <Button
                        type="default"
                        onClick={() => this.props.onReset()}
                    >
                        重置
                    </Button>
                </div>
            </div>
        );

        const ctageSearch = (
            <div className="search_tag">
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="创建类型"
                        >
                            {getFieldDecorator('createType', {
                                initialValue: [0]
                            })(
                                <Ctags
                                    list={ORDER_TYPE}
                                    handleChange={() => handleSubmit()}
                                />
                            )}
                        </FormItem>
                    </Col>
                </Row>
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
