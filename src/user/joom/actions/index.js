import {
    searchJoomAccount,
    joomupdateAuth,
    delJoomAccountAuth
} from '../constants/Api'
import { fetchPost } from '@/util/fetch';

export const joomAuthList = 'getJoomAuthList'

//请求ebay授权列表action
const getJoomAuthList = (payload) => {
    return {
        type: joomAuthList,
        payload
    }
}

const getJoomAuthListAsync = params => dispatch => {
    return fetchPost(searchJoomAccount, params, 2)
        .then(result => {
            if (result.state === '000001') {
                let p = {
                    list: result.data.list,
                    total: result.data.total,
                    loading: false,
                }
                if (params) {
                    p.params = params.data
                }
                dispatch(getJoomAuthList(p))
            }
        })
}

const refreshAuthAsync = params => () => {
    return fetchPost(joomupdateAuth, params, 1)
}

const deleteAuthAsync = params => () => {
    return fetchPost(delJoomAccountAuth, params, 1)
}
const setJoomAuthorizationEnabledDisable = (params)=>dispatch=>{
    return fetchPost(`/oms/order/manage/motan/service/api/IOrderManageService/JoomAuthorizationEnabledDisable`, params)
        .then(response => {
            if (response.state == '000001') {
                return response
            }
        })
}
export default {
    getJoomAuthList,
    getJoomAuthListAsync,
    refreshAuthAsync,
    deleteAuthAsync,
    setJoomAuthorizationEnabledDisable
}