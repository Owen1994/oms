import {
    GET_SHOPEE_ORDER_LIST,
    GET_SHOPEE_TAB_STATE
} from '../constants/Api'
import { fetchPost } from '../../../../../util/fetch';

export const shopeeListInfo = "shopeeListInfo"
export const shopeeTabInfo = "shopeeTabInfo"

//请求shopee订单列表action
const shopeeOrderListAction = (data) => {
    return {
        type: shopeeListInfo,
        payload: data
    }
}

//请求shopee订单页签数据action
const shopeeOrderTabAction = (data) => {
    return {
        type: shopeeTabInfo,
        payload: data
    }
}

//请求shopee订单列表数据方法
export const getShopeeOrderListAsync = (params) => dispatch => {
    dispatch(shopeeOrderListAction({
        loading: true
    }))
    if (params.data.type === -1) {
        delete params.data.type
    }
    fetchPost(GET_SHOPEE_ORDER_LIST, params, 2)
        .then(result => {
            if (result.state === '000001') {
                let { total, list = [] } = result.data;
                dispatch(shopeeOrderListAction({
                    total,
                    list: list.map(v => {
                        v.key = v.platformOrderNumber;
                        return v
                    }),
                    params: params.data
                }))
            }
        })
        .finally(() => {
            dispatch(shopeeOrderListAction({
                loading: false
            }))
        })
}

//请求shopee订单页签数据方法
export const getShopeeOrderTabAsync = () => dispatch => {
    fetchPost(GET_SHOPEE_TAB_STATE, {}, 2)
        .then(result => {
            if (result.state === '000001') {
                let data = (result.data && result.data.sort((a, b) => a.id - b.id)) || [];
                dispatch(shopeeOrderTabAction(data))
            }
        })
}
