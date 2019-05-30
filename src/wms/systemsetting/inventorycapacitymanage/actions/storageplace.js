import {
    RECEIVE_STORAGE_PALCE_LIST,
    LOADING_STORAGE_PALCE_LIST,
} from '../constants/storageplace';
import { GET_PLACE_MANAGE_LIST } from '../constants/Api';
import { fetchPost } from '../../../../util/fetch';

const receiveStoragePlaceList = (dispatch, data) => {
    dispatch({
        type: RECEIVE_STORAGE_PALCE_LIST,
        data,
    });
};

export const queryStoragePlaceList = params => (dispatch) => {
    dispatch({
        type: LOADING_STORAGE_PALCE_LIST,
        state: true,
    });
    fetchPost(GET_PLACE_MANAGE_LIST, params, 2)
        .then((result) => {
            dispatch({
                type: LOADING_STORAGE_PALCE_LIST,
                state: false,
            });
            if (result.state === '000001') {
                receiveStoragePlaceList(dispatch, result.data);
            }
        });
};

// 清空列表数据
export const clearStoragePlaceList = () => (dispatch) => {
    receiveStoragePlaceList(dispatch, { list: [] });
};
