import React from 'react';
import {
    Button,
    Col,
    DatePicker,
    Form,
    Input,
    Radio,
    Row,
} from 'antd';
const Search = Input.Search;
import { DOCUMENTAR_SALES_STATE_TYPE } from '../constants/index';
import {
    REVIEW_MERCHANDISER_INQUIRE_OP_EMPLOYEE_API,
    REVIEW_MERCHANDISER_INQUIRE_MERCHANDISER_API,
    ORDER_DETAIL_SUPPLIER_LIST,
} from '../constants/Api';
import CSelect from '../../../../components/cselect';
import { getLoginmsg, hasPerssion } from '../../../../util/baseTool';
import moment from 'moment';

// import Functions from '../../../../components/functions';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RangePicker = DatePicker.RangePicker;

const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 13 },
};

export default class SearchView extends React.Component {

    list = [{key: getLoginmsg().userName, label: getLoginmsg().personName}];
    listOpEmployee = [{key: '0', label: '全部'}];
    render() {
        const { getFieldDecorator } = this.props.form;

        const isShwoMerchandiser = !hasPerssion('010-000003-000003-002', this.props);
        const isSupplier = !hasPerssion('010-000003-000003-008', this.props);
        const userName = getLoginmsg().userName;

        const classParams1 = {
            data: {
                businessLines: '1',
                pageData: 20,
                pageNumber: 1,
                procurementType: '1',
                searchColumn: 'name',
            },
        };

        const classParams2 = {
            data: {
                businessLines: '1',
                pageData: 20,
                pageNumber: 1,
                searchColumn: 'name',
            },
        };

        const searchView = (
            <div>
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="在售状态"
                            style={{marginBottom: '10px'}}
                        >
                            {getFieldDecorator('salleState', {
                                initialValue: 0,
                            })(
                                <CSelect
                                    code="code" // 列表编码字段
                                    name="name" // 列表名称字段
                                    list={DOCUMENTAR_SALES_STATE_TYPE}
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
                                    url={REVIEW_MERCHANDISER_INQUIRE_MERCHANDISER_API}
                                    params={classParams2} // 搜索参数
                                    placeholder="请选择"
                                    formType={1}
                                    list={this.list}
                                    isNotCache
                                />,
                            )}
                        </FormItem>
                    </Col>

                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="订货员"
                        >
                            {getFieldDecorator('opEmployee', {
                                initialValue: '0',
                            })(
                                <CSelect
                                    code="key" // 列表编码字段
                                    name="label" // 列表名称字段
                                    url={REVIEW_MERCHANDISER_INQUIRE_OP_EMPLOYEE_API}
                                    list={this.listOpEmployee}
                                    isNotCache
                                    params={classParams1} // 搜索参数
                                    placeholder="订货员名称"
                                    formType={1}
                                />,
                            )}
                        </FormItem>
                    </Col>

                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="预入库时间"
                        >
                            {getFieldDecorator('wareHouseTimes', {
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
                                        initialValue: 1,
                                    })(
                                        <RadioGroup size="small">
                                            <Radio value={1}>SKU</Radio>
                                            {/* <Radio value={2}>供应商</Radio> */}
                                            <Radio value={3}>采购单号</Radio>
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
                                        onClick={() => {
                                            this.props.resetFields();
                                        }}
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
            <div className="select-type documentary-detail-search">
                <Form>
                    {searchView}
                </Form>
            </div>
        );
    }
}
