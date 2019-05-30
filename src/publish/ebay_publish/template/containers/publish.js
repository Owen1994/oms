/**
 * 作者: pzt
 * 描述: 模板管理
 * 时间: 2018/7/27 15:58
 **/
import React from 'react'
import { connect } from 'react-redux'
import Publish from '../components/publish'
import { getPublishTemplate } from '../actions/publish'
import { parsePublishData } from '../selector/publish'




const mapStateToProps = (state, props) => {
    const loadingState = state.loadingState;
    const publishData = parsePublishData(state)

    return { loadingState,publishData}
};

export default connect(
    mapStateToProps,
    { getPublishTemplate  }
)(Publish)
