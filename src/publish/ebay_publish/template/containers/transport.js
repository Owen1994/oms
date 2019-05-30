/**
 * 作者: pzt
 * 描述: 模板管理
 * 时间: 2018/7/27 15:58
 **/
import React from 'react'
import { connect } from 'react-redux'
import Transport from '../components/transport'
import { getTransportTemplate} from '../actions/transport'
import  { parseTransportData } from '../selector/transport'
import { getOutTransportAddress } from '../actions/OutTransportAddress'




const mapStateToProps = (state, props) => {
    const loadingState = state.loadingState;
    const transportData = parseTransportData(state)
    return {loadingState,transportData}
};

export default connect(
    mapStateToProps,
    { getTransportTemplate, getOutTransportAddress }
)(Transport)
