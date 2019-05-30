/**
 * 作者: pzt
 * 描述: listing 列表页相关action
 * 时间: 2018/7/28 15:39
 **/
import { fetchPost } from '@/util/fetch'
import Api from '../constants/Api'

export const listField = 'getList';


// 列表获取
const getList = (payload) => ({
    type: listField,
    payload
})

const getListAsync = (params) => dispatch => {
    dispatch(getList({
        loading: true,
        list: [],
        total: 0,
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



// 修改接口
const setAmendAsync = (params) => () => fetchPost(Api.amend, params, 2)
    .then(result => {
        if (result.state === '000001') {
            return result
        }
    })

// // 删除接口
// const delAmendAsync = (params) => () => fetchPost(Api.del, params, 2)
//     .then(result => {
//         if (result.state === '000001') {
//             return result
//         }
//     })
// 导入接口
const uploadAsync = (params) => () => fetchPost(Api.upload, params, 1)
    .then(result => {
        if (result.state === '000001') {
            return result
        }
    })
// 获取站点
const getSiteAsync = (params) => () => fetchPost(Api.site, params, 2)
    .then(result => {
        if (result.state === '000001') {
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

// 获取账户分组
const getAccountgroupAsync = (params) => () => fetchPost(Api.accountgroup, params, 2)
    .then(result => {
        if (result.state === '000001') {
            return result.data || []
        }
    })
export default {
    getList,
    getListAsync,
    setAmendAsync,
    // delAmendAsync,
    uploadAsync,
    getSiteAsync,
    getAccountAsync,
    getAccountgroupAsync
}