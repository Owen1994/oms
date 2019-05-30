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
import Functions from '../../../../components/functions'
import DraftContainer from '../containers/draft'
import PublishingContainer from '../containers/publishing'
import PublishfailContainer from '../containers/publishfail'
import SellingContainer from '../containers/selling'
import AlreadydownContainer from '../containers/alerdaydown'
import AlreadydeleteContainer from '../containers/alerdaydelete'
import Search from './search'
import { filterParams } from "../../../../util/baseTool"
import OrderCommonSearchModal from '@/components/SearchModal/SearchModal.js';

const TabPane = Tabs.TabPane
/**
 * @author 黄建峰
 * @description listing列表页
 */
class App extends React.Component {

    state = {
        activeKey: '0',
        visible: false,
    }
    searchParams = undefined;
    // 批量复制跳转时的辅助对象
    copyObj = null

    componentWillMount() {
        let copyObj = this.copyObj = JSON.parse(localStorage.getItem("_cpId"))
        localStorage.removeItem("_cpId")
        let activeKey;
        if (copyObj) {
            activeKey = copyObj.state + ""
        } else {
            const pagecache = this.props.pagecache.get(location.pathname)
            if (pagecache) {
                activeKey = pagecache.activeKey
            }
        }
        if (activeKey !== undefined) {
            this.setState({
                activeKey
            })
        }
    }


    componentDidMount() {
        // let value
        // if (this.copyObj) {
        //     value = { cpId: this.copyObj.cpId }
        //     this.copyObj = null
        // } else {
        let value = this.getParams()
        // }
        const { activeKey } = this.state;

        this.getList(value, activeKey)
    }

    handleTabChange = (activeKey) => {
        this.copyObj = null
        this.props.toggleKayAction({
            key: activeKey
        })
        this.setState({
            activeKey,
        })
        let value = this.getParams()
        this.getList(value, activeKey)
        this.props.setPageCacheAction({ path: location.pathname, data: { activeKey } })
    }

    getTableList = (activeKey) => {
        const { menuInfos, tablemodel } = this.props;
        const { getList, getParams, searchParams } = this;
        switch (activeKey) {
            case "0":
                return (
                    <DraftContainer
                        getParams={getParams}
                        getList={getList}
                        menuInfos={menuInfos}
                        tablemodel={tablemodel}
                        tabId={0}
                    />
                )
            case "1":
                return (
                    <PublishingContainer
                        getParams={getParams}
                        getList={getList}
                        menuInfos={menuInfos}
                        tablemodel={tablemodel}
                        tabId={1}
                    />
                )
            case "2":
                return (
                    <PublishfailContainer
                        getParams={getParams}
                        getList={getList}
                        menuInfos={menuInfos}
                        tablemodel={tablemodel}
                        tabId={2}
                    />
                )
            case "3":
                return (
                    <SellingContainer
                        getParams={getParams}
                        getList={getList}
                        menuInfos={menuInfos}
                        tablemodel={tablemodel}
                        tabId={3}
                        searchParams={searchParams}
                    />
                )
            case "4":
                return (
                    <AlreadydownContainer
                        getParams={getParams}
                        getList={getList}
                        menuInfos={menuInfos}
                        tablemodel={tablemodel}
                        tabId={4}
                        searchParams={searchParams}
                    />
                )
            case "5":
                return (
                    <AlreadydeleteContainer
                        getParams={getParams}
                        getList={getList}
                        menuInfos={menuInfos}
                        tablemodel={tablemodel}
                        tabId={5}
                    />
                )
        }
    }

