/**
 * 作者: pzt
 * 描述: 模板管理
 * 时间: 2018/7/27 15:58
 **/
import React from 'react'
import { connect } from 'react-redux'
import App from '../components'
import {paginationAction,filterAction,getQueueList } from '../action/index'


const mapStateToProps = (state, props) => {
    const queueList = state.queueList;
    const paginationModel = state.paginationModel;
    const filterModel = state.filterModel;
    const visibility = state.visibilityFilter;
    return { queueList,paginationModel,filterModel,visibility }
};

export default connect(
    mapStateToProps,
    { paginationAction,filterAction,getQueueList }
)(App)
