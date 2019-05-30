import {
    RECEIVE_TABLE_LIST,
    LOADING_TABLE_LIST,
    RECEIVE_CAPACITY_STATE,
    RECEIVE_PRIORITY,
    CHANGE_SELECTED,
} from '../constants';
import {
    GET_LIST,
    GET_STATE,
    GET_PRIORITY,
} from '../constants/Api';
import { fetchPost } from '@/util/fetch';

/**
 * 列表选中项
 */
const changeSelectedAction = value => (dispatch) => {
    dispatch({
        type: CHANGE_SELECTED,
        payload: value,
    })
}

/**
 * 获取列表数据
 * @param {*} params 搜索参数
 */
const queryTableList = params => (dispatch) => {
    dispatch({
        type: LOADING_TABLE_LIST,
        state: true,
    });
    fetchPost(GET_LIST, params, 2)
        .then((result) => {
            dispatch({
                type: LOADING_TABLE_LIST,
                state: false,
            });
            if (result.state === '000001') {
                dispatch({
                    type: RECEIVE_TABLE_LIST,
                    data: result.data,
                });
            }
        });
};

/**
 * 获取库存状态及数量
 * @param {*} params 搜索参数
 */
const queryCapacityState = params => (dispatch) => {
    fetchPost(GET_STATE, params || {}, 2)
        .then((result) => {
            if (result.state === '000001') {
                dispatch({
                    type: RECEIVE_CAPACITY_STATE,
                    data: result.data.data,
                });
            }
        });
};

/**
 * 获取发货优先级及数量
 * @param {*} params 搜索参数
 */
const queryPriorityType = params => (dispatch) => {
    fetchPost(GET_PRIORITY, params || {}, 2)
        .then((result) => {
            if (result.state === '000001') {
                dispatch({
                    type: RECEIVE_PRIORITY,
                    data: result.data.data,
                });
            }
        });
};

export default {
    queryTableList,
    queryCapacityState,
    queryPriorityType,
    changeSelectedAction,
};
