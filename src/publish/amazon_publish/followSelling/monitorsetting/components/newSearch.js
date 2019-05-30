/**
 * 作者: 陈林
 * 描述:库存价格队列搜索组件
 * 时间: 2018/7/30 0030 上午 11:21
 * @param
 **/
import React, { Component } from 'react'
import { Form, Radio, Input, Button, message, Select, DatePicker, Row, Col } from 'antd';
import Api from "../constants/api";
import {
    isDeleteList,
    sreachTypeList,
    sellingPriceList
} from '../constants/index'
import '../css/newSearch.css'
import moment from 'moment';
import { getrangetime } from 'util/baseTool';
import CSelect from '@/components/cselect';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
const Search = Input.Search;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

class newSearch extends Component {

    state = {
        accountList: [],
        showAccountList: []
    }

    labelCol = { span: 10 }
    wrapperCol = { span: 14 }
    span = {
        xxl: { span: 8 },
        xl: { span: 12 },
    }
    siteChange = (value) => {
        this.clearAccount()
        this.getAccount({
            platform: "亚马逊",
            site: value,
        })
        //         platform	【必填】平台编码	string	@mock=amazon
        // shopAccount	销售账号（可为空）	string	@mock=seller1
        // site	【必填】站点	string	@mock=US
    }

    clearAccount = () => {
        const { setFieldsValue } = this.props.form;
        setFieldsValue({
            sellerAccount: undefined,
        })
        this.setState({
            accountList: [],
            showAccountList: []
        })
    }

    getAccount = (params) => {
        const { getAccountAsync } = this.props;
        getAccountAsync(params)
            .then(r => {
                if (r) {
                    this.setState({
                        accountList: r,
                        showAccountList: r.slice(0, 50)
                    })
                }
            })
    }

    timerId = null;
    onSellerAccountSearch = (value) => {
        clearTimeout(this.timerId)
        setTimeout(() => {
            const { accountList } = this.state
            const list = accountList.filter(v => v.includes(value))
            this.setState({
                showAccountList: list.slice(0, 50)
            })
        }, 500)
    }

    onAccountFocus = () => {
        const { accountList } = this.state;
        if (accountList.length) return;
        this.getAccount({
            platform: "亚马逊",
        })
    }

    handleSelect = (value) => {
        if (value.length > 10) {
            message.warning("最多只能选择10个销售账号！");
            delete value[value.length - 1];
            value.length = 10;
        }
    }


    resetFields = () => {
        const { resetFields } = this.props;
        this.setState({
            accountList: [],
            showAccountList: []
        })
        resetFields && resetFields()
    }

    render() {
        const { showAccountList } = this.state;
        const { siteData } = this.props;
        const { getFieldDecorator } = this.props.form;

        const selectSearch = (
            <div className="selectSearch amazon-followselling-monitorsetting-search">
                <Row type="flex" align="middle">
                    <Col {...this.span}>
                        <FormItem
                            wrapperCol={this.wrapperCol}
                            labelCol={this.labelCol}
                            label="站点"
                        >
                            {getFieldDecorator('siteCode')(
                                <Select
                                    showSearch
                                    placeholder="请选择"
                                    onChange={this.siteChange}
                                >
                                    {
                                        siteData.map(v => <Option value={v.siteCode} key={v.siteCode}>{v.siteCode}</Option>)
                                    }
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col {...this.span}>
                        <FormItem
                            wrapperCol={this.wrapperCol}
                            labelCol={this.labelCol}
                            label="销售账号"
                            mode="multiple"
                        >
                            {getFieldDecorator('sellerAccount')(
                                <Select
                                    showSearch
                                    onSearch={this.onSellerAccountSearch}
                                    placeholder="请选择"
                                    onFocus={this.onAccountFocus}
                                    onChange={this.handleSelect}
                                    mode="multiple"
                                >
                                    {
                                        showAccountList.map(v => <Option value={v} key={v}>{v}</Option>)
                                    }
                                </Select>
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
                            <FormItem label="搜索内容"
                            >
                                {getFieldDecorator('searchType', {
                                    initialValue: 1,
                                })(
                                    <RadioGroup size="small">
                                        {
                                            sreachTypeList.map(v => <Radio key={v.value} value={v.value}>{v.name}</Radio>)
                                        }
                                    </RadioGroup>
                                )}
                            </FormItem>
                            <div className="typeSearch-r" style={{ left: "365px" }}>
                                {getFieldDecorator('searchContent', {
                                    // rules: [{
                                    //     required: false,
                                    //     message: `请输入`
                                    // }],
                                })(
                                    <Search
                                        placeholder="双击可批量查询"
                                        enterButton="搜索"
                                        size="large"
                                        style={{ width: 280 }}
                                        onDoubleClick={() => this.props.toggleModal()}
                                        onSearch={() => this.props.getList(1, 20)}
                                    />
                                )}
                                <Button
                                    type="default"
                                    onClick={this.resetFields}
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
            <div className="search bgcfff overflow-hidden">
                <Form>
                    <div className="select-type amazon-followselling-search">
                        {selectSearch}
                        {typeSearch}
                    </div>
                </Form>
            </div>
        );
    }
}

export default newSearch
