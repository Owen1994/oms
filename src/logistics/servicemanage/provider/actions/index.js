import { fetchPost } from '../../../../util/fetch';

import {
    RECEIVE_DATA_LIST,
    LOADING_STATE,
} from '../constants';
import {
    DATA_LIST_API,
} from '../constants/Api';

const receiveDataList = (dispatch, data) => {
    dispatch({
        type: RECEIVE_DATA_LIST,
        data,
    });
};

export const loadDataList = params => (dispatch) => {
    dispatch({
        type: LOADING_STATE,
        state: true,
    });
    fetchPost(DATA_LIST_API, params)
        .then((result) => {
            dispatch({
                type: LOADING_STATE,
                state: false,
            });
            if (result.state === '000001') {
                receiveDataList(dispatch, result.data);
            }
        });
};
