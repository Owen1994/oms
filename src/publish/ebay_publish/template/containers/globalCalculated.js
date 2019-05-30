/**
 * 作者: pzt
 * 描述: 模板管理
 * 时间: 2018/7/27 15:58
 **/
import React from 'react'
import { connect } from 'react-redux'
import GlobalCalculated from '../components/transport/globalCalculated'
import {addService,deleteService,modifyServiveItem,resetServiveItem} from '../actions/service'




const mapStateToProps = (state, props) => {
    const globalCalculatedserviceList = state.transportAllData.serviceData.intlShippingPolicyInfoServiceArr;
    return {globalCalculatedserviceList, ...props}
};

export default connect(
    mapStateToProps,
    { addService,deleteService,modifyServiveItem,resetServiveItem }
)(GlobalCalculated)
