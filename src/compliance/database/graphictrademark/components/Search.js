import React from 'react';
import { Button, Form, Select, Tooltip } from 'antd';
import StandardFormRow from '../../../../components/StandardFormRow';
import TextSearch from "../../../../components/TextSearch";
import BtnSearch from '../../../../components/BtnSearch';

import { getCountry, getTrademark } from '../../../common/request/index';
import { searchType } from '../constants'

const FormItem = Form.Item;
const Option = Select.Option

export default class Search extends React.Component {
    state = {
        country: [],
        trademark: [],
        showSearch: 1,
        isHightSearch: false,
    }
    componentDidMount() {
        getCountry().then((result) => {
            if (result && result.data) {
                this.setState({ country: result.data })
            }
        });
        getTrademark().then((result) => {
            if (result && result.data) {
                this.setState({ trademark: result.data })
            }
        });
    }
    // 高级搜索
    onChangeHightSearch = () => {
        if (this.state.isHightSearch === false) {
            this.setState({ isHightSearch: true })
        } else {
            this.setState({ isHightSearch: false })
        }
    }
    handleSubmit = () => {
        this.props.listFetch()
    }
    resetFields = () => {
        this.props.form.resetFields();
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { country, trademark, isHightSearch } = this.state;
        const { onSubmit } = this.props;
        const textSearch = (
            <TextSearch
                {...this.props}
                isSingle={false}
                searchType={searchType}
            />
        )
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
                onClick: this.props.onReset
            }, {
                name: isHightSearch ? '取消高级搜索' : '高级搜索',
                type: null,
                htmlType: null,
                onClick: this.onChangeHightSearch
            }
        ];
        const btnSearch = (<BtnSearch btn={btn}/>)

        const heighSearch = (
            <div className="height-search">
                <StandardFormRow title="注册国家">
                    <FormItem>
                        {getFieldDecorator('registerCountryId')(
                            <Select
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="请选择"
                                allowClear
                                showSearch
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                {
                                    country && country.length && country.map((item, index) => (
                                        <Option key={index} value={item.key}>{item.value}</Option>
                                    ))
                                }
                            </Select>
                        )}
                    </FormItem>
                </StandardFormRow>
                <StandardFormRow title="商标商品分类">
                    <FormItem>
                        {getFieldDecorator('trademarkClassId')(
                            <Select
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="请选择"
                                allowClear
                                showSearch
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                {
                                    trademark && trademark.length && trademark.map((item, index) => (
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
            <div className="search breadcrumb padding-sm-bottom overflow-hidden">
                <Form layout="inline" onSubmit={onSubmit}>
                    {textSearch}
                    {this.state.isHightSearch ? heighSearch : null}
                    {btnSearch}
                </Form>
            </div>
        )
    }
}