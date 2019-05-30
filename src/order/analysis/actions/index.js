import { fetchPost } from '../../../util/fetch';

import {
    GET_ORDER_STAT,
    RECEIVE_ANALYSI_LIST,
    LOADING_RECORD_LIST,
} from '../constants';

const receiveAnalysisList = (dispatch, data) => {
    dispatch({
        type: RECEIVE_ANALYSI_LIST,
        data,
    });
};

const getAnalysisList = params => (dispatch) => {
    dispatch({
        type: LOADING_RECORD_LIST,
        state: true,
    });
    fetchPost(GET_ORDER_STAT, params, 2)
        .then((result) => {
            dispatch({
                type: LOADING_RECORD_LIST,
                state: false,
            });
            if (result.state === '000001') {
                receiveAnalysisList(dispatch, result.data);
            }
        });
};

export default getAnalysisList;
