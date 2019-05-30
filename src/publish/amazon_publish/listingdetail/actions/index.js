/**
 * 作者: pzt
 * 描述: listing 详情页相关action
 * 时间: 2018/7/28 15:39
 **/
import { fetchPost } from '@/util/fetch'
import Api from '../constants/api'

export const getDetialAction = "action-getDetial";
export const loadingAction = 'action-loading';

const setLoading = payload => ({
    payload,
    type: loadingAction
})

const setDetial = payload => ({
    payload,
    type: getDetialAction
})

const getDetialAsync = params => dispatch => {
    dispatch(setLoading(true))
    return fetchPost(Api.detail, params, 2)
        .then(result => {
            if (result.state === '000001') {
                dispatch(setDetial(result.data))
                return result
            }
        })
        .finally(() => {
            dispatch(setLoading(false))
        })
}

const publishAsync = params => () => {
    return fetchPost(Api.publish, params, 2)
        .then(result => {
            if (result.state === '000001') {
                return result
            }
        })
}

export default {
    setLoading,
    setDetial,
    getDetialAsync,
    publishAsync
}