    getParams = () => {
        const { getFieldsValue } = this.props.form;
        const value = filterParams(getFieldsValue());
        if (value.listingTypeStr || value.listingTypeStr === 0) {
            value.listingTypeStr = value.listingTypeStr[0]
            if (value.listingTypeStr === -1) {
                value.listingTypeStr = ""
            }
        }
        if (!value.searchContent) {
            delete value.searchType
            delete value.searchContent
        }
        if (value.stock) {
            if (value.stock[0] === undefined && value.stock[1] === undefined) {
                delete value.stock
            } else if (value.stock[1] === undefined) {
                message.warning("请完整填写库存数量")
                delete value.stock
            } else if (value.stock[1] < value.stock[0]) {
                message.warning("库存最大值要大于最小值")
                delete value.stock
            }
        }
        if (value.saleCounts) {
            value.saleCounts = value.saleCounts.filter(item => item);
            if (value.saleCounts.length === 0) {
                delete value.saleCounts
            } else if (value.saleCounts[0] === undefined || value.saleCounts[1] === undefined) {
                message.warning("请完整填写销量数量")
                delete value.saleCounts
            } else if (value.saleCounts[1] < value.saleCounts[0]) {
                message.warning("销量最大值要大于最小值")
                delete value.saleCounts
            }
        }
        return value
    }

    // 判断是否由批量复制跳转过来的
    checkCopySkip = (value) => {
        const { searchParams } = this;
        // value {listingTypeStr: "", pageNumber: 2, pageData: 20}
        // searchParams {cpId: "1552472327286000012", state: 3}
        let flag = true
        if (searchParams.cpId) {
            Object.keys(value).forEach(v => {
                if (v === "pageNumber" || v === 'pageData') return
                if (value[v] || value[v] === 0) {
                    flag = false
                }
            })
        }
        return flag
    }

    getList = (value, key) => {
        const { copyObj, searchParams } = this;
        if (copyObj && (!searchParams || this.checkCopySkip(value))) {
            value = {
                cpId: copyObj.cpId,
                pageNumber: value.pageNumber,
                pageData: value.pageData
            }
        } else {
            this.copyObj = null
        }
        const { activeKey } = this.state;
        if (!value.pageNumber) {
            value.pageNumber = 1
            value.pageData = 20
        }
        if (!key) {
            key = activeKey
        }
        value.state = Number(key);
        if (value.state === 3) {
            if (value.dataShowType === '1' && (!value.saleAccount || value.saleAccount.length < 1)) {
                message.warning("请先选择销售账号");
                return;
            }
            if (!value.dataShowType) {
                delete value.dataShowType;
            }
        }
        this.searchParams = { ...value };
        delete this.searchParams.pageNumber;
        delete this.searchParams.pageData;
        this.props.getListAsync(value, key);
    }

    resetFields = () => {
        this.copyObj = null
        this.props.form.resetFields()
    }

    render() {
        const listingStateData = this.props.listingStateData;
        const { activeKey, visible } = this.state;
        const tableList = this.getTableList(activeKey)
        return (
            <Functions {...this.props} isPage={true} functionkey="008-000001-000001-031">
                <div className="yks-erp-search_order">
                    <Search
                        activeKey={activeKey}
                        {...this.props}
                        onSearch={this.getList}
                        getParams={this.getParams}
                        resetFields={this.resetFields}
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
                            var value = this.getParams()
                            this.getList(value)
                        }}
                        searchContent="searchContent"
                    />
                    <div className="ebay-listing_container margin-ms-top">
                        <div className="tweb-tab">
                            <Tabs defaultActiveKey={activeKey} type="card" onChange={this.handleTabChange}>
                                <TabPane tab={listingStateData[0].title} key={'0'}>
                                </TabPane>
                                <TabPane tab={listingStateData[1].title} key={'1'}>
                                </TabPane>
                                <TabPane tab={listingStateData[2].title} key={'2'}>
                                </TabPane>
                                <TabPane tab={listingStateData[3].title} key={'3'}>
                                </TabPane>
                                <TabPane tab={listingStateData[4].title} key={'4'}>
                                </TabPane>
                                <TabPane tab={listingStateData[5].title} key={'5'}>
                                </TabPane>
                            </Tabs>
                            {
                                tableList
                            }
                        </div>
                    </div>
                </div>
            </Functions>
        )
    }
}

export default Form.create()(App)
