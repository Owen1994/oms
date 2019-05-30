/**
 * 作者: pzt
 * 描述: 模板管理
 * 时间: 2018/7/27 15:58
 **/
import React from 'react'
import { connect } from 'react-redux'
import GlobalService from '../components/transport/globalService'
import {resetServiveItem,resetdatalist} from '../actions/service'
import {resetRetSite} from '../actions'




const mapStateToProps = (state, props) => {
    const serviceData = state.transportAllData.serviceData;
    const intlShippingType = state.transportAllData.serviceData.intlShippingType;
    return { serviceData, intlShippingType,...props}
};

export default connect(
    mapStateToProps,
    { resetServiveItem,resetdatalist,resetRetSite }
)(GlobalService)
