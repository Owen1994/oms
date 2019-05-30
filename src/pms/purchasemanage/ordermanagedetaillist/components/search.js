
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
import CSelect from '../../../../components/cselect';
import { inquireOPEmployeeUrl, PUBLIC_INFORMATION_PAYMENTMETHOD } from '../constants';
import { getLoginmsg, hasPerssion } from '../../../../util/baseTool';
import moment from 'moment';
import {timestampFromat} from '../../../../util/moment';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;


export default class SearchComponent extends Component {

    // list = [{key: getLoginmsg().userName, label: getLoginmsg().personName}];

   
    render() {
        const { getFieldDecorator } = this.props.form;
        // const userName = getLoginmsg().userName;
        const { urlData }  = this.props;
        const isShwoOeEmployee = !hasPerssion('010-000003-000001-000001-005', this.props);

        const selectSearch = (
            <div className="selectSearch">
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="订货员"
                        >
                            {getFieldDecorator('oeEmployee', {
                                initialValue: urlData ? urlData.oeEmployee : 0,
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
                                />,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="采购开发"
                        >
                            {getFieldDecorator('purchaseDevelop', {
                                 initialValue: urlData ? urlData.purchaseDevelop : 0,
                            })(
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
                                />,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="需求日期：">
                            {getFieldDecorator('demandTimes',{
                                 initialValue: urlData ? (urlData.demandTimes ? (urlData.demandTimes.length !== 0 ? [moment(timestampFromat(urlData.demandTimes[0], 'yyyy/mm/dd'), 'YYYY/MM/DD'), moment(timestampFromat(urlData.demandTimes[1], 'yyyy/mm/dd'), 'YYYY/MM/DD')] : undefined) : undefined) : undefined,
                            })(
                                <RangePicker style={{ width: 270 }} />,
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
                                     initialValue: urlData ? (urlData.searchType ? urlData.searchType : 1) : 1,
                                })(
                                    <RadioGroup size="small">
                                          <Radio
                                              value={1}
                                              style={{fontSize : '12px'}}
                                          >
                                              SKU
                                          </Radio>
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
                                         initialValue: urlData ? (urlData.searchContents ? urlData.searchContents : undefined) : undefined,
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
