/**
 * 作者: pzt
 * 描述: listing 列表页
 * 时间: 2018/7/27 15:52
 **/
import React from 'react'
import {
    Tabs,
    Form,
    message,
} from 'antd'
import '../css/css.css'
import Functions from '@/components/functions'
import Search from './search'
import Table from './table'
import { filterParams, getUrlParams } from "@/util/baseTool"
import OrderCommonSearchModal from '@/components/SearchModal/SearchModal.js';
/**
 * @author 黄建峰
 * @description listing列表页
 */
class App extends React.Component {

    state = {
        activeKey: '1',
        visible: false,
        siteData: []
    }

    field = 'amazon_publish_listing'

    componentDidMount() {
        // 获取浏览器url参数
        const { getDetialAsync, location, form } = this.props;
        const { type } = getUrlParams(location.search);
        const { setFieldsValue } = form
        this.setSite()
        if (type === "1") {
            let obj;
            try {
                obj = JSON.parse(sessionStorage.getItem(this.field)) || {}
            } catch (err) {
                obj = {}
            }
            sessionStorage.removeItem(this.field)
            const {
                pageData = 20,
                pageNumber = 1,
                listingStatus = 1,
                searchType = 1
            } = obj;
            setFieldsValue({
                siteId: obj.siteId,
                saleAccounts: obj.saleAccounts,
                searchType: searchType,
                searchContent: obj.searchContent,
            })
            this.setState({
                activeKey: listingStatus + ""
            }, () => this.getList(pageNumber, pageData))
        } else {
            this.getList(1, 20)
        }
    }

    handleTabChange = (activeKey) => {
        const { setFieldsValue, getFieldValue } = this.props.form;
        const searchType = getFieldValue("searchType")
        if (searchType === 5 && activeKey !== "2") {
            setFieldsValue({
                searchType: 1
            })
        }
        this.setState({
            activeKey,
        }, () => this.getList(1, 20))
    }

    setActiveKey = (activeKey) => {
        this.setState({
            activeKey,
        })
    }

    setSite = () => {
        const {
            getSiteAsync
        } = this.props;
        getSiteAsync({
            platform: '亚马逊'
        })
            .then(r => {
                if (!r) return;
                this.setState({
                    siteData: r
                })
            })
    }

    getParams = () => {
        const { params } = this.props.listData;
        const { activeKey } = this.state;
        const { getFieldsValue } = this.props.form;
        const value = filterParams(getFieldsValue());
        if (!value.searchContent) {
            delete value.searchType
            delete value.searchContent
        }
        value.listingStatus = Number(activeKey)
        value.pageNumber = params.pageNumber
        value.pageData = params.pageData
        return value
    }

    getList = (pageNumber, pageData) => {
        const value = this.getParams()
        if (pageNumber) {
            value.pageNumber = pageNumber
        }
        if (pageData) {
            value.pageData = pageData
        }
        this.props.getListAsync({
            data: value
        })
    }

    resetFields = () => {
        this.props.form.resetFields()
    }

    componentWillUnmount() {
        sessionStorage.setItem(this.field, JSON.stringify(this.getParams()))
    }

    render() {
        const { getAccountAsync, form, getAccountgroupAsync } = this.props;
        const { activeKey, visible, siteData } = this.state;
        return (
            <div className="yks-erp-search_order">
                <Search
                    activeKey={activeKey}
                    form={form}
                    getList={this.getList}
                    setActiveKey={this.setActiveKey}
                    getAccountgroupAsync={getAccountgroupAsync}
                    // getParams={this.getParams}
                    resetFields={this.resetFields}
                    getAccountAsync={getAccountAsync}
                    siteData={siteData}
                    toggleModal={() => this.setState({
                        visible: true,
                    })}
                />
                <OrderCommonSearchModal
                    {...this.props}
                    visible={visible}
                    onCancel={() => this.setState({
                        visible: false,
                    })}
                    onSearch={() => {
                        this.getList(1, 20)
                    }}
                    searchContent="searchContent"
                />
                <div className="amazon-listing_container margin-ms-top">
                    <div className="tweb-tab">
                        <Table
                            {...this.props}
                            getParams={this.getParams}
                            getList={this.getList}
                            handleTabChange={this.handleTabChange}
                            activeKey={activeKey}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Form.create()(App)
