/**
 *作者: 黄建峰
 *功能描述:  列表分页多选
 *时间: 2018/4/17 10:55
 */
import React from 'react'
import { connect } from 'react-redux'
import App from '../../components/EditableSelectList'
import { searchVluesaction } from '../actions/index'

const mapStateToProps = (state, props) => {
    const searchValues  = state.searchValues;
    return { searchValues, ...props }
};

export default connect(
    mapStateToProps,
    { searchVluesaction }
)(App)
