import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Form, Spin, message } from 'antd';

import Search from "./search/index";
import List from "./list/index";
import Option from "./opiton";
import actions from '../actions';

import { filterRequest } from '../../../utils';
import {page, path} from '../../../configs';

import Functions from '../../../../components/functions';
import {post} from "../../../../util/axios";

class App extends Component {

    state = {
        tagValue: {
            useState: [1],
            sensitivityGrade: [0],
            reason: [0],
            isSensitive: [0]
        },
        useState: [1],
        skuId: []
    }

    // 请求列表
    listFetch = (pageNumber, pageData ) => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const filter = filterRequest(values)
                filter['pageNumber'] = pageNumber || page.defaultCurrent;
                filter['pageData'] = pageData || page.defaultPageSize;
                filter['useState'] = values.useState || [1];
                const filters = { ...this.state.tagValue, ...filter}
                this.setState({
                    tagValue: filters
                })
                this.props.list_fetch({ name: 'data', value: filter });
            }
        });
    }

    // 重置
    onReset = () => {
        this.setState({
            tagValue: {
                useState: [1],
                sensitivityGrade: [0],
                reason: [0],
                isSensitive: [0],
            }
        })
        this.props.form.resetFields();
    }

    // 获取使用状态的值
    handleUseState = (state) => {
        this.setState({
            useState: state,
            skuId: []
        });
    }

    // 请求
    commonRequest = (url, value) => {
        post(path.irp + url, value).then(data=>{
            if(data && data.state === "000001"){
                message.success('操作成功.');
                this.listFetch();
                this.setState({ skuId: [] });
            }
        })
    }



    render() {
        const { loading } = this.props.list_reducer;
        const { skuId, useState } = this.state;
        const rowSelection = {
            selectedRowKeys: skuId,
            onChange: (selectedRowKeys) => {
                this.setState({ skuId: selectedRowKeys });
            }
        };
        return (
            <Functions { ...this.props } isPage={true} functionkey="007-000001-000002-001">
                <div className="data-sku">
                    <Search {...this.props} listFetch={this.listFetch} tagValue={this.state.tagValue} onReset={this.onReset} handleUseState={this.handleUseState}/>
                    <div className="breadcrumb padding-sm overflow-hidden margin-sm-top">
                        <Spin spinning={loading} delay={500}>
                            <Option {...this.props} listFetch={this.listFetch} useState={useState} skuId={skuId} commonRequest={this.commonRequest}/>
                            <List {...this.props} useState={useState} listFetch={this.listFetch} rowSelection={rowSelection}/>
                        </Spin>
                    </div>
                </div>
            </Functions>
        );
    }
}

export default connect(
    state => ({ ...state }),
    dispatch => bindActionCreators(actions, dispatch)
)(
    Form.create()(App)
);