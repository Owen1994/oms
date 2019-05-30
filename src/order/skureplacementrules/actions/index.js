import {
    GET_LIST,
    GET_PLATFORM_LIST,
} from '../constants/Api.js';
import { fetchPost } from '@/util/fetch';

export const RECEIVE_LIST = 'receive_list';
export const LOADING_LIST = 'loading_list';
export const RECEIVE_PLATFORM_LIST = 'receive_platform_list';
export const ADD_ITEM = 'add_item';
export const DELETE_ITEM = 'delete_item';
export const MODIFY_ITEM = 'modify_item';
export const EDIT_ITEM = 'edit_item';
export const SAVE_ITEM = 'save_item';
export const INIT_ITEM = 'init_item';
export const CLEAR_ITEM = 'clear_item';

const receiveList = (dispatch, data) => {
    dispatch({
        type: RECEIVE_LIST,
        data,
    });
}

// 请求SKU替换规则列表
export const querySkuReplacementList = params => (dispatch) => {
    dispatch({
        type: LOADING_LIST,
        state: true,
    });
    fetchPost(GET_LIST, params, 2)
        .then(result => {
            dispatch({
                type: LOADING_LIST,
                state: false,
            });
            if(result.state === '000001') {
                receiveList(dispatch, result.data);
            }
        })
}

// 平台列表
export const queryPlatformList = () => (dispatch) => {
    fetchPost(GET_PLATFORM_LIST, {}, 2)
        .then(result => {
            let platformList = [{ 'code': '', 'name': '全部' }];
            if(result.state === '000001') {
                result.data.map(it => {
                    platformList.push({ 'code': it.id, 'name': it.name });
                })
                dispatch({
                    type: RECEIVE_PLATFORM_LIST,
                    data: platformList,
                });
            }
        })
}

// 执行动作
export const addItem = params => dispatch => dispatch({ type: ADD_ITEM, ...params });
export const delItem = params => dispatch => dispatch({ type: DELETE_ITEM, ...params });
export const modifyItem = params => dispatch => dispatch({ type: MODIFY_ITEM, ...params });
export const editItem = params => dispatch => dispatch({ type: EDIT_ITEM, ...params });
export const saveItem = params => dispatch => dispatch({ type: SAVE_ITEM, ...params });
export const initItem = params => dispatch => dispatch({ type: INIT_ITEM, ...params });
export const clearItem = params => dispatch => dispatch({ type: CLEAR_ITEM, ...params });

