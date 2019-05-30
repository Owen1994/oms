import React from 'react';
import { Form, Select, } from 'antd';
import StandardFormRow from '../../../../components/StandardFormRow';
import TabSearch from '../../../../components/TabSearch';
import BtnSearch from '../../../../components/BtnSearch';
import Screen from "./Screen";
import { getPlatform, getSite, getSaleAccount } from '../../../common/request/index';
import { distinct } from '../../../../util/baseTool'
const FormItem = Form.Item;
const Option = Select.Option

export default class Search extends React.Component {
    state = {
        isSearch: false,
        site: [],
        platform: [],
        saleAccount: [],
        platformValue: 0,
        saleAccountDisabled: true
    }
    componentDidMount() {
        getPlatform().then((result) => {
            if (result && result.length) {
                this.setState({ platform: result })
            }
        });
    }
    // 筛选、搜索切换
    onChangeSearch = (e) => {
        if (e.target.value === 'select') {
            this.setState({ isSearch: false });
        } else {
            this.setState({ isSearch: true });
        }
    }
    handleSubmit = () => {
        this.props.listFetch()
    }
    resetFields = () => {
        this.setState({ site: [], saleAccount: [] })
        this.setState({ saleAccountDisabled: false })
        this.props.form.resetFields();
    }
    onSelectId = (value) => {
        this.setState({ platformValue: value })
        this.clearSite()
        this.clearSaleAccount()
        if (!value) return;
        getSite({
            platformId: value
        }).then((result) => {
            // 站点为空
            this.setState({ site: result })
            if (result && !result.length) {
                this.getSaleAccount()
                this.setState({ saleAccountDisabled: false })
            }
        });
    }
    onSiteSelectId = (value) => {
        this.clearSaleAccount()
        if (value) {
            this.getSaleAccount(value)
        }
    }
    getSaleAccount = (value) => {
        const param = {}
        if (value) {
            param.site = value
        }
        param.platform = this.state.platformValue
        getSaleAccount(param).then((result) => {
            if (result && result.length) {
                this.setState({ saleAccount: distinct(result), saleAccountDisabled: false })
            }
        });
    }

    clearSite = () => {
        this.setState({ site: [] })
        this.props.form.setFieldsValue({ site: [] })
    }
    clearSaleAccount = () => {
        this.setState({ saleAccount: [], saleAccountDisabled: true })
        this.props.form.setFieldsValue({ saleAccount: [] })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { platform, site, saleAccount, isSearch } = this.state;
        const { onSubmit } = this.props;
        const btn = [
            {
                name: "搜索",
                type: "primary",
                htmlType: "submit",
                onClick: null
            }, {
                name: "重置",
                type: null,
                htmlType: null,
                onClick: () => {
                    this.resetFields()
                    this.props.onReset()
                    this.props.listFetch()
                }
            }
        ];
        const btnSearch = isSearch ? (
            <BtnSearch btn={btn} />
        ) : null;

        const heighSearch = (
            <div className="height-search">
                <StandardFormRow title="平台">
                    <FormItem>
                        {getFieldDecorator('platform')(
                            <Select
                                style={{ width: '100%' }}
                                placeholder="请选择"
                                allowClear
                                showSearch
                                onChange={this.onSelectId}
                                // onSelect={this.onSelectId}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                {
                                    platform && platform.length && platform.map((item, index) => (
                                        <Option key={index} value={item.id}>{item.name}</Option>
                                    ))
                                }
                            </Select>
                        )}
                    </FormItem>
                </StandardFormRow>
                <StandardFormRow title="站点">
                    <FormItem>
                        {getFieldDecorator('site')(
                            <Select
                                style={{ width: '100%' }}
                                placeholder="请选择"
                                allowClear
                                showSearch
                                disabled={!this.state.site.length}
                                onChange={this.onSiteSelectId}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                {
                                    site && site.length && site.map((item, index) => (
                                        <Option key={index} value={item.id}>{item.name}</Option>
                                    ))
                                }
                            </Select>
                        )}
                    </FormItem>
                </StandardFormRow>
                <StandardFormRow title="销售账号">
                    <FormItem>
                        {getFieldDecorator('saleAccount')(
                            <Select
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="请选择"
                                allowClear
                                disabled={this.state.saleAccountDisabled}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                {
                                    saleAccount && saleAccount.length && saleAccount.map((item, index) => (
                                        <Option key={index} value={item.id}>{item.name}</Option>
                                    ))
                                }
                            </Select>
                        )}
                    </FormItem>
                </StandardFormRow>
            </div>
        );
        return (
            <div className="search breadcrumb padding-sm-top padding-sm-bottom overflow-hidden">
                <TabSearch onChangeSearch={this.onChangeSearch} />
                <Form layout="inline" onSubmit={onSubmit}>
                    <Screen {...this.props} />
                    {this.state.isSearch ? heighSearch : null}
                    {btnSearch}
                </Form>
            </div>
        )
    }
}