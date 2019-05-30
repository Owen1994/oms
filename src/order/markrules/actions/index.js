import {post} from '../../../util/axios'
import {api_url} from '../../../util/connectConfig'
import {datasaddkey} from '../../../util/baseTool'
import fiter from "./filter"
import commonactions from '../../../common/actions/commonactions'
export const tableData = "markrules-tableData";
export const loading = "markrules-changeLoading";
export const platform = "markrules-platform";
export const markup = "markrules-getMarkup";
export const selectPlat = "select-platform";

const changeLoading = (data) => ({
    type: loading,
    payload:data
});

const tableDataAction = (data) => ({
    type: tableData,
    payload:data
});

const platformSelect = (value) => ({
    type: selectPlat,
    payload: value,
})

const selectPlatform = (val, fn) => (dispatch) => {
    dispatch(platformSelect(val));
    if(fn) {
        fn();
    }
}

const tableDataActionAsync= params => (dispatch)=>{
    dispatch(changeLoading( true))
    return post(`${api_url}/oms/order/manage/motan/IOrderManageConfigApi/queryFakeMarkRuleConfigList`, params).then(data=>{
        if(data && data.state === "000001"){
            dispatch(tableDataAction({
                list:datasaddkey(data.data),
                total:data.total
            }))
            dispatch(tableDataAction({params}))
        }
        dispatch(changeLoading( false))
    })
    .catch(err=>{
        dispatch(changeLoading( false))
        console.log(err)
    })
}

const getPlatformAction = (data) => ({
    type: platform,
    payload:data
});
const getPlatformActionAsync = (params)=>(dispatch)=>{
    return post(`${api_url}/oms/order/manage/motan/ICompanyOrderManageApi/getPlatform`,params)
    .then(result=>{
        if(result && result.state === "000001" ){
            dispatch(getPlatformAction(result.data))
            return result
        }
    })
    .catch(err=>{
        console.log(err)
    })
}

const importFileActionAcync = (params)=>(dispatch)=>{
    return post(`${api_url}/oms/order/manage/motan/OmsTrackingNumberPoolApi/importTrackingNumberPool`,params)
    .then(result=>{
        if(result && result.state === "000001" ){
            return result
        }
    })
    .catch(err=>{
        console.log(err)
    })
}
const getMarkupAction = (data)=>{
    return {
        type: markup,
        payload:data
    }
}
// 添加或修改标记规则
const markupActionAsync = (params)=>(dispatch)=>{
    return post(`${api_url}/oms/order/manage/motan/IOrderManageConfigApi/addOrUpdateFakeMarkRuleConfig`,params)
    .then(result=>{
        if(result && result.state === "000001" ){
            return result
        }
    })
    .catch(err=>{
        console.log(err)
    })
}
// 获取标记规则详情
const getMarkupActionAsync = (params)=>(dispatch)=>{
    return post(`${api_url}/oms/order/manage/motan/IOrderManageConfigApi/getFakeMarkRuleConfigDetail`,params)
    .then(result=>{
        if(result && result.state === "000001" ){
            if(result.data.appointChannels){
                result.data.appointChannels = result.data.appointChannels.split(",")
            }
            if(result.data.appointLogisticsTypes){
                result.data.appointLogisticsTypes = result.data.appointLogisticsTypes.split(",")
            }
            dispatch(getMarkupAction(result.data))
            return result.data
        }
    })
    .catch(err=>{
        console.log(err)
    })
}
// 删除 
const delMarkupActionAsync = (params)=>(dispatch)=>{
    return post(`${api_url}/oms/order/manage/motan/IOrderManageConfigApi/deleteFakeMarkRuleConfig`,params)
    .then(result=>{
        if(result && result.state === "000001" ){
            return result
        }
    })
    .catch(err=>{
        console.log(err)
    })
    
}
export default {
    ...fiter,
    ...commonactions,
    changeLoading,
    tableDataAction,
    tableDataActionAsync,
    getPlatformActionAsync,
    importFileActionAcync,
    getMarkupAction,
    markupActionAsync,
    getMarkupActionAsync,
    delMarkupActionAsync,
    selectPlatform,
}
