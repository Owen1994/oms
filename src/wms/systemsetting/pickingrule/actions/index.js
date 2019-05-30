import { PART_LIST } from '../constants/Api';
import { fetchPost } from '../../../../util/fetch';
import * as TYPES from '../constants';

export const receivePartList = (dispatch, data) => {
    dispatch({
        type: TYPES.RECEIVE_PART_LIST,
        data,
    });
};

export const queryPartList = params => (dispatch) => {
    dispatch({
        type: TYPES.LOADING_PART_LIST,
        state: true,
    });
    fetchPost(PART_LIST, params, 2)
        .then((result) => {
            dispatch({
                type: TYPES.LOADING_PART_LIST,
                state: false,
            });
            if (result.state === '000001') {
                receivePartList(dispatch, result.data);
            }
        });
};

// 平台优先级设置方法
export const addPlatformItem = params => dispatch => dispatch({ type: TYPES.ADD_PLATFORM_ITEM, ...params });
export const delPlatformItem = params => dispatch => dispatch({ type: TYPES.DELETE_PLATFORM_ITEM, ...params });
export const modifyPlatformItem = params => dispatch => dispatch({ type: TYPES.MODIFY_PLATFORM_ITEM, ...params });
export const initPlatformItem = params => dispatch => dispatch({ type: TYPES.INIT_PLATFORM_ITEM, ...params });
export const clearPlatformItem = params => dispatch => dispatch({ type: TYPES.CLEAR_PLATFORM_ITEM, ...params });

// 渠道优先级设置方法
export const addChannelItem = params => dispatch => dispatch({ type: TYPES.ADD_CHANNEL_ITEM, ...params });
export const delChannelItem = params => dispatch => dispatch({ type: TYPES.DELETE_CHANNEL_ITEM, ...params });
export const modifyChannelItem = params => dispatch => dispatch({ type: TYPES.MODIFY_CHANNEL_ITEM, ...params });
export const initChannelItem = params => dispatch => dispatch({ type: TYPES.INIT_CHANNEL_ITEM, ...params });
export const clearChannelItem = params => dispatch => dispatch({ type: TYPES.CLEAR_CHANNEL_ITEM, ...params });
