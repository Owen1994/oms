import {
    GET_LIST,
    GET_PLATFORM_LIST,
} from '../constants/Api.js';
import { fetchPost } from '@/util/fetch';

export const RECEIVE_LIST = 'receive_list';
export const LOADING_LIST = 'loading_list';

const receiveList = (dispatch, data) => {
    dispatch({
        type: RECEIVE_LIST,
        data,
    });
}

// 请求SKU替换规则列表
export const queryDeliveryPriorityList = params => (dispatch) => {
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
