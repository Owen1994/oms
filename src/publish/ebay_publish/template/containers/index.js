/**
 * 作者: pzt
 * 描述: 模板管理
 * 时间: 2018/7/27 15:58
 **/
import React from 'react'
import { connect } from 'react-redux'
import App from '../components'
import { getTemplateNum } from '../actions'
import  { parseTemplateNumData } from '../selector/index'

const mapStateToProps = (state, props) => {
    const templateNumData = state.templateNumData;
    return { templateNumData }
};

export default connect(
    mapStateToProps,
    { getTemplateNum }
)(App)
