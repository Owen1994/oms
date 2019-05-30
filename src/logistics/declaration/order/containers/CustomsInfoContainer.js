/**
 *作者: 黄建峰
 *功能描述:  *参数说明:
 *时间: 2018/4/17 10:55
 */
import React from 'react'
import { connect } from 'react-redux'
import App from '../components/CustomsInfo'
import { editCustomsDocumentColumn } from '../actions'
import { loadSelectList } from "../actions/SelectList";

const mapStateToProps = (state, props) => {
    const loadState = state.loadState;
    const editColumnsState = state.editColumnsState;
    const selectData = state.selectData;
    return { loadState, editColumnsState, ...props, selectData }
};

export default connect(
    mapStateToProps,
    { editCustomsDocumentColumn, loadSelectList }
)(App)
