import React from 'react';
import moment from 'moment';
import {
    Form,
    Col,
    Row,
    DatePicker,
    Radio,
    Button,
    Input,
} from 'antd';
import CSelect from '../../../../components/cselect';
import { BUSINESSLINE, TAXREBATESTYPE } from '../constants/index';
import {
    PURCHASE_ORDER_DETAIL_STATE,
    PUBLICIN_FORM_ATION_COMPANYMAINBODY,
    Get_Warehouse_List_Api,
    Order_Query_People_Name,
    ORDER_DETAIL_SUPPLIER_LIST,
} from '../constants/Api';
import { getLoginmsg, hasPerssion } from '../../../../util/baseTool';
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const RadioGroup = Radio.Group;

/**
 * @author huangjianfeng
 * @description 搜索
 */
export default class SearchComponent extends React.Component {

    WarehouseList = [{ key: 0, label: '全部' }];

    render() {
        const { getFieldDecorator } = this.props.form;
        const isShwoMerchandiser = !hasPerssion('010-000006-000001-004', this.props);
        const isShwoOpEmployee = !hasPerssion('010-000006-000001-003', this.props);
        const isSupplier = !hasPerssion('010-000006-000001-005', this.props);
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

        const selectSearch = (
            <div className="selectSearch">
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="订货员"
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
                            label="跟单员"
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
                            label="业务线"
                        >
                            {getFieldDecorator('businessLine')(
                                <CSelect
                                    list={BUSINESSLINE} // 默认值列
                                    code='code' // 列表编码字段
                                    name='name' // 列表名称字段
                                    params={{ searchColumn: 'name', pageData: 20, pageNumber: 1 }}
                                    apiListType={0}
                                    placeholder={'请选择'}
                                />
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="订单SKU状态"
                        >
                            {getFieldDecorator('skuState')(
                                <CSelect
                                    code='key' // 列表编码字段
                                    name='label' // 列表名称字段
                                    url={PURCHASE_ORDER_DETAIL_STATE}
                                    params={{ searchColumn: 'name', pageData: 20, pageNumber: 1 }}
                                    apiListType={0}
                                    placeholder={'请选择'}
                                />
                            )}
                        </FormItem>
                    </Col>

                    <Col span={8}>
                        <FormItem
                            label="采购时间"
                        >
                            {getFieldDecorator('purchaseTimes')(
                                <RangePicker
                                    showTime={{
                                        hideDisabledOptions: true,
                                        defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
                                    }}
                                    format="YYYY-MM-DD HH:mm"
                                    placeholder={['开始日期', '结束日期']}
                                    style={{ width: 270 }}
                                />,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="退税类型"
                        >
                            {getFieldDecorator('taxRebatesType')(
                                <CSelect
                                    list={TAXREBATESTYPE} // 默认值列
                                    code='code' // 列表编码字段
                                    name='name' // 列表名称字段
                                    params={{ searchColumn: 'name', pageData: 20, pageNumber: 1 }}
                                    apiListType={0}
                                    placeholder={'请选择'}
                                />
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="公司主体"
                        >
                            {getFieldDecorator('company')(
                                <CSelect
                                    code='key' // 列表编码字段
                                    name='label' // 列表名称字段
                                    url={PUBLICIN_FORM_ATION_COMPANYMAINBODY}
                                    params={{ searchColumn: 'name', pageData: 20, pageNumber: 1 }}
                                    apiListType={0}
                                    placeholder={'请选择'}
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="付款时间"
                        >
                            {getFieldDecorator('payTime')(
                                <RangePicker
                                    showTime={{
                                        hideDisabledOptions: true,
                                        defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
                                    }}
                                    format="YYYY-MM-DD HH:mm"
                                    placeholder={['开始日期', '结束日期']}
                                    style={{ width: 270 }}
                                />,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="仓库"
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
                </Row>
                <Row type="flex" align="middle">
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
                            <FormItem
                                label="搜索类型"
                            >
                                {getFieldDecorator('searchType', {
                                    initialValue: 1,
                                })(
                                    <RadioGroup size="small">
                                        <Radio value={1}>采购单号</Radio>
                                        <Radio value={2}>PR单号</Radio>
                                        {/* <Radio value={3}>订货员</Radio>
                                        <Radio value={4}>跟单员</Radio> */}
                                        <Radio value={5}>供应商ID</Radio>
                                        {/* <Radio value={6}>供应商</Radio> */}
                                        <Radio value={7}>SKU</Radio>
                                    </RadioGroup>,
                                )}
                            </FormItem>
                            <div>
                                {getFieldDecorator('searchContents', {
                                    rules: [{
                                        required: false,
                                        message: '请输入',
                                    }],
                                })(
                                    <Input
                                        placeholder="双击可批量查询"
                                        size="large"
                                        style={{ width: 280 }}
                                        onDoubleClick={() => this.props.toggleModal()}
                                    />,
                                )}
                                <Button type="primary" onClick={() => this.props.onSearch()}>
                                    搜索
                                </Button>
                                <Button type="default" onClick={() => this.props.onReset()}>
                                    重置
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        );

        return (
            <div className="breadcrumb">
                <Form>
                    <div className="select-type">
                        {selectSearch}
                        {typeSearch}
                    </div>
                </Form>
            </div>
        );
    }
}
