import React from 'react'
import { Form } from "antd";
import { levelOptions } from "@/util/options";
import Functions from '@/components/functions'
import NewSearch from './newSearch'
import Table from './table'
import { parseStrToArray } from "util/StrUtil";
import OrderCommonSearchModal from '@/components/SearchModal/SearchModal.js';
import "../css/css.css"

class App extends React.Component {

    state = {
        visible: false,
    }
    componentDidMount() {
        this.getList()
    }

    getParams = () => {
        const { getFieldsValue } = this.props.form;
        const { listData } = this.props;
        const { params } = listData;
        const value = getFieldsValue();
        // if (!value.searchContent) {
        //     delete value.searchContent
        //     delete value.searchType
        // }
        if (value.searchContent) {
            value.searchContent = value.searchContent.split("\n").map(v => v && v.trim()).filter(v => !!v)
        }
        return {
            pageNumber: params.pageNumber,
            pageData: params.pageData,
            ...value
        }
    }

    getList = (pageNumber, pageData) => {
        const { getListAsync } = this.props;
        const value = this.getParams();
        if (pageNumber) {
            value.pageNumber = pageNumber
        }
        if (pageData) {
            value.pageData = pageData
        }
        getListAsync(value)

    }

    // 重置
    resetFields = () => {
        this.props.form.resetFields();
    }

    render() {
        const { visible } = this.state;
        const {
            listData,
            getViewListAsync,
            getLogAsync,
            addAsync,
            updateAsync,
            delAsync,
            getSiteAsync,
            getPlatformAsync,
            getAccountAsync,
            checkAccount,
            menuInfos
        } = this.props;
        return (
            <div className="pbh-qee-list_container yks-erp-search_order">
                <div>
                    <NewSearch
                        form={this.props.form}
                        getList={this.getList}
                        resetFields={this.resetFields}
                        getSiteAsync={getSiteAsync}
                        getPlatformAsync={getPlatformAsync}
                        getAccountAsync={getAccountAsync}
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
                        onSearch={this.getList}
                        searchContent="searchContent"
                    />
                </div>
                <div className="margin-sm-top bgcfff">
                    <Table
                        menuInfos={menuInfos}
                        listData={listData}
                        getList={this.getList}
                        delAsync={delAsync}
                        checkAccount={checkAccount}
                        getAccountAsync={getAccountAsync}
                        getViewListAsync={getViewListAsync}
                        getLogAsync={getLogAsync}
                        addAsync={addAsync}
                        updateAsync={updateAsync}
                    />
                </div>
            </div>
        )
    }
}

export default Form.create()(App)