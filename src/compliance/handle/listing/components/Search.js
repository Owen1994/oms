import React from 'react';
import { Form, Select, } from 'antd';
import StandardFormRow from '../../../../components/StandardFormRow';
import TextSearch from "../../../../components/TextSearch";
import TabSearch from '../../../../components/TabSearch';
import BtnSearch from '../../../../components/BtnSearch';
import Screen from "./Screen";

import { searchType } from '../constants'
import { getPlatform, getSite, getSaleAccount } from '../../../common/request/index';

const FormItem = Form.Item;
const Option = Select.Option

export default class Search extends React.Component {
    state = {
        isSearch: false,
        isHighSearch: false,
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
    // 高级搜索
    onChangeHightSearch = () => {
        if (this.state.isHighSearch === false) {
            this.setState({ isHighSearch: true })
        } else {
            this.setState({ isHighSearch: false })
        }
    }
    handleSubmit = () => {
        this.props.listFetch()
    }
    resetFields = () => {
        this.setState({ site: [] })
        this.setState({ saleAccountDisabled: true })
        this.props.form.resetFields();
    }
    onSelectId = (value) => {
        this.setState({ platformValue: value, saleAccountDisabled: true })
        this.props.form.setFieldsValue({ saleAccount: [] })
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
        this.getSaleAccount(value)
    }
    getSaleAccount = (value) => {
        const param = {}
        if (value) {
            param.site = value
        }
        param.platform = this.state.platformValue
        getSaleAccount(param).then((result) => {
            if (result && result.length) {
                this.setState({ saleAccount: result, saleAccountDisabled: false })
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { platform, site, saleAccount, isSearch, isHighSearch } = this.state;
        const { onSubmit } = this.props;
        const textSearch = isSearch ?
            <TextSearch
                {...this.props}
                isSingle={false}
                searchType={searchType}
            />
            : null;
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
            }, {
                name: isHighSearch ? '取消高级搜索' : '高级搜索',
                type: null,
                htmlType: null,
                onClick: this.onChangeHightSearch
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
                                onSelect={this.onSelectId}
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
                                onSelect={this.onSiteSelectId}
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
                    {textSearch}
                    {this.state.isHighSearch ? heighSearch : null}
                    {btnSearch}
                </Form>
            </div>
        )
    }
}