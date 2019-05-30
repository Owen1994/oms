import {
    searchShopeeAccount,
    shopeeUpdateAuth,
    delShopeeAccountAuth,
    shopeeDetails
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
    return fetchPost(searchShopeeAccount, params, 2)
        .then(result => {
            if (result.state === '000001') {
                let p = {
                    list: result.data.data,
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
    return fetchPost(shopeeUpdateAuth, params, 1)
}

const deleteAuthAsync = params => () => {
    return fetchPost(delShopeeAccountAuth, params, 1)
}
const setJoomAuthorizationEnabledDisable = (params)=>dispatch=>{
    return fetchPost(`/oms/order/manage/motan/service/api/IOrderManageService/JoomAuthorizationEnabledDisable`, params)
        .then(response => {
            if (response.state == '000001') {
                return response
            }
        })
}

const getShopeeDetailsAsync = (params)=> dispatch =>{
    return fetchPost(shopeeDetails , params , 2)
        .then(response => {
            if (response.state == '000001') {
                return response.data
            }
        })
}
export default {
    getJoomAuthList,
    getJoomAuthListAsync,
    refreshAuthAsync,
    deleteAuthAsync,
    getShopeeDetailsAsync,
    setJoomAuthorizationEnabledDisable
}