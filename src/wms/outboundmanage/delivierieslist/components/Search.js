import React from 'react';
import {
    Form, Input, Button, Radio, Row, Col, DatePicker,
} from 'antd';
import moment from 'moment';
import CTags from '../../../../components/ctags';
import { orderType } from '../constants/search';
import '../../../common/css/index.css';
import CSelect from '../../../../components/cselect';
import {
    FREIGHT_FORWARDING, GET_ALL_PERMISSION_WAREHOUSE,
    GET_ORDER_STATUS, LOGISTICS_CHANNEL, PLATFORMS, PREDICT_TYPE,
} from '../../../common/constants/Api';


const RadioGroup = Radio.Group;
const SearchInput = Input.Search;
const InputGroup = Input.Group;
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const initialState = [{ code: '', name: '全部' }];
export default class Search extends React.Component {
    /**
     * 搜索
     */
    onSubmit = () => {
        this.props.onSearchListener();
    };

    /**
     * 重置表单
     */
    reset = () => {
        this.props.form.resetFields();
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const searchSelect = (
            <div className="search_select">
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="发货仓库:"
                        >
                            {getFieldDecorator('shipWarehouse', {
                                initialValue: '',
                            })(
                                <CSelect
                                    list={initialState}
                                    code="code" // 列表编码字段
                                    name="name" // 列表名称字段
                                    url={GET_ALL_PERMISSION_WAREHOUSE}
                                    placeholder="请选择"
                                    handleChange={this.onSubmit}
                                />,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="平台:"
                        >
                            {getFieldDecorator('platforms', {
                                initialValue: '',
                            })(
                                <CSelect
                                    list={initialState}
                                    code="code" // 列表编码字段
                                    name="name" // 列表名称字段
                                    url={PLATFORMS}
                                    placeholder="请选择"
                                    handleChange={this.onSubmit}
                                />,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="物流渠道:"
                        >
                            {getFieldDecorator('channelCategory', {
                                initialValue: '',
                            })(
                                <CSelect
                                    list={initialState}
                                    code="code" // 列表编码字段
                                    name="name" // 列表名称字段
                                    url={LOGISTICS_CHANNEL}
                                    placeholder="请选择"
                                    handleChange={this.onSubmit}
                                />,
                            )}
                        </FormItem>
                    </Col>

                </Row>
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="付款时间:"
                        >
                            {getFieldDecorator('payTime', {
                                initialValue: [moment().startOf('day'), moment().endOf('day')],
                            })(
                                <RangePicker />,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            wrapperCol={{ span: 16 }}
                            label="订单状态:"
                        >
                            {getFieldDecorator('orderStatus', {
                                initialValue: '',
                            })(
                                <CSelect
                                    list={initialState}
                                    code="code" // 列表编码字段
                                    name="name" // 列表名称字段
                                    url={GET_ORDER_STATUS}
                                    placeholder="请选择"
                                    handleChange={this.onSubmit}
                                />,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="货架编号:"
                        >
                            <InputGroup compact>
                                {getFieldDecorator('storageInterval[0]', {
                                    initialValue: '',
                                })(
                                    <Input style={{ width: '45%' }} placeholder="请输入" />,
                                )}
                                <Input
                                    style={{
                                        width: '10%',
                                        borderLeft: 0,
                                        pointerEvents: 'none',
                                        backgroundColor: '#fff',
                                        padding: 0,
                                        textAlign: 'center',
                                    }}
                                    placeholder="~"
                                    disabled
                                />
                                {getFieldDecorator('storageInterval[1]', {
                                    initialValue: '',
                                })(
                                    <Input style={{ width: '45%', borderLeft: 0 }} placeholder="请输入" />,
                                )}
                            </InputGroup>
                        </FormItem>
                    </Col>

                </Row>
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="发货日期:"
                        >
                            {getFieldDecorator('deliverTime', {
                                initialValue: [moment().startOf('day'), moment().endOf('day')],
                            })(
                                <RangePicker />,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            wrapperCol={{ span: 16 }}
                            label="货代"
                        >
                            {getFieldDecorator('freight', {
                                initialValue: '',
                            })(
                                <CSelect
                                    list={initialState}
                                    code="code" // 列表编码字段
                                    name="name" // 列表名称字段
                                    url={FREIGHT_FORWARDING}
                                    placeholder="请选择"
                                    handleChange={this.onSubmit}
                                />,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="预报类型"
                        >
                            {getFieldDecorator('forecastType', {
                                initialValue: '',
                            })(
                                <CSelect
                                    list={initialState}
                                    code="code" // 列表编码字段
                                    name="name" // 列表名称字段
                                    url={PREDICT_TYPE}
                                    placeholder="请选择"
                                    handleChange={this.onSubmit}
                                />,
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );
        const typeSearch = (
            <Row className="search_content">
                <FormItem
                    label="搜索类型"
                >
                    {getFieldDecorator('searchType', {
                        initialValue: 1,
                    })(
                        <RadioGroup size="small">
                            <Radio value={1}>订单号</Radio>
                            <Radio value={2}>SKU</Radio>
                            <Radio value={3}>运单号</Radio>
                            <Radio value={4}>批次号</Radio>
                        </RadioGroup>,
                    )}
                </FormItem>
                <div className="content_right">
                    {getFieldDecorator('searchContent', {
                        rules: [{
                            required: false,
                            message: '请输入',
                        }],
                    })(
                        <SearchInput
                            placeholder="请输入内容"
                            enterButton="搜索"
                            style={{ width: 280 }}
                            onSearch={this.onSubmit}
                        />,
                    )}
                    <Button type="default" onClick={this.reset}>
                        重置
                    </Button>
                </div>
            </Row>
        );
        const searchTags = (
            <Row className="search_tag">
                <Col span={16}>
                    <FormItem
                        label="订单类型:"
                    >
                        {getFieldDecorator('orderType', {
                            initialValue: '',
                        })(
                            <CTags
                                list={orderType}
                                handleChange={this.onSubmit}
                            />,
                        )}
                    </FormItem>
                </Col>
            </Row>
        );
        return (
            <div
                className="wms-search breadcrumb erp-search"
            >
                <Form layout="horizontal">
                    {searchSelect}
                    {typeSearch}
                    {searchTags}
                </Form>
            </div>
        );
    }
}
