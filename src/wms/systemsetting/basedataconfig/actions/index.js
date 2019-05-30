import {
    RECEIVE_BASE_LIST,
    LOADING_BASE_LIST,
} from '../constants';
import { GET_BASE_LIST } from '../constants/Api';
import { fetchPost } from '../../../../util/fetch';

const receiveBaseList = (dispatch, data) => {
    dispatch({
        type: RECEIVE_BASE_LIST,
        data,
    });
};

export const queryBaseList = params => (dispatch) => {
    dispatch({
        type: LOADING_BASE_LIST,
        state: true,
    });
    fetchPost(GET_BASE_LIST, params)
        .then((result) => {
            dispatch({
                type: LOADING_BASE_LIST,
                state: false,
            });
            if (result.state === '000001') {
                receiveBaseList(dispatch, result.data);
            }
        });
};

// 清空列表数据
export const clearBaseList = () => (dispatch) => {
    receiveBaseList(dispatch, { list: [] });
};
