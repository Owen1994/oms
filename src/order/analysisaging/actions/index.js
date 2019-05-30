import { fetchPost } from 'util/fetch';

import {
    RECEIVE_LIST,
    LOADING_LIST,
    GET_LIST_BY_PLAT,
    GET_LIST_BY_ORDER,
    GET_LIST_BY_ACCOUNT,
} from '../constants';

const receiveList = (dispatch, data) => {
    dispatch({
        type: RECEIVE_LIST,
        payload: data,
    });
};

const getTableList = paramObj => (dispatch) => {
    dispatch({
        type: LOADING_LIST,
        state: true,
    });
    let url = GET_LIST_BY_PLAT;
    switch(paramObj.type) {
        case 'account': url = GET_LIST_BY_ACCOUNT; break;
        case 'order': url = GET_LIST_BY_ORDER; break;
        default: url = GET_LIST_BY_PLAT;
    }
    fetchPost(url, { ...paramObj.params }, 2)
        .then((result) => {
            if (result.state === '000001') {
                dispatch({
                    type: LOADING_LIST,
                    state: false,
                });
                receiveList(dispatch, { data: result.data });
                if(result.total) {
                    receiveList(dispatch, { total: result.total });
                }
            }
        });
};

export default  getTableList;
