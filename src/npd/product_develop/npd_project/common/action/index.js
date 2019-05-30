import {post} from '../../../../../util/axios'
import {api_url} from '../../../../../util/connectConfig'
import {
    datasaddkey,
    timestampFromat
} from "../../../../../util/baseTool"

// var api_url = "http://localhost:8282/mockjsdata/18"
export const comInfo = "npd-project-com-info";
export const loadingInfo = "npd-project-com-loadingInfo";
export const clearDetail = "npd-project-com-clear";

const projectDetailAction = (data) => ({
    type: comInfo,
    payload:data
});

const projectDetailActionAsync= params =>{
    return post(`${api_url}/pim/motan/service/api/IPimService/getProductApprovalDetail`, params).then(data=>{
        if(data && data.state === "000001"){
            return {
                projectDetail:data.data,
                id : data.data.id
            }
        }
    })
}
const comReviewActionAsync= params =>{
    var p = {
        ...params,
        bizId:params.id,
        formId:"NpsApprovalProduct"
    }
    return post(`${api_url}/pim/motan/service/api/IPimService/getAuditHis`, p).then(data=>{
        if(data && data.state === "000001"){
            return {
                review:datasaddkey(data.data || [])
            }
        }
    })
}
const comMarketDetailActionAsync= params =>{
    return post(`${api_url}/pim/motan/service/api/IPimService/getProductDetail`, params).then(data=>{
        if(data && data.state === "000001"){
            return {
                market:data.data
           }
        }
    })
}
const comSupplierDetailActionAsync= (params,dispatch) => {
    return post(`${api_url}/pim/motan/service/api/IPimService/getSupplierDetail`, params).then(data=>{
        if(data && data.state === "000001"){
            var reuslt = data.data || []
           dispatch(projectDetailAction({
                supplier:datasaddkey(data.data || [])
           }))
           return reuslt
        }
    })
}

const getDetailAsync = params => (dispatch)=>{
    dispatch(changeLoading(true))
    return Promise.all([
        projectDetailActionAsync(params),
        comMarketDetailActionAsync(params)
    ]).then(result=>{
        var obj = {};
        if(result && result.length){
            result.forEach(v=>{
                v && (obj = {
                    ...obj,
                    ...v
                })
            })
            dispatch(projectDetailAction(obj))
            dispatch(changeLoading(false))
            return obj
        }
        return false
    })
    .catch(e=>{
        dispatch(changeLoading(false))
        console.log(e)
    })
}

const getProductDetailAsync = params => (dispatch)=>{
    dispatch(changeLoading(true))
    return Promise.all([
        projectDetailActionAsync(params),
        comReviewActionAsync(params),
        comMarketDetailActionAsync(params),
    ]).then(result=>{
        var obj = {};
        if(result && result.length){
            result.forEach(v=>{
                v && (obj = {
                    ...obj,
                    ...v
                })
            })
            dispatch(projectDetailAction(obj))
            dispatch(changeLoading(false))
            return obj
        }
        return false
    })
    .then(result=>{
        if(result && result.projectDetail){
            var projectCode =  result.projectDetail.projectCode
            return comSupplierDetailActionAsync({projectCode},dispatch)
        }
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
export const clearDetailAction = function(value){
    return {
        type:clearDetail,
    }
}
export default {
    comSupplierDetailActionAsync,
    clearDetailAction,
    getDetailAsync,
    changeLoading,
    projectDetailAction,
    getProductDetailAsync,
}
