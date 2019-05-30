import { fetchPost } from '@/util/fetch'
import Api from '../constants/api'

export const listField = 'getList';
export const siteField = 'setSite';


// 列表获取
const getList = (payload) => ({
    type: listField,
    payload
})

const getListAsync = (params) => dispatch => {
    dispatch(getList({
        loading: true
    }))
    return fetchPost(Api.list, params, 2)
        .then(result => {
            if (result.state === '000001') {
                const { list, total } = result.data;
                dispatch(getList({
                    list,
                    total,
                    params: params.data
                }))
            }
        })
        .finally(() => {
            dispatch(getList({
                loading: false
            }))
        })
}



// 查看
const getViewListAsync = (params) => () => fetchPost(Api.view, params, 2)
    .then(result => {
        if (result.state === '000001') {
            return result
        }
    })
// 站点设置
const setSite = (payload) => ({
    type: siteField,
    payload
})

// 获取站点
const getSiteAsync = (params) => (dispatch) => fetchPost(Api.site, params, 2)
    .then(result => {
        if (result.state === '000001') {
            dispatch(setSite(result.data))
            return result.data || []
        }
    })
// 获取账户
const getAccountAsync = (params) => () => fetchPost(Api.account, params, 2)
    .then(result => {
        if (result.state === '000001') {
            return result.data || []
        }
    })
// 日志
const getLogAsync = (params) => () => fetchPost(Api.log, params, 2)
    .then(result => {
        if (result.state === '000001') {
            console.log(result.data)
            return result.data || []
        }
    })
// 修改接口
const setAmendAsync = (params) => () => fetchPost(Api.amend, params, 2)
    .then(result => {
        if (result.state === '000001') {
            return result
        }
    })
export default {
    setSite,
    getList,
    getListAsync,
    getViewListAsync,
    getSiteAsync,
    getAccountAsync,
    getLogAsync,
    setAmendAsync
}