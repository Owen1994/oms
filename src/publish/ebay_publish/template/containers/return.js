/**
 * 作者: pzt
 * 描述: 模板管理
 * 时间: 2018/7/27 15:58
 **/
import React from 'react'
import { connect } from 'react-redux'
import Return from '../components/return'
import { getReturnTemplate} from '../actions/return'
import  { parseReturnData } from '../selector/return'

const mapStateToProps = (state, props) => {
    const loadingState = state.loadingState;
    const returnData = parseReturnData(state)
    return { loadingState,returnData}
};

export default connect(
    mapStateToProps,
    { getReturnTemplate }
)(Return)
