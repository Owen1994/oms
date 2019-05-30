/**
 * 作者: pzt
 * 描述: 模板管理
 * 时间: 2018/7/27 15:58
 **/
import React from 'react'
import { connect } from 'react-redux'
import LocalService from '../components/transport/localService'
import {resetServiveItem,resetdatalist} from '../actions/service'
import {resetRetSite} from '../actions'




const mapStateToProps = (state, props) => {
    const domesticShippingType = state.transportAllData.serviceData.domesticShippingType;
    return { domesticShippingType,...props}
};

export default connect(
    mapStateToProps,
    { resetServiveItem,resetdatalist,resetRetSite}
)(LocalService)
