import {post} from '../../../../util/axios'
import {api_url} from '../../../../util/connectConfig'
import {datasaddkey} from '../../../../util/baseTool'
import fiter from "./filter"
import commonactions from '../../../../common/actions/commonactions'
export const tableData = "tracknumbermanage-tableData";
export const loading = "tracknumbermanage-changeLoading";
export const platform = "tracknumbermanage-platform";
import { fetchPost } from 'util/fetch';


const changeLoading = (data) => ({
    type: loading,
    payload:data
});

const tableDataAction = (data) => ({
    type: tableData,
    payload:data
});

const tableDataActionAsync= params => (dispatch)=>{
    dispatch(changeLoading( true))
    return post(`${api_url}/oms/order/manage/motan/OmsTrackingNumberPoolApi/selectTrackingNumberPoolPage`, params).then(data=>{
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

// const getPlatformAction = (data) => ({
//     type: platform,
//     payload:data
// });
const getPlatformActionAsync = (params)=>(dispatch)=>{
    return post(`${api_url}/oms/order/manage/motan/ICompanyOrderManageApi/getPlatform`,params)
    .then(result=>{
        if(result && result.state === "000001" ){
            return result
        }
    })
    .catch(err=>{
        console.log(err)
    })
}
// 导入
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
// 获取跟踪号抓取job信息
const getTrackingJobAction = ()=>(dispatch)=>{
    return post(`${api_url}/oms/order/manage/motan/OmsTrackingNumberPoolApi/getTrackingNumberJobDetail`)
    .then(result=>{
        if(result && result.state === "000001" ){
            return result.data
        }
    })
    .catch(err=>{
        console.log(err)
    })
}
// 启动/终止跟踪号抓取job
// status	0-停止，1-启动
const controlTrackingAction = (params)=>(dispatch)=>{
    return post(`${api_url}/oms/order/manage/motan/OmsTrackingNumberPoolApi/startOrStopJob`,params)
    .then(result=>{
        if(result && result.state === "000001" ){
            return result
        }
    })
    .catch(err=>{
        console.log(err)
    })
}
// 导出
const exportTrackingAction = (params)=>(dispatch)=>{
    return fetchPost(`/oms/order/manage/motan/OmsTrackingNumberPoolApi/exportTrackingNumberPool`,params, 1);
}
// 导出JOOM订单数据
const exportJoomTrackingAction = (params)=>(dispatch)=>{
    return fetchPost(`/oms/order/manage/motan/OmsTrackingNumberPoolApi/exportJoomPlatformOrders`,params, 1);
}
// 获取模板链接
const exportTempAction = (params)=>(dispatch)=>{
    return post(`${api_url}/oms/order/manage/motan/OmsTrackingNumberPoolApi/getTrackingNumberTemplateUrl`,params)
    .then(result=>{
        if(result && result.state === "000001" ){
            return result.data
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
    getTrackingJobAction,
    controlTrackingAction,
    exportTrackingAction,
    exportTempAction,
    exportJoomTrackingAction,
}
