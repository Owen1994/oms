/**
 * 作者: pzt
 * 描述: 模板管理
 * 时间: 2018/7/27 15:58
 **/
import { connect } from 'react-redux'
import NewModalModel from '../components/transport/newModalModel'
import {resetServiveItem,resetInitidatalist,resetdatalist} from '../actions/service'
import {initiFormDatalist,resetFormDatalist,resetRetSite} from "../actions"




const mapStateToProps = (state, props) => {
    const serviceData = state.transportAllData.serviceData;
    const outTransportAddress = state.transportAllData.outTransportAddress;
    const formDataList = state.transportAllData.formData;
    const site = state.transportAllData.serviceData.site;

    return {serviceData,outTransportAddress, site, formDataList,...props}
};

export default connect(
    mapStateToProps,
    { resetServiveItem,resetInitidatalist,initiFormDatalist,resetdatalist,resetFormDatalist,resetRetSite}
)(NewModalModel)
