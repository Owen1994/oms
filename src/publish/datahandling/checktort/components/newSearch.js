/**
 * 作者: 陈林
 * 描述:库存价格队列搜索组件
 * 时间: 2018/7/30 0030 上午 11:21
 * @param
 **/
import React, { Component } from 'react'
import { Form, Radio, Input, Button, message, Select, DatePicker, Row, Col } from 'antd';
// import Api from "../constants/api";
import {
    currentStateList,
    sreachTypeList,
    sellingPriceList
} from '../constants/index'
// import '../css/newSearch.css'
// import moment from 'moment';
// import { getrangetime } from 'util/baseTool';
// import CSelect from '@/components/cselect';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
const Search = Input.Search;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

class newSearch extends Component {

    state = {
        platformData: [],
        accountData: [],
        siteData: [],
        showAccountList: []
    }

    labelCol = { span: 10 }
    wrapperCol = { span: 14 }

    componentDidMount() {
        this.setPlatform()
    }

    setPlatform = () => {
        const {
            getPlatformAsync
        } = this.props;

        return getPlatformAsync()
            .then(r => {
                if (!r) return;
                this.setState({
                    platformData: r
                })
            })
    }

    setSite = (platform = "Amazon") => {
        const {
            getSiteAsync
        } = this.props;

        return getSiteAsync({
            platform
        })
            .then(r => {
                if (!r) return;
                this.setState({
                    siteData: r
                })
            })
    }

    setAccount = ({
        platform,
        siteId,
        shopAccount
    }) => {
        const {
            getAccountAsync
        } = this.props;
        if (!platform) return;
        const params = {
            platform,
            site: siteId
        }
        if (shopAccount) {
            params.shopAccount = shopAccount;
        }
        return getAccountAsync(params)
            .then(r => {
                if (!r) return;
                this.setState({
                    accountData: r,
                    showAccountList: r.slice(0, 50)
                })
            })
    }

    clearAccount = () => {
        const { setFieldsValue } = this.props.form;
        setFieldsValue({
            listingSellerIds: undefined,
        })
        this.setState({
            accountData: [],
            showAccountList: []
        })
    }

    clearSite = () => {
        const { setFieldsValue } = this.props.form;
        setFieldsValue({
            site: undefined,
        })
        this.setState({
            siteData: []
        })
    }

    plateformChange = (value) => {
        this.clearSite()
        this.clearAccount()
        this.setSite(value)
    }

    siteChange = (value) => {
        const { getFieldsValue } = this.props.form;
        const params = getFieldsValue(["platform"]);
        params.siteId = value;
        this.clearAccount()
        this.setAccount(params)
    }


    timerId = null;
    onSellerAccountSearch = (value) => {
        clearTimeout(this.timerId)
        setTimeout(() => {
            const { accountData } = this.state
            const list = accountData.filter(v => v.includes(value))
            this.setState({
                showAccountList: list.slice(0, 50)
            })
        }, 500)
    }

    onAccountFocus = () => {
        const { getFieldsValue } = this.props.form;
        const { accountData } = this.state;
        if (accountData.length) return;
        const params = getFieldsValue(["platform", "siteId"]);
        this.setAccount(params)
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
            accountData: [],
            siteData: [],
            showAccountList: []
        })
        resetFields && resetFields()
    }

    render() {

        const { platformData, siteData, showAccountList } = this.state;
        const { getFieldDecorator } = this.props.form;

        const selectSearch = (
            <div className="selectSearch">
                <Row type="flex" align="middle">

                    <Col span={8}>
                        <FormItem
                            wrapperCol={this.wrapperCol}
                            labelCol={this.labelCol}
                            label="平台"
                        >
                            {getFieldDecorator('platform')(
                                <Select
                                    showSearch
                                    placeholder="请选择"
                                    onChange={this.plateformChange}
                                >
                                    {
                                        platformData.map(v => <Option value={v.platformId} key={v.platformId}>{v.platformName}</Option>)
                                    }
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            wrapperCol={this.wrapperCol}
                            labelCol={this.labelCol}
                            label="站点"
                        >
                            {getFieldDecorator('siteId')(
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
                    <Col span={8}>
                        <FormItem
                            wrapperCol={this.wrapperCol}
                            labelCol={this.labelCol}
                            label="销售账号"
                        >
                            {getFieldDecorator('listingSellerIds')(
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
                                        onSearch={() => this.props.getList(1)}
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
            <div className="search breadcrumb overflow-hidden datahandling-checktort-search">
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

export default newSearch
