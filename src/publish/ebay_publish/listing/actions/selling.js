import Api from '../constants/Api'
import ActionType from '../constants'
import { fetchPost } from '../../../../util/fetch'

export const receiveSellingList = (data) => {
    return {
        type: ActionType.tablemodelInfo,
        data
    }
}
/**
 * 加载正在销售列表数据
 * @param {*} params 
 */
export const querySellingList = (params, key) => dispatch => {
    dispatch({
        type: ActionType.tablemodelInfo,
        data: { loading: true }
    })
    fetchPost(Api.GET_LISTING_LIST, params, 2)
        .then(result => {
            dispatch({
                type: ActionType.tablemodelInfo,
                data: { loading: false }
            })
            if (result.state === '000001') {
                dispatch(receiveSellingList({
                    total: result.data.total,
                    lst: result.data.lst,
                    params, key
                }));
            }
        })
}
// 重复检测
export const checkrepeatAsync = (params) => dispatch => {
    dispatch({
        type: ActionType.tablemodelInfo,
        data: { loading: true }
    })
    dispatch(receiveSellingList({ lst: [], total: 0 }))
    fetchPost(Api.GET_CHECK_LISTING_LIST, params, 2)
        .then(result => {
            dispatch({
                type: ActionType.tablemodelInfo,
                data: { loading: false }
            })
            if (result.state === '000001') {
                dispatch(receiveSellingList({
                    total: result.data.total,
                    lst: result.data.lst,
                    params, key
                }));
            }
        })
}


// 获取当前搜索项的实时数量
export const getNumberofSearch = (params) => dispatch => {
    return fetchPost(Api.NUNBER_OF_SEARCH, params)
        .then(result => {
            if (result.state === '000001') {
                return (result && result.data) || 0
            }
        })
}


// 自动调价
export const autoAdjustAsync = (params) => dispatch => {
    return fetchPost(Api.AUTOADJUST, params, 1)
        .then(result => {
            if (result.state === '000001') {
                return result
            }
        })
}
