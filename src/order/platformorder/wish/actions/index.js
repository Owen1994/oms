import {
    RECEIVE_WISHORDER_LIST,
    LOADING_WISHORDER_LIST,
    RECEIVE_WISHORDER_DETAIL,
    RECEIVE_WISHORDER_TAB_STATE,
    RECEIVE_WISHORDER_TAG_STATE,
} from '../constants/index'
import * as API from '../constants/api'
import { fetchPost } from '../../../../util/fetch';

//请求wish订单列表action
const receiveWishOrderList = (dispatch, data) => {
    dispatch({
        type: RECEIVE_WISHORDER_LIST,
        data
    })
}
//请求wish弹窗详情action
const receiveWishOrderDetail = (dispatch, data) => {
    dispatch({
        type: RECEIVE_WISHORDER_DETAIL,
        data
    })
}
//请求wish订单页签数据action
const receiveWishOrderTabState = (dispatch, data) => {
    dispatch({
        type: RECEIVE_WISHORDER_TAB_STATE,
        data
    })
}
//请求wish订单标记状态数据action
const receiveWishOrderTagState = (dispatch, data) => {
    dispatch({
        type: RECEIVE_WISHORDER_TAG_STATE,
        data
    })
}

//请求wish订单列表数据方法
export const queryWishOrderList = (params) => dispatch => {
    dispatch({
        type: LOADING_WISHORDER_LIST,
        state: true
    })
    fetchPost(API.GET_WISH_ORDER_LIST, params, 2)
        .then(result => {
            dispatch({
                type: LOADING_WISHORDER_LIST,
                state: false
            })
            if(result.state === '000001'){
                receiveWishOrderList(dispatch, result.data)
            }
        })
}

//请求wish订单弹窗详情方法
export const queryWishOrderDetail = (params) => dispatch => {
    fetchPost(API.GET_WISH_ORDER_DETAIL, params, 2)
        .then(result => {
            if(result.state === '000001'){
                receiveWishOrderDetail(dispatch, result.data)
            }
        })
}

//请求wish订单页签数据方法
export const queryWishOrderTabState = () => dispatch => {
    fetchPost(API.GET_WISH_TAB_STATE, {}, 2)
        .then(result => {
            if(result.state === '000001'){
                receiveWishOrderTabState(dispatch, result.data)
            }
        })
}

//请求wish订单标记状态数据方法
export const queryWishOrderTagState = (params) => dispatch => {
    fetchPost(API.GET_WISH_TAG_STATE, params, 2)
        .then(result => {
            if(result.state === '000001'){
                receiveWishOrderTagState(dispatch, result.data)
            }
        })
}
