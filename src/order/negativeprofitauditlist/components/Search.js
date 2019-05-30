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
    InputNumber,
    Tooltip,
} from 'antd';
import Ctags from '@/components/ctags'
import CSelect from '@/components/cselect'
import { fetchPost } from 'util/fetch';
import { setPageCache, getPageCache } from 'util/PageCache';
import { 
    GET_PLATFORM,
    FIND_STORELIST_PUBLIC,
    QUERY_CHANNEL_DATA,
    QUERY_COUNTRL_DATA,
} from '../constants';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const Search = Input.Search;
const RangePicker = DatePicker.RangePicker;


export default class SearchComponent extends React.Component {

    state = {
        selectOption: 'paymentTime',
        accountSelect: true, // 销售账号搜索类型
    }

    componentDidMount() {
        this.setDefaultTime();
        getPageCache().then((params) => {
            if(params && params.formData['grabTime']){
                this.hadnleSelect('grabTime');
            }
        })
    }

    // 设置默认时间
    setDefaultTime = () => {
        let { setFieldsValue } = this.props.form;
        let end = moment().endOf('day').valueOf();
        let start = moment().subtract(30, 'day').startOf('day').valueOf();
        let momentData = [moment(start), moment(end)] || [];
        setFieldsValue({ "range-time": momentData });
    }
   
    // 处理付款时间及抓单时间下拉事件
    hadnleSelect = (value) => {
        this.setState({ selectOption: value }, () => {
            if (value === 'paymentTime') {
                this.setDefaultTime();
            }
        });
    }

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
        const saleAccountId = getFieldValue('saleAccount');
        if(saleAccountId && !Array.isArray(saleAccountId)){
            setFieldsValue({
                saleAccount: saleAccountId.split(',')
            });
        } else if(!saleAccountId && !Array.isArray(saleAccountId)) {
            setFieldsValue({
                saleAccount: []
            });
        }
        this.setState({ accountSelect: !accountSelect });
    }

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const { checkState, paramePlatformId, handleChange, toggleModal, toggleModal2 } = this.props;
        const { selectOption, accountSelect } = this.state;

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
                            {getFieldDecorator('platformId')(
                                <CSelect
                                    // list={warehouseDeliver} // 默认值列表
                                    code='id' // 列表编码字段
                                    name='name' // 列表名称字段
                                    url={GET_PLATFORM}
                                    // mode='multiple' // 是否多选
                                    // maxCount={3} // 最多选择项数量
                                    formType={1}  // 表单数据类型，不填就是默认值，填1返回对象
                                    params={{ searchColumn: 'name', pageData: 50, pageNumber: 1 }} // 搜索参数
                                    apiListType={2}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                    placeholder={'请选择'}
                                    handleChange={handleChange}
                                    localSearch={1}
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="销售账号"
                            className="order-search-saleAccountId"
                        >
                            {getFieldDecorator('saleAccount')(
                                accountSelect ?
                                    <CSelect
                                        // list={details ? [details.platform] : []} // 默认值列表
                                        // list={[]}
                                        code='id' // 列表编码字段
                                        name='name' // 列表名称字段
                                        url={FIND_STORELIST_PUBLIC}
                                        mode='multiple' // 是否多选
                                        className="order-cselect"
                                        maxCount={10} // 最多选择项数量
                                        // formType={1}  // 表单数据类型，不填就是默认值，填1返回对象
                                        params={{ data: {searchColumn: 'sellerId', platformCode: paramePlatformId ? paramePlatformId : '',pageData: 20, pageNumber: 1 }}} // 搜索参数
                                        apiListType={2}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
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
                                    code='id' // 列表编码字段
                                    name='name' // 列表名称字段
                                    url={QUERY_COUNTRL_DATA}
                                    formType={1}  // 表单数据类型，不填就是默认值，填1返回对象
                                    params={{ searchColumn: 'name', pageData: 20, pageNumber: 1 }} // 搜索参数
                                    apiListType={2}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                    placeholder={'请选择'}
                                    localSearch={1}
                                    // handleChange={this.handleChange} // 触发下拉事件
                                />
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="物流渠道"
                        >
                            {getFieldDecorator('logisticsChannel')(
                                <CSelect
                                    // list={[]}// 默认值列表
                                    code='id' // 列表编码字段
                                    name='name' // 列表名称字段
                                    url={QUERY_CHANNEL_DATA}
                                    // mode='multiple' // 是否多选
                                    // maxCount={3} // 最多选择项数量
                                    formType={1}  // 表单数据类型，不填就是默认值，填1返回对象
                                    params={{ searchColumn: 'name', pageData: 20, pageNumber: 1 }} // 搜索参数
                                    apiListType={2}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                    placeholder={'请选择'}
                                    localSearch={1} 
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem 
                            label={select}
                        >
                            {payment}
                            {grap}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="试算包裹利润"
                        >
                            {getFieldDecorator('profitMin')(
                                <InputNumber
                                    // min={0}
                                    precision={2}
                                    placeholder="请输入"
                                    style={{ width: 120 }}
                                />
                            )}
                            <span className="negative-money-separate">~</span>
                            {getFieldDecorator('profitMax')(
                                <InputNumber
                                    // min={0}
                                    precision={2}
                                    placeholder="请输入"
                                    style={{ width: 120 }}
                                />
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
                            <FormItem   label="搜索内容">
                                {getFieldDecorator('searchType', {
                                    initialValue: 1
                                })(
                                    <RadioGroup>
                                        <Radio value={1}>平台单号</Radio>
                                        <Radio value={6}>包裹单号</Radio>
                                        <Radio value={2}>YKS单号</Radio>
                                        {/* <Radio value={8}>固定电话</Radio>
                                        <Radio value={9}>移动电话</Radio>
                                        <Radio value={10}>邮编</Radio> */}
                                    </RadioGroup>
                                    )}
                            </FormItem>
                            <div className="typeSearch-r" style={{ left: "375px" }}>
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
                                        style={{ width: 270 }}
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
            <div className="ctageSearch">
                <Row type="flex" align="middle">
                    <Col span={24}>
                        <FormItem
                            label="待审类型"
                        >
                            {getFieldDecorator('exceptionType', {
                                initialValue: ['']
                            },
                            )(
                                <Ctags
                                    list={checkState}
                                    handleChange={() => this.props.onSearch()}
                                />
                            )}
                        </FormItem>
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
                    {ctageSearch}
                </Form>
            </div>
        )
    }
}
