/**
 *作者: 魏洁(唐峰)
 *功能描述: 订单管理--全部订单--检索组件
 *参数说明:
 *时间: 2018/5/28 9:57
 */
import React, {Component} from 'react';

import {
    Form,
    Input,
    Button,
    Select,
    Row,
    Col,
    Radio,
    DatePicker,
    Tooltip,
} from 'antd'
import moment from 'moment'

const FormItem = Form.Item
const InputGroup = Input.Group;
const RangePicker = DatePicker.RangePicker;
const RadioGroup = Radio.Group;
const Search = Input.Search;
import {levelOptions} from '@/util/options';
import { getrangetime } from '@/util/baseTool';
import CSelect from '@/components/cselect';
import Ctags from '@/components/ctags';
import { fetchPost } from '@/util/fetch';

// 创建类型，0-全部，1-刷单，2-非刷单
const CTAGS_LIST = [
    {'code': 0, 'name': '全部'},
    {'code': 1, 'name': '是'},
    {'code': 2, 'name': '否'}
];

class Condition extends Component {
    state = {
        selectOption: 'paymentTime',
        accountSelect: true, // 销售账号搜索类型
    }

    componentDidMount () {
        this.setDefaultTime();
    };

    // 设置默认时间
    setDefaultTime = () => {
        const times = getrangetime();
        const momentData = [moment(times.start),moment(times.end)];
        this.props.form.setFieldsValue({"range-time":momentData});
    };

    handleSearch = () => {
        // 刷新列表
        this.props.onSearch();
        setTimeout(() => {
            // 请求订单状态数据
            const params = this.props.filterSearchParams();
            this.props.getStatus(params);
        }, 300);
    }

    // 处理付款时间及抓单时间下拉事件
    hadnleSelect = (value) => {
        this.setState({ selectOption: value }, () => {
            if (value === 'paymentTime') {
                this.setDefaultTime();
            }
        });
    }

