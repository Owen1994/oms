/**
 *作者: 黄建峰
 *功能描述:  *参数说明:
 *时间: 2018/4/17 10:55
 */
import React from 'react'
import { connect } from 'react-redux'
import App from '../components/CheckList'
import {
    editOrderList,
    editListOperation,
    editListColumn,
} from '../actions/CheckList';
import {
    getCheckList
} from '../actions'
import { parseCheckList } from "../selector";

const mapStateToProps = (state, props) => {
    const checkList = parseCheckList(state);
    const loadState = state.loadState;
    return { checkList, loadState, ...props }
};

export default connect(
    mapStateToProps,
    { getCheckList, editOrderList, editListOperation, editListColumn }
)(App)
