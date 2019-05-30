import React, { Component } from 'react';
import {
    Form,
    Radio,
    Input,
    Button,
    DatePicker,
    Row,
    Col,
    InputNumber,
} from 'antd';
import * as types from "../../../../common/constants/actionTypes";
import ItemSelect from '../../../../../common/components/itemSelect'
import PropTypes from 'prop-types'
import {levelOptions} from "../../../../../util/options";
import { SALES_TYPE } from '../../constants/Selling'
import Radiotags from '../../../../../common/components/radiotags'

const FormItem = Form.Item
const RangePicker = DatePicker.RangePicker;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
import moment from 'moment';

export default class Search extends Component {
    state = {
        isSearch: false,        // 是否切换搜索
        isHightSearch: false,    // 是否切换高级搜索
        ebaySiteData: '',        // ebay 站点数据
        placeholder: '支持多个条件换行精确查询'
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

    // 全局搜索
    onSubmit = (event) => {
        // event.preventDefault()
        this.props.onSearch()
    }
    
    handleSiteChange = (value) => {
        this.setState({
            ebaySiteData: value
        })
    }

    handleSearchRadioChange = (e) => {
        if(e.target.value === '5') {
            this.setState({placeholder: '多个SKU时请用英文逗号隔开'});
        }else{
            this.setState({placeholder: '支持多个条件换行精确查询'});
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { resetFields, active } = this.props;
        const classParams = {site: this.state.ebaySiteData};
        const rangeConfig = {
            rules: [{ type: 'array', required: false, message: 'Please select time!' }],
        };

        const defaultSearch = (
            <div className="list-filter-item2" style={{lineHeight: '22px'}}>
                <div className="list-filter-item-title2">销售类型：</div>
                <div style={{width: '60%'}}>
                    <Radiotags
                        getFieldDecorator={getFieldDecorator}  // antd form双向绑定
                        onChange={this.onSubmit}
                        list={SALES_TYPE}  // 源数据
                        name='listingTypeStr'  // form提交的名称
                    />
                </div>
            </div>
        );
        const textSearch = this.state.isSearch ? (
            <div className="text-search" style={{marginTop: 20}}>
                <div className="list-filter-item2">
                    <div className="list-filter-item-title2">搜索类型：</div>
                    <div className="list-filter-input2">
                        <FormItem>
                            {getFieldDecorator('searchType', {
                                rules: [{ required: false, message: '请选择' }],
                                initialValue: "1",
                            })(
                                <RadioGroup size="small" onChange={this.handleSearchRadioChange}>
                                    <RadioButton value="1">Seller SKU</RadioButton>
                                    <RadioButton value="2">标题</RadioButton>
                                    {active === 0 ? null :
                                        <RadioButton value="3">Item ID</RadioButton>
                                    }
                                    <RadioButton value="4">刊登人员</RadioButton>
                                    <RadioButton value="5">原SKU</RadioButton>
                                </RadioGroup>
                            )}
                        </FormItem>
                    </div>
                </div>
                <div className="list-filter-item2">
                    <div className="list-filter-item-title2">搜索内容：</div>
                    <div className="list-filter-input2">
                        <FormItem>
                            {getFieldDecorator('searchContent')(
                                <TextArea placeholder={this.state.placeholder} style={{ width: 330 }} autosize={{ minRows: 2, maxRows: 6 }} />
                            )}
                        </FormItem>
                    </div>
                </div>
            </div>
        ) : null;

        const heightSearch = this.state.isHightSearch ? (
            <div className="height-search">
                <div className="list-filter-item2">
                    <div className="list-filter-item-title2">站点：</div>
                    <div className="list-filter-input2">
                        <ItemSelect
                            url={types.PUBLISH_EBAYSITE}
                            getFieldDecorator={getFieldDecorator}
                            formName="site"
                            code='id'
                            apiListType={2}
                            placeholder="Select a site"
                            onChange={this.handleSiteChange}
                        />
                    </div>
                </div>
                <div className="list-filter-item2">
                    <div className="list-filter-item-title2">销售账号：</div>
                    <div className="list-filter-input2">
                        <ItemSelect
                            url={types.PUBLISH_EBAYACCOUNT}
                            getFieldDecorator={getFieldDecorator}
                            formName="saleAccount"
                            name='id'
                            code='id'
                            searchColumn='searchContent'
                            apiListType={2}
                            placeholder="Select a sale account"
                            mode="multiple"
                            maxCount={10}
                        />
                    </div>
                </div>
                <div className="list-filter-item2">
                    <div className="list-filter-item-title2">eBay分类：</div>
                    <div className="list-filter-input2">
                        <ItemSelect
                            url={types.PUBLISH_EBAYCLASS}
                            getFieldDecorator={getFieldDecorator}
                            params={classParams}
                            formName="ebayClassId"
                            code='id'
                            apiListType={2}
                            placeholder="Select a eBay category"
                        />
                    </div>
                </div>
                <div className="list-filter-item2">
                    <div className="list-filter-item-title2">库存：</div>
                    <div className="list-filter-input2">
                        <Row gutter={10}>
                            <Col span={11}>
                                {getFieldDecorator('stock[0]')(
                                    <InputNumber
                                        // type={"number"}
                                        className={'cwc-inputNumber'}
                                        placeholder="Minimum"
                                        min={0}
                                        max={999}
                                        precision={0}
                                    />
                                )}
                            </Col>
                            <Col span={2}>
                                <span>~</span>
                            </Col>
                            <Col span={11}>
                                {getFieldDecorator('stock[1]')(
                                    <InputNumber
                                        // type={"number"}
                                        className={'cwc-inputNumber'}
                                        placeholder="Maximum"
                                        min={0}
                                        max={999}
                                        precision={0}
                                    />
                                )}
                            </Col>    
                        </Row>
                    </div>
                </div>
                <div className="list-filter-item2">
                    <div className="list-filter-item-title2">首次刊登时间：</div>
                    <div className="list-filter-input2">
                        <FormItem>
                            {getFieldDecorator('firstPlsTime', rangeConfig)(
                                <RangePicker
                                    format="YYYY-MM-DD"
                                    placeholder={['开始日期', '结束日期']}
                                    style={{width: 330}}
                                />
                            )}
                        </FormItem>
                    </div>
                </div>
            </div>
        ) : null;
        const btnSearch = this.state.isSearch ? (
            <div className="btn-search">
                <Button type="primary" onClick={()=>this.props.onSearch()}>搜索</Button>
                <Button onClick={()=>{
                    this.setState({
                        ebayClassData: [],  // 重置ebay分类
                    })
                    resetFields();
                }}>重置</Button>
                <Button type="default" onClick={this.onChangeHightSearch}>
                    {
                        this.state.isHightSearch ? '取消高级搜索' : '高级搜索'
                    }
                </Button>
            </div>
        ) : null;

        return (
            <div className="search breadcrumb padding-sm overflow-hidden" style={{padding: '10px 0'}}>
                <div className="search-tab" style={{zIndex: 99}}>
                    <RadioGroup
                        defaultValue="select"
                        onChange={this.onChangeSearch}
                    >
                        <RadioButton value="select">筛选</RadioButton>
                        <RadioButton value="search">搜索</RadioButton>
                    </RadioGroup>
                </div>
                <Form layout="inline">
                    {defaultSearch}
                    {textSearch}
                    {heightSearch}
                    {btnSearch}
                </Form>
            </div>
        );
    }
}

Search.propTypes = {
    onSearch: PropTypes.func.isRequired
}