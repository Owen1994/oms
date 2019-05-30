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
import { DOCUMENTAR_SALES_STATE_TYPE_B } from '../constants/index';
import {
    REVIEW_MERCHANDISER_INQUIRE_OP_EMPLOYEE_API_B,
    REVIEW_MERCHANDISER_INQUIRE_MERCHANDISER_API_B,
} from '../constants/Api';
import CSelect from '../../../../components/cselect';
import {getLoginmsg, getUrlParams, hasPerssion} from '../../../../util/baseTool';
import moment from 'moment';
import {timestampFromat} from '../../../../util/moment';

// import Functions from '../../../../components/functions';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RangePicker = DatePicker.RangePicker;

const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 13 },
};

export default class SearchView extends React.Component {
    render() {

        const { urlData }  = this.props;
        const { getFieldDecorator } = this.props.form;
        const isShwoMerchandiser = !hasPerssion('010-000003-000003-000001-004', this.props);

        const classParams1 = {
            data: {
                businessLines: '1',
                pageData: 20,
                pageNumber: 1,
                procurementType: '2',
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
                    <Col span={10} offset={1}>
                        <FormItem
                            {...formItemLayout}
                            label="在售状态"
                            style={{marginBottom: '10px'}}
                        >
                            {getFieldDecorator('salleState', {
                                initialValue: urlData ? urlData.salleState : 0,
                            })(
                                <CSelect
                                    code="code" // 列表编码字段
                                    name="name" // 列表名称字段
                                    list={DOCUMENTAR_SALES_STATE_TYPE_B}
                                    placeholder="请选择"
                                    style={{ width: 270 }}
                                />,
                            )}
                        </FormItem>
                    </Col>

                    <Col span={10}>
                        <FormItem
                            {...formItemLayout}
                            label="跟单员"
                            style={{marginBottom: '10px'}}
                        >
                            {getFieldDecorator('merchandiser', {
                                initialValue: urlData ? (urlData.merchandiser ? urlData.merchandiser[0].key : undefined) : undefined,
                            })(
                                <CSelect
                                    disabled={isShwoMerchandiser}
                                    code="key" // 列表编码字段
                                    name="label" // 列表名称字段
                                    url={REVIEW_MERCHANDISER_INQUIRE_MERCHANDISER_API_B}
                                    params={classParams2} // 搜索参数
                                    placeholder="请选择"
                                    style={{ width: 270 }}
                                    list={urlData ? (urlData.merchandiser ? urlData.merchandiser : undefined) : undefined}
                                    isNotCache
                                />,
                            )}
                        </FormItem>
                    </Col>

                    <Col span={10} offset={1}>
                        <FormItem
                            {...formItemLayout}
                            label="订货员"
                        >
                            {getFieldDecorator('opEmployee', {
                                initialValue: urlData ? (urlData.opEmployee ? urlData.opEmployee[0].key : undefined) : undefined,
                            })(
                                <CSelect
                                    code="key" // 列表编码字段
                                    name="label" // 列表名称字段
                                    url={REVIEW_MERCHANDISER_INQUIRE_OP_EMPLOYEE_API_B}
                                    params={classParams1} // 搜索参数
                                    placeholder="订货员名称"
                                    style={{ width: 270 }}
                                    list={urlData ? (urlData.opEmployee ? urlData.opEmployee : undefined) : undefined}
                                    isNotCache
                                />,
                            )}
                        </FormItem>
                    </Col>

                    <Col span={10}>
                        <FormItem
                            {...formItemLayout}
                            label="预入库时间"
                        >
                            {getFieldDecorator('wareHouseTimes', {
                                rules: [{ type: 'array', required: false, message: '请选择时间' }],
                                initialValue: urlData ? (urlData.wareHouseTimes ? (urlData.wareHouseTimes.length !== 0 ? [moment(timestampFromat(urlData.wareHouseTimes[0], 'yyyy/mm/dd'), 'YYYY/MM/DD'), moment(timestampFromat(urlData.wareHouseTimes[1], 'yyyy/mm/dd'), 'YYYY/MM/DD')] : undefined) : undefined) : undefined,
                            })(
                                <RangePicker
                                    style={{ width: 270 }}
                                />,
                            )}
                        </FormItem>
                    </Col>

                    <Col span={23} offset={1}>
                        <div className="typeSearch">
                            <div className="typeSearch-l">
                                <FormItem
                                    label="搜索类型"
                                >
                                    {getFieldDecorator('searchType', {
                                        initialValue: urlData ? (urlData.searchType ? urlData.searchType : 1) : 1,
                                    })(
                                        <RadioGroup size="small">
                                            <Radio value={1}>SKU</Radio>
                                            <Radio value={3}>采购单号</Radio>
                                        </RadioGroup>
                                    )}
                                </FormItem>
                                <div className="typeSearch-r" style={{left: "250px"}}>
                                    <FormItem>
                                        {getFieldDecorator('searchContents', {
                                            initialValue: urlData ? (urlData.searchContents ? urlData.searchContents : undefined) : undefined,
                                        })(
                                            <Search
                                                placeholder="双击可批量查询"
                                                enterButton="搜索"
                                                size="large"
                                                onDoubleClick={() => this.props.showModal()}
                                                onSearch={() => this.props.onSearch()}
                                                style={{ width: 270 }}
                                            />
                                        )}
                                    </FormItem>
                                    <Button
                                        style={{position: "absolute", top: "4px", marginLeft: '290px'}}
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
