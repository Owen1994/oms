import React from 'react';
import {
    Form, Radio, Button, DatePicker, Input, Row, Col,
} from 'antd';

import CSelect from '../../../../components/cselect';
import { PAY_METHOD_B, Order_Query_People_Name } from '../constants/Api';
import { getLoginmsg, hasPerssion } from '../../../../util/baseTool';
import { Order_Query_State_Api, Get_Warehouse_List_Api,ORDER_DETAIL_SUPPLIER_LIST  } from '../constants/Api';
import moment from 'moment';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RangePicker = DatePicker.RangePicker;


const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 13 },
};

/**
 * 头部搜索组件
 */
export default class SearchView extends React.Component {

    list = [{key: getLoginmsg().userName, label: getLoginmsg().personName}];

    listState = [{key: 0, label: '全部'}];

    WarehouseList = [{key: 0, label: '全部'}];
    PAYTYPE = [{key: 0, label: '全部'}]

    render() {
        const { getFieldDecorator } = this.props.form;

        const isShwoMerchandiser = !hasPerssion('010-000003-000005-005', this.props);
        const isShwoOpEmployee = !hasPerssion('010-000003-000005-006', this.props);
        const isSupplier = !hasPerssion('010-000003-000005-013', this.props);
        const userName = getLoginmsg().userName;
        const classParams = {
            data: {
                businessLines: '1',
                pageData: 20,
                pageNumber: 1,
                procurementType: '2',
                searchColumn: 'name',
            },
        };

        const searchView = (
            <div>
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="订货员"
                            style={{marginBottom: '10px'}}
                        >
                            {getFieldDecorator('opEmployee', {
                                initialValue: userName,
                            })(
                                <CSelect
                                    disabled={isShwoOpEmployee}
                                    code="key" // 列表编码字段
                                    name="label" // 列表名称字段
                                    url={Order_Query_People_Name}
                                    list={this.list}
                                    isNotCache
                                    params={classParams} // 搜索参数
                                    placeholder="请选择"
                                />,
                            )}
                        </FormItem>
                    </Col>

                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="跟单员"
                            style={{marginBottom: '10px'}}
                        >
                            {getFieldDecorator('merchandiser', {
                                initialValue: userName,
                            })(
                                <CSelect
                                    disabled={isShwoMerchandiser}
                                    code="key" // 列表编码字段
                                    name="label" // 列表名称字段
                                    url={Order_Query_People_Name}
                                    list={this.list}
                                    isNotCache
                                    params={classParams} // 搜索参数
                                    placeholder="请选择"
                                />,
                            )}
                        </FormItem>
                    </Col>

                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="采购单状态"
                            style={{marginBottom: '10px'}}
                        >
                            {getFieldDecorator('purchaseState', {
                                initialValue: '全部',
                            })(
                                <CSelect
                                    code="key" // 列表编码字段
                                    name="label" // 列表名称字段
                                    url={Order_Query_State_Api}
                                    isNotCache
                                    list={this.listState}
                                    placeholder="请选择"
                                />,
                            )}
                        </FormItem>
                    </Col>

                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="仓库"
                            style={{marginBottom: '10px'}}
                        >
                            {getFieldDecorator('warehouse', {
                                initialValue: 0,
                            })(
                                <CSelect
                                    code='key' // 列表编码字段
                                    name='label' // 列表名称字段
                                    url={Get_Warehouse_List_Api}
                                    list={this.WarehouseList}
                                    apiListType={0}
                                    placeholder={'请选择'}
                                    isNotCache
                                />,
                            )}
                        </FormItem>
                    </Col>

                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="付款方式"
                            style={{marginBottom: '10px'}}
                        >
                            {getFieldDecorator('payType', {
                                initialValue: '全部',
                            })(
                                <CSelect
                                    code="key" // 列表编码字段
                                    name="label" // 列表名称字段
                                    url={PAY_METHOD_B}
                                    placeholder="请选择"
                                    list={this.PAYTYPE}
                                />,
                            )}
                        </FormItem>
                    </Col>

                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="打印时间"
                            style={{marginBottom: '10px'}}
                        >
                            {getFieldDecorator('printTimes', {
                                rules: [{ type: 'array', required: false, message: '请选择时间' }],
                            })(
                                <RangePicker
                                showTime={{
                                    hideDisabledOptions: true,
                                    defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
                                }}
                                style={{ width: 270 }}
                                />,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="创建时间"
                        >
                            {getFieldDecorator('creationTime', {
                                rules: [{ type: 'array', required: false, message: '请选择时间' }],
                            })(
                                <RangePicker
                                showTime={{
                                    hideDisabledOptions: true,
                                    defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
                                }}
                                style={{ width: 270 }}
                                />,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="供应商"
                        >
                            {getFieldDecorator('supplier', {
                            })(
                                <CSelect
                                    disabled={isSupplier}
                                    list={this.props.item}
                                    code="key"
                                    name="name"
                                    url={ORDER_DETAIL_SUPPLIER_LIST}
                                    params={{
                                        data: {
                                            searchColumn: 'name',
                                            pageData: 20,
                                            pageNumber: 1,
                                        },
                                    }} // 搜索参数
                                    apiListType={0}
                                    formType={0}
                                    placeholder="请选择"
                                />,
                            )}
                        </FormItem>

                    </Col>

                    <Col span={24}>
                        <div className="typeSearch">
                            <div className="typeSearch-l">
                                <FormItem
                                    label="搜索类型"
                                >
                                    {getFieldDecorator('searchType', {
                                        initialValue: '1',
                                    })(
                                        <RadioGroup size="small">
                                            <Radio value={'1'}>采购单号</Radio>
                                            {/* <Radio value={'2'}>供应商</Radio> */}
                                            <Radio value={'3'}>SKU</Radio>
                                        </RadioGroup>
                                    )}
                                </FormItem>
                                <div className="typeSearch-r">
                                    {
                                        getFieldDecorator('searchContents', {})(
                                            <Input
                                                placeholder="双击可批量查询"
                                                size="large"
                                                style={{ width: 270 }}
                                                onDoubleClick={() => this.props.showModal()}
                                            />,
                                        )
                                    }

                                    <Button
                                        type="primary"
                                        onClick={() => this.props.onSearch(1, 20)}
                                    >
                                        搜索
                                    </Button>
                                    <Button
                                        type="default"
                                        onClick={() => this.props.resetFields()}
                                    >
                                        重置
                                    </Button>
                                </div>
                            </div>
                        </div>

                    </Col>
                </Row>
            </div>
        );

        return (
            <div className="select-type orderquery-search">
                <Form layout="horizontal">
                    {searchView}
                </Form>
            </div>
        );


    }
}
