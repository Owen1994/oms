import {
    RECEIVE_ORDER_LIST,
    RECEIVE_LOADING_ORDER_STATE,
} from '../constants/index';
/**
 * 待审核订单列表更新数据
 * @param {*} state 默认数据
 * @param {*} action
 */
export const orders = (state = { list: [], total: 0 }, action) => {
    switch (action.type) {
    case RECEIVE_ORDER_LIST:
        return action.data;
    default:
        return state;
    }
};

/**
 * 待审核订单更新状态数据
 * @param {*} state 默认数据
 * @param {*} action
 */
export const loadingOrderObj = (state = { loadingOrderState: false }, action) => {
    switch (action.type) {
    case RECEIVE_LOADING_ORDER_STATE:
        return action.loadingObj;
    default:
        return state;
    }
};
