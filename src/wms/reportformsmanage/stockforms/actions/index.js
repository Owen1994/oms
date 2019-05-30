import {
    GET_COMPARE_DETAIL_LIST,
    GET_COMPARE_DETAIL_LIST_LOADING,
    GET_COMPARE_DRAWER_LIST,
    GET_COMPARE_DRAWER_LOADING,
    GET_COMPARE_LIST,
    GET_COMPARE_LIST_LOADING,
    GET_QUALITYTEST_DETAIL_LIST,
    GET_QUALITYTEST_DETAIL_LIST_LOADING,
    GET_QUALITYTEST_DRAWER_LIST,
    GET_QUALITYTEST_DRAWER_LIST_LOADING,
    GET_QUALITYTEST_LIST,
    GET_QUALITYTEST_LIST_LOADING,
    GET_RECEIVIE_GOODS_DETAIL_LIST,
    GET_RECEIVIE_GOODS_DETAIL_LIST_LOADING,
    GET_RECEIVIE_GOODS_DRAWER_LIST, GET_RECEIVIE_GOODS_DRAWER_LIST_LOADING,
    GET_RECEIVIE_GOODS_LIST,
    GET_RECEIVIE_GOODS_LIST_LOADING,
} from '../constants';
import {
    COMPARE_DETAIL_LIST,
    COMPARE_LIST,
    QUALITYTEST_DETAIL_LIST,
    QUALITYTEST_LIST,
    RECEIVIE_GOODS_DETAIL_LIST,
    RECEIVIE_GOODS_LIST,
} from '../constants/Api';
import { fetchPost } from '../../../../util/fetch';

const receiveRejectsList = (dispatch, type, data) => {
    dispatch({
        type,
        data,
    });
};

// 对图报表
export const queryCompareList = params => (dispatch) => {
    dispatch({
        type: GET_COMPARE_LIST_LOADING,
        state: true,
    });
    fetchPost(COMPARE_LIST, params, 2)
        .then((result) => {
            dispatch({
                type: GET_COMPARE_LIST_LOADING,
                state: false,
            });
            if (result.state === '000001') {
                receiveRejectsList(dispatch, GET_COMPARE_LIST, result.data);
            }
        });
};

// 对图明细报表
export const queryCompareDetailList = (params, isDrawer) => (dispatch) => {
    dispatch({
        type: isDrawer ? GET_COMPARE_DRAWER_LOADING : GET_COMPARE_DETAIL_LIST_LOADING,
        state: true,
    });
    fetchPost(COMPARE_DETAIL_LIST, params, 2)
        .then((result) => {
            dispatch({
                type: isDrawer ? GET_COMPARE_DRAWER_LOADING : GET_COMPARE_DETAIL_LIST_LOADING,
                state: false,
            });
            if (result.state === '000001') {
                receiveRejectsList(dispatch, isDrawer ? GET_COMPARE_DRAWER_LIST : GET_COMPARE_DETAIL_LIST, result.data);
            }
        });
};

// 质检报表
export const queryQualitryTestList = params => (dispatch) => {
    dispatch({
        type: GET_QUALITYTEST_LIST_LOADING,
        state: true,
    });
    fetchPost(QUALITYTEST_LIST, params, 2)
        .then((result) => {
            dispatch({
                type: GET_QUALITYTEST_LIST_LOADING,
                state: false,
            });
            if (result.state === '000001') {
                receiveRejectsList(dispatch, GET_QUALITYTEST_LIST, result.data);
            }
        });
};

// 质检明细报表
export const queryQualitryTestDetailList = (params, isDrawer) => (dispatch) => {
    dispatch({
        type: isDrawer ? GET_QUALITYTEST_DRAWER_LIST_LOADING : GET_QUALITYTEST_DETAIL_LIST_LOADING,
        state: true,
    });
    fetchPost(QUALITYTEST_DETAIL_LIST, params, 2)
        .then((result) => {
            dispatch({
                type: isDrawer ? GET_QUALITYTEST_DRAWER_LIST_LOADING : GET_QUALITYTEST_DETAIL_LIST_LOADING,
                state: false,
            });
            if (result.state === '000001') {
                receiveRejectsList(dispatch, isDrawer ? GET_QUALITYTEST_DRAWER_LIST : GET_QUALITYTEST_DETAIL_LIST, result.data);
            }
        });
};

// 收货报表
export const queryReceivieGoodsList = params => (dispatch) => {
    dispatch({
        type: GET_RECEIVIE_GOODS_LIST_LOADING,
        state: true,
    });
    fetchPost(RECEIVIE_GOODS_LIST, params, 2)
        .then((result) => {
            dispatch({
                type: GET_RECEIVIE_GOODS_LIST_LOADING,
                state: false,
            });
            if (result.state === '000001') {
                receiveRejectsList(dispatch, GET_RECEIVIE_GOODS_LIST, result.data);
            }
        });
};

// 收货明细报表
export const queryReceivieGoodsDetailList = (params, isDrawer) => (dispatch) => {
    dispatch({
        type: isDrawer ? GET_RECEIVIE_GOODS_DRAWER_LIST_LOADING : GET_RECEIVIE_GOODS_DETAIL_LIST_LOADING,
        state: true,
    });
    fetchPost(RECEIVIE_GOODS_DETAIL_LIST, params, 2)
        .then((result) => {
            dispatch({
                type: isDrawer ? GET_RECEIVIE_GOODS_DRAWER_LIST_LOADING : GET_RECEIVIE_GOODS_DETAIL_LIST_LOADING,
                state: false,
            });
            if (result.state === '000001') {
                receiveRejectsList(dispatch, isDrawer ? GET_RECEIVIE_GOODS_DRAWER_LIST : GET_RECEIVIE_GOODS_DETAIL_LIST, result.data);
            }
        });
};
// 清空列表数据
export const clearRejectsList = type => (dispatch) => {
    receiveRejectsList(dispatch, type, { list: [] });
};
