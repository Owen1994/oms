import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Form, Spin, message } from 'antd';

import Search from "./search/index";
import List from "./list/index";
import Option from "./opiton";
import actions from '../actions';

import { filterRequest } from '../../../utils';
import { page, path } from '../../../configs';

import Functions from '../../../../components/functions';
import { post } from "../../../../util/axios";

class App extends Component {

    state = {
        tagValue: {                 // 重置筛选项
            useState: [1],
            sensitivityGrade: [0],
            activeState: [0],
            isInfringements: [0]
        },
        useState: [1],              // 使用状态
        sensitiveId: [],            // 批量操作时，选取的敏感词ID
    }

    // 请求列表
    listFetch = (pageNumber, pageData) => {
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
                this.props.list_fetch({ name: 'data', value: filter })
                .finally(()=>{
                    this.setState({
                        sensitiveId:[]
                    })
                })
            }
        });
    }

    // 重置
    onReset = () => {
        this.setState({
            tagValue: {
                useState: [1],
                sensitivityGrade: [0],
                activeState: [0],
                isInfringements: [0]
            }
        })
        this.props.form.resetFields();
    }

    // 获取使用状态的值
    handleUseState = (state) => {
        this.setState({
            useState: state,
            sensitiveId: []
        });
    }

    // 请求
    commonRequest = (url, value) => {
        const { current, pageSize } = this.props.paginationReducer;
        post(path.irp + url, value).then(data=>{
            if(data && data.state === "000001"){
                message.success('操作成功.');
                this.listFetch(current, pageSize);
                this.setState({ sensitiveId: [] });
            }
        })
    }


    render() {
        const { loading } = this.props.list_reducer;
        const { useState, sensitiveId } = this.state;
        const rowSelection = {
            selectedRowKeys: sensitiveId,
            onChange: (selectedRowKeys) => {
                this.setState({ sensitiveId: selectedRowKeys });
            }
        };
        return (
            <Functions { ...this.props } isPage={true} functionkey="007-000001-000001-001">
                <div className="sensitive">
                    <Search {...this.props} listFetch={this.listFetch} tagValue={this.state.tagValue} onReset={this.onReset} handleUseState={this.handleUseState}/>
                    <div className="breadcrumb padding-sm overflow-hidden margin-sm-top">
                        <Spin spinning={loading} delay={500}>
                            <Option {...this.props} listFetch={this.listFetch} useState={useState} sensitiveId={sensitiveId} commonRequest={this.commonRequest} />
                            <List useState={useState} {...this.props} listFetch={this.listFetch} rowSelection={rowSelection}/>
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