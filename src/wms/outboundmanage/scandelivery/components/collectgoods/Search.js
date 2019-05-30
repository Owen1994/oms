import React from 'react';
import {
    Col, Row, Form, Input,
} from 'antd';
import CSelect from '../../../../../components/cselect';
import { LOGISTICS_CHANNEL, GET_MAIN_PERMISSION_WAREHOUSE } from '../../../../common/constants/Api';
import { DELIVERY_STATUS, IS_AGGREGATION } from '../../constants/Table';


const FormItem = Form.Item;
const SearchInput = Input.Search;
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
        const typeSearch = (
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
                                    url={GET_MAIN_PERMISSION_WAREHOUSE}
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
                            {getFieldDecorator('logisticsChannel', {
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
                            label="交运状态:"
                        >
                            {getFieldDecorator('deliveryStatus', {
                                initialValue: '',
                            })(
                                <CSelect
                                    list={DELIVERY_STATUS}
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
                            label="是否合并:"
                        >
                            {getFieldDecorator('isAggregation', {
                                initialValue: '',
                            })(
                                <CSelect
                                    list={IS_AGGREGATION}
                                    placeholder="请选择"
                                    handleChange={this.onSubmit}
                                />,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="运单号:"
                        >
                            {getFieldDecorator('waybillNo', {
                                initialValue: '',
                                rules: [{
                                    required: false,
                                    message: '请输入',
                                }],
                            })(
                                <SearchInput
                                    placeholder="请输入内容"
                                    enterButton="搜索"
                                    onSearch={this.onSubmit}
                                />,
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );
        return (
            <div className="white wms-search erp-search">
                {typeSearch}
            </div>
        );
    }
}
