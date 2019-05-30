import React from 'react'
import moment from 'moment';
import {
    Form,
    Input,
    Button,
    Radio,
    DatePicker,
    Row,
    Col,
    Select,
    Tooltip,
} from 'antd';
import Ctags from '@/components/ctags';
import CSelect from '@/components/cselect';
import {
    ORDER_SOURCE,
    NEGATIVE_PROFIT,
    IS_REMOTE,
    GET_PACKAGE_WAREHOUSE_DELIVER,
    QUERY_CHANNEL_DATA,
    GET_PACKAGE_STATUS_LIST,
    FIND_STORE_LIST_PUBLIC,
    QUERY_COUNTRL_DATA,
} from '../constants';
import { fetchPost } from '@/util/fetch';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Search = Input.Search;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;

import { setPageCache, getPageCache } from 'util/PageCache';

export default class SearchComponent extends React.Component {
    state = {
        selectOption: 'paymentTime',
        accountSelect: true, // 销售账号搜索类型
    }

    componentDidMount () {
        this.setDefaultTime();
        getPageCache().then((params) => {
            if(params && params.formData['grabTime']){
                this.hadnleSelect('grabTime');
            }
        })
    };

    // 设置默认时间
    setDefaultTime = () => {
        let { setFieldsValue } = this.props.form;
        let end = moment().endOf('day').valueOf();
        let start = moment().subtract(30, 'day').startOf('day').valueOf();
        let momentData = [moment(start), moment(end)] || [];
        setFieldsValue({ "range-time": momentData });
    };

    // 过滤销售账号脏数据
    handleAccountFilter = (list) => {
        var result = [], hash = {};
        for (var i = 0, elem; (elem = list[i]) != null; i++) {
            if (!hash[elem.id]) {
                result.push(elem);
                hash[elem.id] = true;
            }
        }
        return result;
    };

    // 处理付款时间及抓单时间下拉事件
    hadnleSelect = (value) => {
        this.setState({ selectOption: value }, () => {
            if (value === 'paymentTime') {
                this.setDefaultTime();
            }
        });
    };

    handleSearch = () => {
        // 刷新列表
        this.props.onSearch();
        setTimeout(() => {
            // 请求订单状态数据
            const params = this.props.filterParams();
            this.props.getStatus(params);
        }, 300);
    }

