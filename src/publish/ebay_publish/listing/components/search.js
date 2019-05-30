import React from 'react';
import {
    Form,
    Radio,
    Input,
    Button,
    Row,
    Col,
    InputNumber,
    DatePicker
} from 'antd';
import '../css/newSearch.css'
import * as types from "../../../common/constants/actionTypes";
import ItemSelect from '../../../../common/components/itemSelect'
import Radiotags from '../../../../common/components/radiotags'
import { SALES_TYPE, DATA_SHOW_TYPE } from '../constants/Selling'
import CSelect from '../../../../components/cselect';
import Ctags from '../../../../components/ctags';

const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
const Search = Input.Search;
const InputGroup = Input.Group;

const style = {
    stock: {
        width: '122px',
        marginRight: '-1px',
        borderBottomRightRadius: '0',
        borderTopRightRadius: '0',
    },
    stock1: {
        width: '122px',
        marginLeft: '-1px',
        borderBottomLeftRadius: '0px',
        borderTopLeftRadius: '0px',
        borderLeftWidth: '0px',
    }
}

export default class SearchComponent extends React.Component {
    state = {
        isSearch: true,        // 是否切换搜索
        isHightSearch: false,    // 是否切换高级搜索
        ebaySiteData: '',        // ebay 站点数据
        placeholder: "支持多个条件换行精确查询",
    };

    // 筛选、搜索切换
    onChangeSearch = (event) => {
        if (event.target.value === 'search') {
            this.setState({ isSearch: true });
            this.setState({ isHightSearch: false });
        } else {
            this.setState({
                isSearch: false,
                isHightSearch: false,
            });
        }
    }

    // 高级搜索
    onChangeHightSearch = () => {
        if (this.state.isHightSearch === false) {
            this.setState({ isHightSearch: true })
        } else {
            this.setState({ isHightSearch: false })
        }
    }

    handleSiteChange = (value) => {
        this.setState({
            ebaySiteData: value
        })
    }
    handleSearchRadioChange = (e) => {
        if (e.target.value === '5') {
            this.setState({ placeholder: '多个SKU时请用英文逗号隔开' });
        } else {
            this.setState({ placeholder: '支持多个条件换行精确查询' });
        }
    }

    amendStock = (a) => {
        const { getFieldsValue, setFieldsValue } = this.props.form;
        const { stock } = getFieldsValue(["stock"])
        if (stock[0] > stock[1]) {
            setFieldsValue({
                [`stock[0]`]: stock[1],
                [`stock[1]`]: stock[0],
            })
        } else if (stock[0] === undefined && stock[1]) {
            setFieldsValue({
                [`stock[0]`]: 0,
            })
        }
    }

