import {post} from '../../../../../util/axios'
import {
    datasaddkey,
    timestampFromat
} from "../../../../../util/baseTool"

var apiurl = ""
// var apiurl = "http://localhost:8282/mockjsdata/18"
export const comInfo = "npd-fapply-com-info";
export const loadingInfo = "npd-fapply-com-loading";

const detailAction = (data) => ({
    type: comInfo,
    payload:data
});

const detailActionAsync= params =>{
    return post(`${apiurl}/pim/motan/service/api/IPimService/getFirstOrderApply`, params).then(data=>{
        if(data && data.state === "000001"){
            return {
                applyDetail:data.data,
                id:data.data.id
            }
        }
    })
}
const produceActionAsync= params =>{
    return post(`${apiurl}/pim/motan/service/api/IPimService/getFirstOrderApplyDetail`, params).then(data=>{
        if(data && data.state === "000001"){
            return {productInfo:datasaddkey(data.data)}
        }
    })
}
const reviewActionAsync= params =>{
    var p = {
        ...params,
        bizId:params.id,
        formId:"firstOrderApplyProcess"
    }
    return post(`${apiurl}/pim/motan/service/api/IPimService/getAuditHis`, p).then(data=>{
        if(data && data.state === "000001"){
            return {review:datasaddkey(data.data)}
        }
    })
}

const getDetailAsync = params => (dispatch)=>{
    dispatch(changeLoading(true))
    Promise.all([
        detailActionAsync(params),
        produceActionAsync(params),
        reviewActionAsync(params)
    ]).then(result=>{
        dispatch(changeLoading(false))
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
        dispatch(changeLoading(false))
        console.log(e)
    })
}

export const changeLoading = function(value){
    return {
        type:loadingInfo,
        payload:value
    }
}
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
    changeLoading,
    detailAction,
    getDetailAsync,
}