    // 切换销售账号批量输入
    toggleBatchInput = () => {
        const { getFieldValue, setFieldsValue } = this.props.form;
        const { accountSelect } = this.state;
        const saleAccountId = getFieldValue('account');
        if(saleAccountId && !Array.isArray(saleAccountId)){
            setFieldsValue({
                account: saleAccountId.split(',')
            });
        } else if(!saleAccountId && !Array.isArray(saleAccountId)) {
            setFieldsValue({
                account: []
            });
        }
        this.setState({ accountSelect: !accountSelect });
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        const { selectOption, accountSelect } = this.state;

        const { dicSaleAccount, warehouseState, paramePlatformId, handleChange, toggleModal, toggleModal2 } = this.props;

        const select = (
            <Select
                defaultValue="paymentTime"
                className="order-search-labelSelect"
                size="small"
                style={{ width: 74 }}
                onChange={this.hadnleSelect}
                value={selectOption}
            >
                <Option key={1} value="paymentTime">付款时间</Option>
                <Option key={2} value="grabTime">抓单时间</Option>
            </Select>
        );

        const payment = selectOption === 'paymentTime' ? (
            getFieldDecorator('range-time')(
                <RangePicker
                    style={{width: 270}}
                    showTime={{
                        hideDisabledOptions: true,
                        defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
                    }}
                    format="YYYY-MM-DD HH:mm"
                    placeholder={['开始日期', '结束日期']}
                />
            )
        ) : null;

        const grap = selectOption === 'grabTime' ? (
            getFieldDecorator('grabTime')(
                <RangePicker
                    style={{width: 270}}
                    showTime={{
                        hideDisabledOptions: true,
                        defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
                    }}
                    format="YYYY-MM-DD HH:mm"
                    placeholder={['开始日期', '结束日期']}
                />
            )
        ) : null;

        const selectSearch = (
            <div className="selectSearch">
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="销售平台"
                        >
                            {getFieldDecorator('platformName', {
                                initialValue: dicSaleAccount ? (dicSaleAccount.length > 0 ? dicSaleAccount[0].id : undefined) : undefined,
                            })(
                                <CSelect
                                    code='id'
                                    name='name'
                                    apiListType={2}
                                    placeholder={'请选择'}
                                    handleChange={handleChange}
                                    localSearch={1}
                                    list={dicSaleAccount}
                                    formType={1}
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="销售账号"
                            className="order-search-saleAccountId"
                        >
                            {getFieldDecorator('account')(
                                accountSelect ?
                                    <CSelect
                                        code='id'
                                        name='name'
                                        url={FIND_STORE_LIST_PUBLIC}
                                        mode='multiple'
                                        className="order-cselect"
                                        maxCount={100}
                                        params={{
                                            data: {
                                                searchColumn: 'sellerId',
                                                platformCode: paramePlatformId ? paramePlatformId : '',
                                                pageData: 20,
                                                pageNumber: 1,
                                            }}}
                                        apiListType={2}
                                        placeholder={'多选'}
                                        handleFilter={this.handleAccountFilter}
                                    />
                                : <Input onDoubleClick={toggleModal2} placeholder="双击可批量输入" />
                            )}
                            <Tooltip title="点击可切换成批量输入"><a onClick={this.toggleBatchInput}>切换</a></Tooltip>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="国家全称"
                        >
                            {getFieldDecorator('countryId')(
                                <CSelect
                                    code='id'
                                    name='name'
                                    url={QUERY_COUNTRL_DATA}
                                    formType={1}
                                    params={{
                                        searchColumn: 'name',
                                        pageData: 20,
                                        pageNumber: 1
                                    }}
                                    apiListType={2}
                                    placeholder={'请选择'}
                                    localSearch={1}
                                />
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="发货仓库"
                        >
                            {getFieldDecorator('warehouseDeliver')(
                                <CSelect
                                    code='id'
                                    name='name'
                                    url={GET_PACKAGE_WAREHOUSE_DELIVER}
                                    formType={1}
                                    params={{
                                        searchColumn: 'name',
                                        pageData: 20,
                                        pageNumber: 1
                                    }}
                                    apiListType={2}
                                    placeholder={'请选择'}
                                    localSearch={1}
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="物流渠道"
                        >
                            {getFieldDecorator('logisticsBusiness')(
                                <CSelect
                                    code='id'
                                    name='name'
                                    url={QUERY_CHANNEL_DATA}
                                    params={{
                                        searchColumn: 'name',
                                        pageData: 20,
                                        pageNumber: 1,
                                    }}
                                    formType={1}
                                    localSearch={1}
                                    apiListType={2}
                                    placeholder={'请选择'}
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="老ERP状态"
                        >
                            {getFieldDecorator('erpStatus')(
                                <CSelect
                                    code='id'
                                    name='name'
                                    url={GET_PACKAGE_STATUS_LIST}
                                    params={{ searchColumn: 'name' }}
                                    formType={1}
                                    apiListType={2}
                                    placeholder={'请选择'}
                                    localSearch={1}
                                />
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem 
                            label={select}
                        >
                            {payment}
                            {grap}
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
                                label="搜索内容"
                            >
                                {getFieldDecorator('searchType', {
                                    initialValue: 1,
                                })(
                                    <RadioGroup size="small">
                                        <Radio value={1}>平台单号</Radio>
                                        <Radio value={7}>包裹单号</Radio>
                                        <Radio value={2}>YKS单号</Radio>
                                        <Radio value={5}>物流跟踪号</Radio>
                                        <Radio value={6}>审核人</Radio>
                                        {/* <Radio value={8}>固定电话</Radio>
                                        <Radio value={9}>移动电话</Radio>
                                        <Radio value={10}>邮编</Radio> */}
                                    </RadioGroup>
                                    )}
                            </FormItem>
                            <div className="typeSearch-r" style={{left: 530}}>
                                {getFieldDecorator('searchContent', {
                                        rules: [{
                                            required: false,
                                            message: `请输入`
                                        }],
                                    })(
                                        <Search
                                            placeholder="双击可批量查询"
                                            enterButton="搜索"
                                            size="large"
                                            style={{ width: 280 }}
                                            onDoubleClick={() => toggleModal()}
                                            onSearch={() => this.handleSearch()}
                                            allowClear
                                        />
                                    )}
                                     <Button type="default" onClick={() => this.props.onReset()}>
                                        重置
                                    </Button>
                            </div>
                        </div>

                    </Col>
                </Row>
            </div>
        );

        const ctageSearch = (
            <div className="ctageSearch" style={{padding: '10px 0'}}>
                <Row>
                    <Col span={8}>
                        <FormItem
                            label="订单来源"
                        >
                            {getFieldDecorator('orderType', {
                                initialValue: ['']
                            })(
                                <Ctags
                                    list={ORDER_SOURCE}
                                    handleChange={() => this.props.onSearch()}
                                />
                                )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="是否负利润"
                        >
                            {getFieldDecorator('isProfit', {
                                initialValue: ['']
                            })(
                                <Ctags
                                    list={NEGATIVE_PROFIT}
                                    handleChange={() => this.props.onSearch()}
                                />
                                )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="是否偏远"
                        >
                            {getFieldDecorator('isFaraway', {
                                initialValue: ['']
                            })(
                                <Ctags
                                    list={IS_REMOTE}
                                    handleChange={() => this.props.onSearch()}
                                />
                                )}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <FormItem
                            label="分仓状态"
                            { ...{labelCol: {span: 4}, wrapperCol: {span: 20}}}
                        >
                            {getFieldDecorator('warehouseState', {
                                initialValue: ['']
                            })(
                                <Ctags
                                    list={warehouseState}
                                    handleChange={() => this.props.onSearch()}
                                />
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );


        return (
            <div className="breadcrumb deliveryparcellist-search">
                <Form>
                    <div className="select-type">
                        {selectSearch}
                        {typeSearch}
                    </div>
                    {ctageSearch}
                </Form>
            </div>
        )
    }
}
