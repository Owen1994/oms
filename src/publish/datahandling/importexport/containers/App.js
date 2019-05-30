/**
 * 作者: pzt
 * 描述: 速卖通列表页父组件
 * 时间: 2018/4/18 20:24
 **/
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import actions from '../actions'
import Functions from '../../../../components/functions'

import {
    Form,
    message
} from 'antd'

import '../css/css.css'

import Condition from '../components/Condition'; // 条件查询模块
import Tablelist from '../components/Tablelist'; // 列表数据


class Joom extends Component {
    componentDidMount() {
        let params = this.getParams();
        this.getList(params)
    }

    getList = (params) => {
        this.props.getListAsync({ data: params })
            .catch(err => {
                message.error(err.msg || err.message || "请求错误，请尝试刷新")
            })
    }

    getParams = () => {
        const { tablemodel } = this.props;
        const { getFieldsValue } = this.props.form;
        const { params } = tablemodel;
        const value = getFieldsValue();
        if (!value.searchContent) {
            delete value.searchContent
            delete value.searchType
        }
        if (value.status) {
            value.status = value.status[0]
        }
        if (value.createTime && value.createTime.length) {

            value.startTime = value.createTime[0].startOf('day').valueOf()
            value.endTime = value.createTime[1].endOf('day').valueOf()
        }
        delete value.createTime
        value.pageData = params.pageData;
        value.pageNumber = params.pageNumber;
        return value
    }

    render() {
        const { getParams, getList } = this;
        return (
            <Functions {...this.props} isPage={true} functionkey="008-000006-000001-001">
                <div className="newClue smtorder-list">
                    <div className="newCluewk">
                        <Condition {...this.props} getParams={getParams} getList={getList} />
                        <Tablelist {...this.props} getParams={getParams} getList={getList} />
                    </div>
                </div>
            </Functions>
        );
    }
}

export default connect(
    (state) => ({
        ...state
    }), {
        ...actions
    })(Form.create()(Joom));
