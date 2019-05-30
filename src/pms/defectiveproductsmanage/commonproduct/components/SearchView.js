import React from 'react';
import {
    Form, Radio, Button, DatePicker, Input, Row, Col,
} from 'antd';
import {
    Defective_Prdouct_Source_List,
    Defective_Prdouct_State_List,
    PROCESSING_MODE,
    Processing_Type_List,
} from '../constants/index';
import CSelect from '../../../../components/cselect';
import { Order_People_Name_Api, Get_Warehouse_List_Api, ORDER_DETAIL_SUPPLIER_LIST } from '../constants/Api';
import { getLoginmsg,hasPerssion } from '../../../../util/baseTool';
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

    list = [{ key: getLoginmsg().userName, label: getLoginmsg().personName }];

    WarehouseList = [{ key: 0, label: '全部' }];

    render() {
        const { getFieldDecorator } = this.props.form;
        const isSupplier = !hasPerssion('010-000005-000001-005', this.props);
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
                            label="不良品来源"
                            style={{ marginBottom: '10px' }}
                        >
                            {getFieldDecorator('source', {
                                initialValue: 0,
                            })(
                                <CSelect
                                    code="code" // 列表编码字段
                                    name="name" // 列表名称字段
                                    list={Defective_Prdouct_Source_List}
                                    placeholder="请选择"
                                />,
                            )}
                        </FormItem>
                    </Col>

                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="处理状态"
                            style={{ marginBottom: '10px' }}
                        >
                            {getFieldDecorator('state', {
                                initialValue: 0,
                            })(
                                <CSelect
                                    code="code" // 列表编码字段
                                    name="name" // 列表名称字段
                                    list={Defective_Prdouct_State_List}
                                    placeholder="请选择"
                                />,
                            )}
                        </FormItem>
                    </Col>

                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="质检时间"
                            style={{ marginBottom: '10px' }}
                        >
                            {getFieldDecorator('qualityInspectionTime', {
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
                            label="仓库"
                            style={{ marginBottom: '10px' }}
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
                            label="采购员"
                            style={{ marginBottom: '10px' }}
                        >
                            {getFieldDecorator('buyer', {
                                initialValue: userName,
                            })(
                                <CSelect
                                    code="key" // 列表编码字段
                                    name="label" // 列表名称字段
                                    url={Order_People_Name_Api}
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
                            label="处理方式"
                            style={{ marginBottom: '10px' }}
                        >
                            {getFieldDecorator('processingMode', {
                                initialValue: 0,
                            })(
                                <CSelect
                                    code="code" // 列表编码字段
                                    name="name" // 列表名称字段
                                    list={PROCESSING_MODE}
                                    placeholder="请选择"
                                />,
                            )}
                        </FormItem>
                    </Col>

                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="处理类型"
                        >
                            {getFieldDecorator('processingType', {
                                initialValue: 0,
                            })(
                                <CSelect
                                    code="code" // 列表编码字段
                                    name="name" // 列表名称字段
                                    list={Processing_Type_List}
                                    placeholder="请选择"
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
                                        initialValue: 1,
                                    })(
                                        <RadioGroup size="small">
                                            <Radio value={1}>SKU</Radio>
                                            <Radio value={2}>采购单号</Radio>
                                            {/* <Radio value={3}>供应商</Radio> */}
                                            <Radio value={4}>异常编码</Radio>
                                        </RadioGroup>
                                        )}
                                </FormItem>
                                <div className="typeSearch-r">
                                    {getFieldDecorator('searchContents', {})(
                                        <Input
                                            placeholder="双击可批量查询"
                                            size="large"
                                            style={{ width: 270 }}
                                            onDoubleClick={() => this.props.showModal()}
                                        />,
                                    )}

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
            <div className="select-type white">
                <Form layout="horizontal">
                    {searchView}
                </Form>
            </div>
        );


    }
}
