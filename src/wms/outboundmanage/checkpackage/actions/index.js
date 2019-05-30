import {
    RECEIVE_PART_LIST,
    LOADING_PART_LIST,
} from '../constants';
import { SCAN_SKU } from '../constants/Api';
import { fetchPost } from '../../../../util/fetch';

const receivePartList = (dispatch, data) => {
    dispatch({
        type: RECEIVE_PART_LIST,
        data,
    });
};

export const refreshPartList = data => (dispatch) => {
    receivePartList(dispatch, data);
};

export const queryPartList = (params, callBack) => (dispatch) => {
    dispatch({
        type: LOADING_PART_LIST,
        state: true,
    });
    fetchPost(SCAN_SKU, params, 2)
        .then((result) => {
            dispatch({
                type: LOADING_PART_LIST,
                state: false,
            });
            if (result.state === '000001') {
                receivePartList(dispatch, result.data);
                if (callBack) {
                    callBack();
                }
            }
        });
};
