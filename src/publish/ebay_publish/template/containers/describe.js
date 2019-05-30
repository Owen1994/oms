/**
 * 作者: pzt
 * 描述: 模板管理
 * 时间: 2018/7/27 15:58
 **/
import React from 'react'
import { connect } from 'react-redux'
import Describe from '../components/describe'
import { getDescriptionTemplate} from '../actions/describe'
import  { parseDescribeData } from '../selector/describe'

const mapStateToProps = (state, props) => {
    const loadingState = state.loadingState;
    const describeData = parseDescribeData(state)
    return { loadingState,describeData}
};

export default connect(
    mapStateToProps,
    { getDescriptionTemplate }
)(Describe)
