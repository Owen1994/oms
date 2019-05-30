import { fetchPost } from '../../../util/fetch';

import {
    GET_SKU_STAT,
    RECEIVE_ANALYSISKU_LIST,
    LOADING_RECORD_LIST,
} from '../constants';

const receiveAnalysiSkuList = (dispatch, data) => {
    dispatch({
        type: RECEIVE_ANALYSISKU_LIST,
        data,
    });
};

const getAnalysiSkuList = params => (dispatch) => {
    dispatch({
        type: LOADING_RECORD_LIST,
        state: true,
    });
    fetchPost(GET_SKU_STAT, params, 2)
        .then((result) => {
            dispatch({
                type: LOADING_RECORD_LIST,
                state: false,
            });
            if (result.state === '000001') {
                receiveAnalysiSkuList(dispatch, result.data);
            }
        });
};

export default  getAnalysiSkuList;
