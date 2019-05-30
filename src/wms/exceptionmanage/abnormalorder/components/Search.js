import React from 'react';
import {
    Form, Input, Button, Radio, Row, Col, DatePicker,
} from 'antd';
import moment from 'moment';
import '../../../common/css/index.css';
import CSelect from '../../../../components/cselect';
import {
    EXCEPTION_TYPE, GET_ALL_PERMISSION_WAREHOUSE, LOGISTICS_CHANNEL, MANAGE_STATES,
} from '../../../common/constants/Api';

const RadioGroup = Radio.Group;
const SearchInput = Input.Search;
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
                            label="仓库名称:"
                        >
                            {getFieldDecorator('warehouseCode', {
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
                            label="渠道类型:"
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
                    <Col span={8}>
                        <FormItem
                            label="生成时间:"
                        >
                            {getFieldDecorator('queryTimeline', {
                                initialValue: [moment().startOf('day'), moment().endOf('day')],
                                rules: [{ required: true, message: '请选择时间' }],
                            })(
                                <RangePicker />,
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="异常类型:"
                        >
                            {getFieldDecorator('exceptionType', {
                                initialValue: '',
                            })(
                                <CSelect
                                    list={initialState}
                                    code="code" // 列表编码字段
                                    name="name" // 列表名称字段
                                    url={EXCEPTION_TYPE}
                                    placeholder="请选择"
                                    handleChange={this.onSubmit}
                                />,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="处理状态:"
                        >
                            {getFieldDecorator('manageStates', {
                                initialValue: '',
                            })(
                                <CSelect
                                    list={initialState}
                                    code="code" // 列表编码字段
                                    name="name" // 列表名称字段
                                    url={MANAGE_STATES}
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
            <div className="search_content">
                <Row type="flex" align="middle">
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
            </div>
        );

        return (
            <div className="wms-search breadcrumb erp-search">
                {searchSelect}
                {typeSearch}
            </div>
        );
    }
}
