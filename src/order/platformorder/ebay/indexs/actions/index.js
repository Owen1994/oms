import { 
    RECEIVE_EBAYORDER_LIST,
    LOADING_EBAYORDER_LIST,
    RECEIVE_EBAYORDER_TAB_STATE,
} from '../constants/index'
import {
    GET_EBAY_ORDER_LIST,
    GET_EBAY_TAB_STATE
} from '../constants/Api'
import { fetchPost } from '../../../../../util/fetch';

//请求ebay订单列表action
const receiveEbayOrderList = (dispatch, data) => {
    dispatch({
        type: RECEIVE_EBAYORDER_LIST,
        data
    })
}

//请求ebay订单页签数据action
const receiveEbayOrderTabState = (dispatch, data) => {
    dispatch({
        type: RECEIVE_EBAYORDER_TAB_STATE,
        data
    })
}

//请求ebay订单列表数据方法
export const queryEbayOrderList = (params) => dispatch => {
    dispatch({
        type: LOADING_EBAYORDER_LIST,
        state: true
    })
    fetchPost(GET_EBAY_ORDER_LIST, params, 2)
        .then(result => {
            dispatch({
                type: LOADING_EBAYORDER_LIST,
                state: false
            })
            if(result.state === '000001'){
                receiveEbayOrderList(dispatch, result.data)
            }
        })
}

//请求ebay订单页签数据方法
export const queryEbayOrderTabState = () => dispatch => {
    fetchPost(GET_EBAY_TAB_STATE, {}, 2)
        .then(result => {
            if(result.state === '000001'){
                receiveEbayOrderTabState(dispatch, result.data)
            }
        })
}
