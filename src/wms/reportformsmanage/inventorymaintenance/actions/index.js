import {
    GET_INVENTORY_LIST,
    GET_INVENTORY_LIST_LOADING,
    GET_OUT_STOCK_DETAIL_LIST,
    GET_OUT_STOCK_DETAIL_LIST_LOADING,
    GET_OUT_STOCK_LIST,
    GET_OUT_STOCK_LIST_LOADING,
    GET_STOCK_DETAIL_LIST,
    GET_STOCK_DETAIL_LIST_LOADING,
    GET_STOCK_LIST,
    GET_STOCK_LIST_LOADING,
} from '../constants';
import {
    INVENTORY_LIST,
    OUT_STOCK_DETAIL_LIST,
    OUT_STOCK_LIST,
    STOCK_DETAIL_LIST,
    STOCK_LIST,
} from '../constants/Api';
import { fetchPost } from '../../../../util/fetch';

const receiveRejectsList = (dispatch, type, data) => {
    dispatch({
        type,
        data,
    });
};

// 盘点列表
export const queryInventoryList = params => (dispatch) => {
    dispatch({
        type: GET_INVENTORY_LIST_LOADING,
        state: true,
    });
    fetchPost(INVENTORY_LIST, params, 2)
        .then((result) => {
            dispatch({
                type: GET_INVENTORY_LIST_LOADING,
                state: false,
            });
            if (result.state === '000001') {
                receiveRejectsList(dispatch, GET_INVENTORY_LIST, result.data);
            }
        });
};

// 入库列表
export const queryStockList = params => (dispatch) => {
    dispatch({
        type: GET_STOCK_LIST_LOADING,
        state: true,
    });
    fetchPost(STOCK_LIST, params, 2)
        .then((result) => {
            dispatch({
                type: GET_STOCK_LIST_LOADING,
                state: false,
            });
            if (result.state === '000001') {
                receiveRejectsList(dispatch, GET_STOCK_LIST, result.data);
            }
        });
};

// 入库明细列表
export const queryStockDetailList = params => (dispatch) => {
    dispatch({
        type: GET_STOCK_DETAIL_LIST_LOADING,
        state: true,
    });
    fetchPost(STOCK_DETAIL_LIST, params, 2)
        .then((result) => {
            dispatch({
                type: GET_STOCK_DETAIL_LIST_LOADING,
                state: false,
            });
            if (result.state === '000001') {
                receiveRejectsList(dispatch, GET_STOCK_DETAIL_LIST, result.data);
            }
        });
};

// 出库列表
export const queryOutStockList = params => (dispatch) => {
    dispatch({
        type: GET_OUT_STOCK_LIST_LOADING,
        state: true,
    });
    fetchPost(OUT_STOCK_LIST, params, 2)
        .then((result) => {
            dispatch({
                type: GET_OUT_STOCK_LIST_LOADING,
                state: false,
            });
            if (result.state === '000001') {
                receiveRejectsList(dispatch, GET_OUT_STOCK_LIST, result.data);
            }
        });
};

// 出库列表
export const queryOutStockDetailList = params => (dispatch) => {
    dispatch({
        type: GET_OUT_STOCK_DETAIL_LIST_LOADING,
        state: true,
    });
    fetchPost(OUT_STOCK_DETAIL_LIST, params, 2)
        .then((result) => {
            dispatch({
                type: GET_OUT_STOCK_DETAIL_LIST_LOADING,
                state: false,
            });
            if (result.state === '000001') {
                receiveRejectsList(dispatch, GET_OUT_STOCK_DETAIL_LIST, result.data);
            }
        });
};
// 清空列表数据
export const clearRejectsList = type => (dispatch) => {
    receiveRejectsList(dispatch, type, { list: [] });
};
