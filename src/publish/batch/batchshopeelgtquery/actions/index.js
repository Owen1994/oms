import * as types from '../constants/ActionTypes'
import {post} from '../../../../util/axios'
import {
    datasaddkey
} from "../../../../util/baseTool"
import {PUBLISH_PLATFORM,PUBLISH_SITE,PUBLISH_ACCOUNT} from "../../../common/constants/actionTypes"
// http://192.168.201.211:9090/mockjsdata/27
const listUrl = "/listing/base/query/IListingImportStatusService/query"
const inportFileUrl = "/listing/base/dataimport/IListingImportControlService/importFile"
export const getListAction = text => ({ type: types.list, payload:text })
export const setListParamsAction = text => ({ type: types.params, payload:text })
export const loadingAction = text => ({ type: types.loading, payload:text })
export const changeSearchOptionAction = text => ({ type: types.changeSearchOptionData, payload:text })

export const getListActionAsync = (params)=>dispatch=>{
    dispatch(loadingAction(true))
    return post(listUrl,{data:params})
    .then(data=>{
        dispatch(loadingAction(false))
        if(data.state === "000001"){
            var result = data.data || {list:[],total:0};
            dispatch(getListAction(result))
            dispatch(setListParamsAction(params))
            return result
        }
    })
    .catch(err=>{
        dispatch(loadingAction(false))
    })
}

export const searchPlatform = (params)=>dispatch=>{
    return post(PUBLISH_PLATFORM,{data:params})
    .then(data=>{
        if(data.state === "000001"){
            var result = (data.data && data.data.list) || [];
            // dispatch(changeSearchOptionAction({
            //     platform:datasaddkey(result)
            // }))
            // return result
            return datasaddkey(result)
        }
    })
}
export const searchSite = (params)=>dispatch=>{
    return post(PUBLISH_SITE,{data:params})
    .then(data=>{
        if(data.state === "000001"){
            var result = (data.data && data.data.list) || [];
            // dispatch(changeSearchOptionAction({
            //     site:datasaddkey(result)
            // }))
            // return result
            return datasaddkey(result)
        }
    })
}
export const searchAccount = (params)=>dispatch=>{
    return post(PUBLISH_ACCOUNT,{data:params})
    .then(data=>{
        if(data.state === "000001"){
            var result = (data.data && data.data.list) || [];
            // dispatch(changeSearchOptionAction({
            //     accounts:datasaddkey(result)
            // }))
            // return result
            return datasaddkey(result)
        }
    })
}
export const importFileAction = (params)=>dispatch=>{
    return post(inportFileUrl,params)
    .then(data=>{
        if(data.state === "000001"){
            return data
        }
    })
}