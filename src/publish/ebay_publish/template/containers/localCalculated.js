/**
 * 作者: pzt
 * 描述: 模板管理
 * 时间: 2018/7/27 15:58
 **/
import React from 'react'
import { connect } from 'react-redux'
import LocalCalculated from '../components/transport/localCalculated'
import {addService,deleteService,modifyServiveItem,resetServiveItem} from '../actions/service'




const mapStateToProps = (state, props) => {
    const localCalcullatedServiceList = state.transportAllData.serviceData.domesticShippingPolicyInfoServiceArr
    return {localCalcullatedServiceList, ...props}
};

export default connect(
    mapStateToProps,
    { addService,deleteService,modifyServiveItem,resetServiveItem }
)(LocalCalculated)
