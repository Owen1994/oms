import React from 'react';
import {
    Form, Radio, Button, DatePicker, Input, Row, Col,
} from 'antd';
import {
    AL_Order_State_List,
    Detection_State_List,
} from '../constants/index';
import CSelect from '../../../../components/cselect';
import { PO_State_Api, Query_Order_People_Name } from '../constants/Api';
import { getLoginmsg, hasPerssion } from '../../../../util/baseTool';

import moment from 'moment';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Search = Input.Search;
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

    render() {
        const { getFieldDecorator } = this.props.form;

        const isShwoMerchandiser = !hasPerssion('010-000003-000006-003', this.props);

        const isShwoOpEmployee = !hasPerssion('010-000003-000006-002', this.props);
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
                                    url={Query_Order_People_Name}
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
                                    url={Query_Order_People_Name}
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
                            label="采购时间"
                            style={{marginBottom: '10px'}}
                        >
                            {getFieldDecorator('purchaseTimes', {
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
                            label="采购单状态"
                        >
                            {getFieldDecorator('purchaseState', {})(
                                <CSelect
                                    code="key" // 列表编码字段
                                    name="label" // 列表名称字段
                                    url={PO_State_Api}
                                    placeholder="请选择"
                                />,
                            )}
                        </FormItem>
                    </Col>

                    <Col span={8}>
                        <FormItem
                            label="阿里订单状态"
                        >
                            {getFieldDecorator('alOrderState', {
                                initialValue: 'all',
                            })(
                                <CSelect
                                    code="code" // 列表编码字段
                                    name="name" // 列表名称字段
                                    list={AL_Order_State_List}
                                    placeholder="请选择"
                                />,
                            )}
                        </FormItem>
                    </Col>

                    <Col span={8}>
                        <FormItem
                            label="检测状态"
                        >
                            {getFieldDecorator('testStatus', {
                                initialValue: 0,
                            })(
                                <CSelect
                                    code="code" // 列表编码字段
                                    name="name" // 列表名称字段
                                    list={Detection_State_List}
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
                                            <Radio value={1}>采购单号</Radio>
                                            <Radio value={2}>阿里订单号</Radio>
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
                                        onClick={() => this.props.onSearch()}
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
