
import React, { Component } from 'react';
import {
    Row,
    Col,
    Form,
    Radio,
    Input,
    Button,
    DatePicker,
} from 'antd';
import CSelect from '../../../../../components/cselect';
import { inquireOPEmployeeUrl, PUBLIC_INFORMATION_PAYMENTMETHOD,ORDER_DETAIL_SUPPLIER_LIST, } from '../../constants';
import { getLoginmsg, hasPerssion } from '../../../../../util/baseTool';
import moment from 'moment';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;


export default class SearchComponent extends Component {

    list = [{key: getLoginmsg().userName, label: getLoginmsg().personName}];

    render() {
        const { getFieldDecorator } = this.props.form;
        const userName = getLoginmsg().userName;
        const isShwoOeEmployee = !hasPerssion('010-000003-000001-002', this.props);
        const isSupplier = !hasPerssion('010-000003-000001-017', this.props);
        const selectSearch = (
            <div className="selectSearch">
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="订货员"
                        >
                            {getFieldDecorator('oeEmployee', {
                                initialValue: userName,
                            })(
                                <CSelect
                                    disabled={isShwoOeEmployee}
                                    code="key" // 列表编码字段
                                    name="label" // 列表名称字段
                                    url={inquireOPEmployeeUrl}
                                    params={{
                                        data: {
                                            searchColumn: 'name',
                                            procurementType: 2,
                                            pageData: 20,
                                            pageNumber: 1,
                                        },
                                    }} // 搜索参数
                                    list={this.list}
                                    isNotCache
                                    formType={1}  // 表单数据类型，不填就是默认值，填1返回对象
                                />,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="采购开发"
                        >
                            {getFieldDecorator('purchaseDevelop', {})(
                                <CSelect
                                    code="key" // 列表编码字段
                                    name="label" // 列表名称字段
                                    url={inquireOPEmployeeUrl}
                                    params={{
                                        data: {
                                            searchColumn: 'name',
                                            procurementType: 1,
                                            pageData: 20,
                                            pageNumber: 1,
                                        },
                                    }} // 搜索参数
                                    placeholder={'请选择'}
                                    formType={1}  // 表单数据类型，不填就是默认值，填1返回对象
                                />,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="需求日期：">
                            {getFieldDecorator('demandTimes')(
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
                   
                </Row>
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="付款方式"
                        >
                            {getFieldDecorator('payType', {
                            })(
                                <CSelect
                                    // list={} // 默认值列
                                    code="key" // 列表编码字段
                                    name="label" // 列表名称字段
                                    url={PUBLIC_INFORMATION_PAYMENTMETHOD}
                                    mode='multiple' // 是否多选
                                    maxCount={10} // 最多选择项数量
                                    // formType={1}  // 表单数据类型，不填就是默认值，填1返回对象
                                    params={{
                                        data: {
                                            searchColumn: 'name',
                                            pageData: 20,
                                            pageNumber: 1,
                                        },
                                    }} // 搜索参数
                                    apiListType={0}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                    placeholder={'多选'}
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
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
                </Row>    
            </div>
        );


        const typeSearch = (
            <div className="typeSearch">
                <Row type="flex" align="middle">
                    <Col span={24}>
                        <div className="typeSearch-l">
                            <FormItem label="搜索类型"
                            >
                                {getFieldDecorator('searchType', {
                                    initialValue: 1,
                                })(
                                    <RadioGroup size="small">
                                          <Radio
                                              value={1}
                                              style={{fontSize : '12px'}}
                                          >
                                              SKU
                                          </Radio>
                                          {/* <Radio
                                              value={2}
                                              style={{fontSize : '12px'}}
                                          >
                                              供应商
                                          </Radio> */}
                                          <Radio
                                              value={3}
                                              style={{fontSize : '12px'}}
                                          >
                                              PR单号
                                          </Radio>
                                    </RadioGroup>
                                    )}
                            </FormItem>
                            <div className="typeSearch-r" style={{left: "235px"}}>
                                {getFieldDecorator('searchContents', {
                                        rules: [{
                                            required: false,
                                            message: `请输入`
                                        }],
                                    })(
                                        <Input
                                            placeholder="双击可批量查询"
                                            size="large"
                                            style={{ width: 280 }}
                                            onDoubleClick={() => this.props.toggleModal()}
                                        />
                                    )}
                                    <Button type="primary" onClick={() => this.props.onSearch()}>
                                        搜索
                                    </Button>
                                    <Button type="default" onClick={this.props.onReset}>
                                        重置
                                    </Button>
                            </div>
                        </div>

                    </Col>
                </Row>
            </div>
        );

        return (
            <div className="search breadcrumb">
                <div className="select-type">
                    {selectSearch}
                    {typeSearch}
                </div>
            </div>
        );
    }
}
