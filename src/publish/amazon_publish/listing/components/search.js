import React from 'react';
import {
    Form,
    Radio,
    Input,
    Button,
    Row,
    Col,
    message,
    Select,
} from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Search = Input.Search;
const Option = Select.Option;

export default class SearchComponent extends React.Component {
    state = {
        accountList: [],
        accountGroupList: [],
        showAccountList: [],
        isDoubleClick: true
    };

    siteChange = (value) => {
        this.clearAccount()
        this.getAccount({
            platform: "亚马逊",
            site: value,
        })
    }

    clearAccount = () => {
        const { setFieldsValue } = this.props.form;
        setFieldsValue({
            saleAccounts: undefined,
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

    onAccountGroupFocus = () => {
        const { accountGroupList } = this.state
        if (accountGroupList && accountGroupList.length) return;
        const { getAccountgroupAsync } = this.props
        getAccountgroupAsync({
            data: { platform: "亚马逊" }
        })
            .then(r => {
                if (r && r.length) {
                    this.setState({
                        accountGroupList: r.filter(v => v)
                    })
                }
            })
    }

    resetFields = () => {
        const { resetFields } = this.props;
        this.setState({
            accountList: [],
            showAccountList: []
        })
        resetFields && resetFields()
    }

    searchTypeChange = (e) => {
        const value = e.target.value
        const { isDoubleClick } = this.state;
        if (value === 4 || value === 5) {
            isDoubleClick && this.setState({
                isDoubleClick: false
            })
        } else {
            !isDoubleClick && this.setState({
                isDoubleClick: true
            })
        }
    }

    render() {
        const { showAccountList, isDoubleClick, accountGroupList } = this.state;
        const { siteData, getList, activeKey } = this.props;
        const { getFieldDecorator } = this.props.form;
        const placeholder = isDoubleClick ? "双击可批量查询" : "请输入查询"
        const onDoubleClick = isDoubleClick ? this.props.toggleModal : null
        const selectSearch = (
            <Row type="flex" align="middle">
                <Col span={8}>
                    <FormItem label="站点"
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
                    <FormItem label="销售账号"
                    >
                        {getFieldDecorator('saleAccounts')(
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
                <Col span={8}>
                    <FormItem label="账号所属分组"
                    >
                        {getFieldDecorator('accountGroup')(
                            <Select
                                showSearch
                                // onSearch={this.onSellerAccountSearch}
                                placeholder="请选择"
                                onFocus={this.onAccountGroupFocus}
                                // onChange={this.handleSelect}
                                // mode="multiple"
                            >
                                {
                                    accountGroupList.map(v => <Option value={v} key={v}>{v}</Option>)
                                }
                            </Select>
                        )}
                    </FormItem>
                </Col>
            </Row>
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
                                    <RadioGroup size="small" onChange={this.searchTypeChange}>
                                        <Radio value={1}>ASIN</Radio>
                                        <Radio value={2}>seller SKU</Radio>
                                        <Radio value={3}>原sku</Radio>
                                        <Radio value={4}>标题</Radio>
                                        {

                                            activeKey == 2 ? <Radio value={5}>失败原因</Radio> : null
                                        }
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
                                        placeholder={placeholder}
                                        enterButton="搜索"
                                        size="large"
                                        style={{ width: 280 }}
                                        onDoubleClick={onDoubleClick}
                                        onSearch={() => getList(1)}
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
            <div className="search breadcrumb amazon-listing-search overflow-hidden">
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
