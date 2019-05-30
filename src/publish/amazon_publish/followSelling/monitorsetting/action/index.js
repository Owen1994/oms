import { fetchPost } from '@/util/fetch'
import Api from '../constants/api'

export const listField = 'getList';


// 列表获取
const getList = (payload) => ({
    type: listField,
    payload
})

const getListAsync = (params) => dispatch => fetchPost(Api.list, params, 2)
    .then(result => {
        dispatch(getList({
            loading: true
        }))
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


// 查看
const getViewListAsync = (params) => () => fetchPost(Api.view, params, 2)
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

// 导入接口
const uploadAsync = (params) => () => fetchPost(Api.upload, params, 1)
    .then(result => {
        if (result.state === '000001') {
            return result
        }
    })
// 新增
const addAsync = (params) => () => fetchPost(Api.addSetting, params, 1)
    .then(result => {
        if (result.state === '000001') {
            return result
        }
    })
// 修改
const updateAsync = (params) => () => fetchPost(Api.updateSetting, params, 1)
    .then(result => {
        if (result.state === '000001') {
            return result
        }
    })
// 删除
const delAsync = (params) => () => fetchPost(Api.del, params, 1)
    .then(result => {
        if (result.state === '000001') {
            return result
        }
    })

export default {
    getList,
    getListAsync,
    getViewListAsync,
    getSiteAsync,
    getAccountAsync,
    uploadAsync,
    addAsync,
    updateAsync,
    delAsync
}