    // 切换销售账号批量输入
    toggleBatchInput = () => {
        const { getFieldValue, setFieldsValue } = this.props.form;
        const { accountSelect } = this.state;
        const saleAccountId = getFieldValue('saleAccountId');
        if(saleAccountId && !Array.isArray(saleAccountId)){
            setFieldsValue({
                saleAccountId: saleAccountId.split(',')
            });
        } else if(!saleAccountId && !Array.isArray(saleAccountId)) {
            setFieldsValue({
                saleAccountId: []
            });
        }
        this.setState({ accountSelect: !accountSelect });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const rangeConfig = {
            rules: [{type: 'array', required: false, message: '请选择'}],
        };
        const { exceptionType, paramePlatformId, handleChange, toggleModal, toggleModal2  } = this.props;

        const { selectOption, accountSelect } = this.state;
        const select = (
            <Select
                defaultValue="paymentTime"
                className="order-search-labelSelect"
                size="small"
                style={{ width: 74 }}
                onChange={this.hadnleSelect}
            >
                <Option key={1} value="paymentTime">付款时间</Option>
                <Option key={2} value="grabTime">抓单时间</Option>
            </Select>
        );
        const payment = selectOption === 'paymentTime' ? (
            getFieldDecorator('range-time', rangeConfig)(
                <RangePicker 
                    {...levelOptions('pickerConfig')}
                    style={{width: 270}}
                />
            )
        ) : null;
        const grap = selectOption === 'grabTime' ? (
            getFieldDecorator('grabTime', rangeConfig)(
                <RangePicker
                    {...levelOptions('pickerConfig')}
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

        const  selectSearch = (
            <div className="search_select">
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem label="销售平台"
                            >
                            {getFieldDecorator('platformId')(
                                <CSelect
                                    code='id'
                                    name='name'
                                    url="/oms/order/manage/motan/ICompanyOrderManageApi/getPlatform"
                                    params={{
                                        data: {
                                            searchColumn: 'name',
                                            pageData: 20,
                                            pageNumber: 1
                                        }
                                    }}
                                    apiListType={2}
                                    placeholder={'请选择'}
                                    handleChange={handleChange}
                                    localSearch={1}
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8} className="multiple">
                        <FormItem
                            label="销售账号"
                            className="order-search-saleAccountId"
                        >
                            {getFieldDecorator('saleAccountId')(
                                accountSelect ?
                                    <CSelect
                                        code='id'
                                        name='name'
                                        url="/oms/order/manage/motan/service/api/IOrderManageService/getSellerIds"
                                        mode='multiple'
                                        className="order-cselect"
                                        maxCount={100}
                                        params={{
                                            data: {
                                                searchColumn: 'sellerId',
                                                platformCode: paramePlatformId ? paramePlatformId : '',
                                                pageData: 20,
                                                pageNumber: 1
                                            }
                                        }} // 搜索参数
                                        apiListType={2}
                                        placeholder={'多选'}
                                    />
                                : <Input onDoubleClick={toggleModal2} placeholder="双击可批量输入" />
                            )}
                            <Tooltip title="点击可切换成批量输入"><a onClick={this.toggleBatchInput}>切换</a></Tooltip>
                        
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="国家全称"
                            >
                                {getFieldDecorator('countryId')(
                                    <CSelect
                                        code='id'
                                        name='name'
                                        url="/oms/order/manage/motan/CommonBasicsDataApi/queryCountrlData"
                                        params={{
                                            searchColumn: 'name',
                                            pageData: 20,
                                            pageNumber: 1
                                        }}
                                        apiListType={2}
                                        placeholder={'请选择'}
                                    />
                                )}
                            </FormItem>
                    </Col>
                </Row>
                <Row type="flex" align="middle">
                    <Col  span={8}>
                        <FormItem
                            label="买家账号"
                        >
                            {getFieldDecorator('buyerAccount', {
                                rules: [{
                                    required: false,
                                    message: `请输入`
                                }],
                            })(
                                <Input
                                    placeholder={`请输入`}
                                    maxLength={100}
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                            <FormItem label="订单来源"
                                >
                                {getFieldDecorator('orderTypeId')(
                                    <CSelect
                                        code='id'
                                        name='name'
                                        url="/oms/order/manage/motan/ICompanyOrderManageApi/getType"
                                        params={{
                                            searchColumn: 'name',
                                            pageData: 20,
                                            pageNumber: 1
                                        }} // 搜索参数
                                        apiListType={2}
                                        placeholder={'请选择'}
                                        localSearch={1}
                                    />
                                )}
                            </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="客服"
                            >
                            {getFieldDecorator('customerServiceId')(
                                <CSelect
                                    code='id'
                                    name='name'
                                    url="/oms/order/manage/motan/ICompanyOrderManageApi/getCustomer"
                                    params={{
                                        searchColumn: 'name',
                                        pageData: 20,
                                        pageNumber: 1
                                    }} // 搜索参数
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
                    <Col span={8}>
                        <InputGroup compact>
                            <FormItem
                                label="实付金额" className="widthAll"
                            >
                            {getFieldDecorator('paymentMin')(
                                <Input
                                    placeholder={`请输入`}
                                    maxLength={100}
                                    style={{ width: 118 }}
                                />
                            )}
                            <span className="exceptionorderlist-money-separate">~</span>
                            {getFieldDecorator('paymentMax')(
                                <Input
                                    placeholder={`请输入`}
                                    maxLength="100"
                                    style={{ width: 118 }}
                                />
                            )}
                            </FormItem>
                        </InputGroup>
                    </Col>
                    <Col  span={8}>
                        <FormItem
                            label="买家留言"
                        >
                            {getFieldDecorator('leaveword', {
                                rules: [{
                                    required: false,
                                    message: `请输入`
                                }],
                            })(
                                <Input
                                    placeholder={`请输入`}
                                    maxLength={100}
                                />
                            )}
                        </FormItem>
                    </Col>

                </Row>
            </div>
        );


        const typeSearch = (
            <div
                className="search_content"
            >
                <FormItem
                    label="搜索内容"
                >
                    {getFieldDecorator('searchType', {
                        initialValue: 1,
                    })(
                        <RadioGroup size="small">
                            <Radio value={1}>平台单号</Radio>
                            <Radio value={2}>YKS单号</Radio>
                            {/* <Radio value={3}>固定电话</Radio>
                            <Radio value={4}>移动电话</Radio>
                            <Radio value={5}>邮编</Radio> */}
                        </RadioGroup>
                    )}
                </FormItem>
                <div className="content_right">
                    {getFieldDecorator('searchContent', {
                        rules: [{
                            required: false,
                            message: `请输入`
                        }],
                    })(
                        <Search
                            placeholder="双击可批量查询"
                            enterButton="搜索"
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
        );

        const ctageSearch = (
            <div className="search_tag">
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="海神订单"
                        >
                            {getFieldDecorator('clickFarmingType', {
                                initialValue: [0]
                            })(
                                <Ctags
                                    list={CTAGS_LIST}
                                    handleChange={() => this.props.onSearch()}
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="是否为合并订单"
                        >
                            {getFieldDecorator('isCombination', {
                                initialValue: [0]
                            })(
                                <Ctags
                                    list={CTAGS_LIST}
                                    handleChange={() => this.props.onSearch()}
                                />
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" align="top">
                    <Col span={24}>
                        <FormItem
                            label="异常类型"
                            { ...{labelCol: {span: 4}, wrapperCol: {span: 20}}}
                        >
                            {getFieldDecorator('exceptionType', {
                                initialValue: ['']
                            })(
                                <Ctags
                                    list={exceptionType}
                                    handleChange={() => this.props.onSearch()}
                                />
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );

        return (

            <div className="erp-search">
                <Form>
                    {selectSearch}
                    {typeSearch}
                    {ctageSearch}
                </Form>
            </div>
        );
    }
}

export default Condition
