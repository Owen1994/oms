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
        accountData: [],
        siteData: [],
        visible: false,
    }
    componentDidMount() {
        this.getList()
        this.setSite()
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
        const { getFieldsValue } = this.props.form;
        const { listData } = this.props;
        const { params } = listData;
        const value = getFieldsValue();
        if (!value.searchContent) {
            delete value.searchContent
            delete value.searchType
        }
        value.pageNumber = params.pageNumber
        value.pageData = params.pageData
        return value
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
        getListAsync({
            data: value
        })

    }

    // 重置
    resetFields = () => {
        this.props.form.resetFields();
    }

    render() {
        const { getParams } = this;
        const { visible, siteData } = this.state;
        const {
            listData,
            getViewListAsync,
            getAccountAsync,
            getLogAsync,
            addAsync,
            updateAsync,
            uploadAsync,
            delAsync,
            menuInfos
        } = this.props;
        return (
            <div className="pbh-qee-list_container yks-erp-search_order">
                <div>
                    <NewSearch
                        form={this.props.form}
                        getList={this.getList}
                        resetFields={this.resetFields}
                        siteData={siteData}
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
                        siteData={siteData}
                        getList={this.getList}
                        delAsync={delAsync}
                        uploadAsync={uploadAsync}
                        getParams={getParams}
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