    getList = () => {
        var value = this.props.getParams()
        this.props.onSearch(value)
    }

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const { activeKey } = this.props;
        const rangeConfig = {
            rules: [{ type: 'array', required: false, message: 'Please select time!' }],
        };
        const site = getFieldValue('site');
        const selectSearch = (
            <div className="selectSearch">
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem label="站点"
                        >
                            {getFieldDecorator('site')(
                                <CSelect
                                    // list={PLATFORM_NAME} // 默认值列
                                    code='id' // 列表编码字段
                                    name='name' // 列表名称字段
                                    url={types.PUBLISH_EBAYSITE}
                                    // mode='multiple' // 是否多选
                                    // maxCount={3} // 最多选择项数量
                                    // formType={1}  // 表单数据类型，不填就是默认值，填1返回对象
                                    params={{ searchColumn: 'name', pageData: 50, pageNumber: 1 }} // 搜索参数
                                    apiListType={2}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                    placeholder={'请选择'}
                                    handleChange={this.props.handleChange} // 触发下拉事件
                                    localSearch={1}
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="eBay分类"
                        >
                            {getFieldDecorator('ebayClassId')(
                                <CSelect
                                    // list={LOGISTICS_BUSINESS} // 默认值列
                                    code='id' // 列表编码字段
                                    name='name' // 列表名称字段
                                    url={types.PUBLISH_EBAYCLASS}
                                    params={{
                                        searchColumn: 'name',
                                        pageData: 20,
                                        pageNumber: 1,
                                        site: site,
                                    }} // 搜索参数
                                    // formType={1}
                                    localSearch={1}
                                    apiListType={2}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                    placeholder={'请选择'}
                                    // handleChange={this.handleChange} // 触发下拉事件
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="首次刊登时间"
                        >
                            {getFieldDecorator('firstPlsTime', rangeConfig)(
                                <RangePicker
                                    format="YYYY-MM-DD"
                                    placeholder={['开始日期', '结束日期']}
                                    style={{ width: 270 }}
                                />
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="销售账号"
                            className="search_adjustment"
                        >
                            {getFieldDecorator('saleAccount')(
                                <CSelect
                                    // list={[]}
                                    code='id' // 列表编码字段
                                    name='id' // 列表名称字段
                                    url={types.PUBLISH_EBAYACCOUNT}
                                    mode='multiple' // 是否多选
                                    // mode='multiple' // 是否多选
                                    // maxCount={3} // 最多选择项数量
                                    // formType={1}  // 表单数据类型，不填就是默认值，填1返回对象
                                    params={{ searchColumn: 'name', pageData: 20, pageNumber: 1 }} // 搜索参数
                                    apiListType={2}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                    placeholder={'请选择'}
                                    localSearch={1}
                                    // handleChange={this.handleChange} // 触发下拉事件
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <InputGroup compact>
                            <FormItem label="库存" className="widthAll">
                                {getFieldDecorator('stock[0]')(
                                    <InputNumber
                                        style={style.stock}
                                        maxLength={100}
                                        className="paymentMin"
                                        placeholder="Minimum"
                                        min={0}
                                        max={999}
                                        precision={0}
                                        onBlur={this.amendStock}
                                    />
                                )}
                                <Input
                                    placeholder="~"
                                    disabled
                                    style={{
                                        width: "10%",
                                        borderLeft: 0,
                                        pointerEvents: 'none',
                                        backgroundColor: '#fff',
                                    }}
                                />
                                {getFieldDecorator('stock[1]')(
                                    <InputNumber
                                        style={style.stock1}
                                        maxLength={100}
                                        className="paymentMax"
                                        placeholder="Maxmum"
                                        min={0}
                                        max={999}
                                        precision={0}
                                        onBlur={this.amendStock}
                                    />
                                )}
                            </FormItem>
                        </InputGroup>
                    </Col>
                    {/* <Col span={8}>
                        <InputGroup compact>
                            <FormItem label="销量" className="widthAll">
                                {getFieldDecorator('saleCounts[0]')(
                                    <InputNumber
                                        style={style.stock}
                                        maxLength={100}
                                        className="paymentMin"
                                        placeholder="Minimum"
                                        min={0}
                                        precision={0}
                                        onBlur={this.amendStock}
                                    />
                                )}
                                <Input
                                    placeholder="~"
                                    disabled
                                    style={{
                                        width: "10%",
                                        borderLeft: 0,
                                        pointerEvents: 'none',
                                        backgroundColor: '#fff',
                                    }}
                                />
                                {getFieldDecorator('saleCounts[1]')(
                                    <InputNumber
                                        style={style.stock1}
                                        maxLength={100}
                                        className="paymentMax"
                                        placeholder="Maxmum"
                                        min={0}
                                        precision={0}
                                        onBlur={this.amendStock}
                                    />
                                )}
                            </FormItem>
                        </InputGroup>
                    </Col> */}
                </Row>
            </div>
        );

        const ctageSearch = activeKey == 3 ? (
            <div className="ctageSearch">
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="销售类型："
                        >
                            {getFieldDecorator('listingTypeStr', {
                                initialValue: [-1]
                            })(
                                <Ctags
                                    list={SALES_TYPE}
                                    handleChange={this.getList}
                                />
                            )}
                        </FormItem>
                    </Col>
                    {/* <Col span={8}>
                        <FormItem
                            label="数据展示："
                        >
                            {getFieldDecorator('dataShowType', {
                                initialValue: [0]
                            })(
                                <Ctags
                                    list={DATA_SHOW_TYPE}
                                    // handleChange={() => this.props.onSearch()}
                                />
                            )}
                        </FormItem>
                    </Col> */}
                </Row>

            </div>
        ) : null;


        const typeSearch = (
            <div className="typeSearch">
                <Row type="flex" align="middle">
                    <Col span={24}>
                        <div className="typeSearch-l">
                            <FormItem label="搜索内容"
                            >
                                {getFieldDecorator('searchType', {
                                    initialValue: 1,
                                })(
                                    <RadioGroup size="small" onChange={this.handleSearchRadioChange}>
                                        <Radio value={1}>Seller SKU</Radio>
                                        <Radio value={2}>标题</Radio>
                                        <Radio value={3}>Item ID</Radio>
                                        <Radio value={4}>刊登人员</Radio>
                                        <Radio value={5}>原SKU</Radio>
                                        <Radio value={6}>Listing ID</Radio>
                                    </RadioGroup>
                                )}
                            </FormItem>
                            <div className="typeSearch-r" style={{ left: "500px" }}>
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
                                        onDoubleClick={() => this.props.toggleModal()}
                                        onSearch={this.getList}
                                    />
                                )}
                                <Button
                                    type="default"
                                    onClick={() => this.props.resetFields()}
                                    className="search_adjustment_button"
                                >
                                    重置
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        );

        return (
            <div className="search breadcrumb overflow-hidden">
                {/* <div className="search-tab display-none">
                    <RadioGroup
                        defaultValue="select"
                        onChange={this.onChangeSearch}
                    >
                        <RadioButton value="select">筛选</RadioButton>
                        <RadioButton value="search">搜索</RadioButton>
                    </RadioGroup>
                </div> */}
                <Form>
                    <div className="select-type">
                        {selectSearch}
                        {typeSearch}
                        {/* {defaultSearch} */}
                        {/* {textSearch} */}
                        {/* {heightSearch} */}
                        {/* {btnSearch} */}
                    </div>
                    {ctageSearch}
                </Form>
            </div>
        );
    }
}
