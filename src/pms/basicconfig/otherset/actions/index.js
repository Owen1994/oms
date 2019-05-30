import { fetchPost } from '../../../../util/fetch';

import {
    PROCUREMENT_ROLE_SUPPLIER_DATA,
    RECEIVE_OTHERSET_LIST,
    LOADING_RECORD_LIST,
} from '../constants';

const receiveOthersetList = (dispatch, data) => {
    dispatch({
        type: RECEIVE_OTHERSET_LIST,
        data,
    });
};

const getOthersetList = params => (dispatch) => {
    dispatch({
        type: LOADING_RECORD_LIST,
        state: true,
    });
    fetchPost(PROCUREMENT_ROLE_SUPPLIER_DATA, params)
        .then((result) => {
            dispatch({
                type: LOADING_RECORD_LIST,
                state: false,
            });
            if (result.state === '000001') {
                receiveOthersetList(dispatch, result.data);
            }
        });
};

export default getOthersetList;
