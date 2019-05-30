import {post} from '../../../../../util/axios'
import {
    message
} from "antd"
import {
    datasaddkey,
    timestampFromat
} from "../../../../../util/baseTool"

// var apiurl = "http://localhost:8282/mockjsdata/18"
var apiurl = ""
export const comInfo = "npd-handover-com-info";
export const loadingInfo = "npd-handover-loading";
export const clearDetial = "npd-handover-clear-Detial";

const detailAction = (data) => ({
    type: comInfo,
    payload:data
});

const detailActionAsync= params =>{
    return post(`${apiurl}/pim/motan/service/api/IPimService/getProductDeliveryDetail`, params).then(data=>{
        if(data && data.state === "000001"){
            return data.data
        }
    })
}
const reviewActionAsync= params =>{
    var p = {
       ...params,
       bizId:params.id,
       formId:"NpsProductDelivery"
    }
    return post(`${apiurl}/pim/motan/service/api/IPimService/getAuditHis`, p).then(data=>{
        if(data && data.state === "000001"){
            return {review:datasaddkey(data.data)}
        }
    })
}
const getDetailAsync = params => (dispatch)=>{
    dispatch(changeLoading( true))
    Promise.all([
        detailActionAsync(params),
        reviewActionAsync(params),
    ]).then(result=>{
        dispatch(changeLoading( false))
        var obj = {};
        if(result && result.length){
            result.forEach(v=>{
                v && (obj = {
                    ...obj,
                    ...v
                })
            })
            dispatch(detailAction(obj))
            return obj
        }
        return false
    })
    .catch(e=>{
        dispatch(changeLoading( false))
        console.log(e)
    })
}
const changeLoading = function(value){
    return {
        type:loadingInfo,
        payload:value
    }
}
const clearDetialAction = (data) => ({
    type: clearDetial,
    payload:data
});
const comReviewActionAsync = (params)=>(dispatch)=>{
    return post(`${apiurl}/pim/motan/service/api/IPimService/auditConfirmWithComment`,params)
    .then(result=>{
        if(result && result.state === "000001" ){
            return result
        }
        message.error(result.msg)
    })
    .catch(err=>{
        console.log(err)
    })
}
export default {
    comReviewActionAsync,
    clearDetialAction,
    detailAction,
    getDetailAsync,
    changeLoading
}
