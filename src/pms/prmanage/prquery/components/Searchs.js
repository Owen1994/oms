import React from 'react';
import {
    Form,
    Input,
    DatePicker,
    Button,
    Radio,
    Row,
    Col,
} from 'antd';
import moment from 'moment';
import CTags from '../../../../components/ctags';
import CSelect from '../../../../components/cselect';
import { getLoginmsg, hasPerssion } from '../../../../util/baseTool';
import {
    PRSTATE,
    PURCHASE_ORDER_DETAIL_STATE,
    Get_Warehouse_List_Api,
    Order_Query_People_Name,
} from '../constants';
import '../css/newSearch.css';
/**
 *作者: chenlin
 *功能描述: PR搜索
 *时间: 2018/10/27 11:55
 */
const RangePicker = DatePicker.RangePicker;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;

export default class SearchComponent extends React.Component {

    // componentDidMount() {
    //     this.setDefaultTime();
    // }

    WarehouseList = [{ key: 0, label: '全部' }];
    list = [{ key: getLoginmsg().userName, label: getLoginmsg().personName }];

    // 设置计划上传时间默认时间
    // setDefaultTime = () => {
    //     const { setFieldsValue } = this.props.form;
    //     const end = moment().endOf('day').valueOf();
    //     const start = moment().subtract(6, 'day').startOf('day').valueOf();
    //     const momentData = [moment(start), moment(end)] || [];
    //     setFieldsValue({ planUploadTimes: momentData });
    // }

    handleChange = () => {
        this.props.onSearch();
    };

    render() {

        const { getFieldDecorator } = this.props.form;
        const time = this.props.form.getFieldValue('planUploadTimes');
        const rangeConfig = {
            rules: [{ type: 'array', required: false, message: 'Please select time!' }],
        };
        const isShwoMerchandiser = !hasPerssion('010-000002-000001-005', this.props);
        const isShwoOpEmployee = !hasPerssion('010-000002-000001-004', this.props);
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
                <Row style={{ marginTop: '5px' }}>
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
                        <FormItem label="订单SKU状态"
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
                 </Row>   
                <Row style={{ marginTop: '5px'}}>    
                    <Col span={8}>
                        <FormItem
                            label="计划上传时间"
                        >
                            {getFieldDecorator('planUploadTimes', rangeConfig)(
                                <RangePicker
                                    showTime={{
                                        hideDisabledOptions: true,
                                        defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
                                    }}
                                    format="YYYY-MM-DD HH:mm"
                                    placeholder={['开始日期', '结束日期']}
                                    style={{ width: 270 }}
                                    type={time}
                                />,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="需求日期"
                        >
                            {getFieldDecorator('demandTimes', rangeConfig)(
                                <RangePicker
                                    showTime={{
                                        hideDisabledOptions: true,
                                        defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
                                    }}
                                    format="YYYY-MM-DD"
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
                                />
                                )}
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );

        const typeSearch = (
            <div
                className="typeSearch"
                style={{ marginTop: '5px' }}
            >
                <div
                    className="typeSearch-l"
                >
                    <FormItem label="搜索类型"
                    >
                        {getFieldDecorator('searchType', {
                            initialValue: 1,
                        })(
                            <RadioGroup size="small">
                                <Radio
                                    value={1}
                                    style={{ fontSize: "12px" }}
                                >
                                    PR单号
                                    </Radio>
                                <Radio
                                    value={2}
                                    style={{ fontSize: "12px" }}
                                >
                                    计划员
                                    </Radio>
                                <Radio
                                    value={3}
                                    style={{ fontSize: "12px" }}
                                >
                                    SKU
                                    </Radio>
                            </RadioGroup>
                            )}
                    </FormItem>
                    <div>
                        {getFieldDecorator('searchContents', {
                            rules: [{
                                required: false,
                                message: `请输入`
                            }],
                        })(
                            <Input
                                placeholder="双击可批量查询"
                                style={{ width: 280 }}
                                size="large"
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
            </div>
        );

        const ctageSearch = (
            <div className="ctageSearch">
                <Row>
                    <Col span={10}>
                        <FormItem
                            label="PR执行状态"
                        >
                            {getFieldDecorator('prState', {
                                initialValue: [0],
                            })(
                                <CTags
                                    list={PRSTATE}
                                    handleChange={this.handleChange}
                                />,
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );

        return (
            <div className="breadcrumb">
                <div className="select-type">
                    {selectSearch}
                    {typeSearch}
                </div>
                {ctageSearch}
            </div>
        );
    }
}
