import React from 'react';
import { Form, Select, } from 'antd';
import StandardFormRow from '../../../../components/StandardFormRow';
import TextSearch from "../../../../components/TextSearch";
import TabSearch from '../../../../components/TabSearch';
import BtnSearch from '../../../../components/BtnSearch';
import Screen from "./Screen";
import { getCountry } from '../../../common/request/index';
import { searchType } from '../constants'

const FormItem = Form.Item;
const Option = Select.Option

export default class Search extends React.Component {
    state = {
        country: [],
        isSearch: false,
        isHighSearch: false,
    }
    componentDidMount() {
        getCountry().then((result) => {
            if (result && result.data) {
                this.setState({ country: result.data })
            }
        });
        
    }
    // 筛选、搜索切换
    onChangeSearch = (e) => {
        if (e.target.value === 'select') {
            this.setState({ isSearch: false });
            this.setState({ isHighSearch: false });
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
        this.props.form.resetFields();
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { country, isHighSearch, isSearch } = this.state;
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
                onClick: this.props.onReset
            }, {
                name: isHighSearch ? '取消高级搜索' : '高级搜索',
                type: null,
                htmlType: null,
                onClick: this.onChangeHightSearch
            }
        ];
        const btnSearch = isSearch ? (
            <BtnSearch btn={btn}/>
        ) : null;

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
            </div>
        );
        return (
            <div className="search breadcrumb padding-sm-top padding-sm-bottom overflow-hidden">
                <TabSearch onChangeSearch={this.onChangeSearch} />
                <Form layout="inline" onSubmit={onSubmit}>
                    <Screen {...this.props}/>
                    {textSearch}
                    {this.state.isHighSearch ? heighSearch : null}
                    {btnSearch}
                </Form>
            </div>
        )
    }
}