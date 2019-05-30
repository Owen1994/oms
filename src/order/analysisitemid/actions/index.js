import { fetchPost } from 'util/fetch';

import {
    GET_ITEMID_LIST,
    RECEIVE_ITEMID_LIST,
    LOADING_ITEMID_LIST,
} from '../constants';

const receiveItemIDList = (dispatch, data) => {
    dispatch({
        type: RECEIVE_ITEMID_LIST,
        data,
    });
};

const getItemIDList = params => (dispatch) => {
    dispatch({
        type: LOADING_ITEMID_LIST,
        state: true,
    });
    fetchPost(GET_ITEMID_LIST, params, 2)
        .then((result) => {
            if (result.state === '000001') {
                dispatch({
                    type: LOADING_ITEMID_LIST,
                    state: false,
                });
                receiveItemIDList(dispatch, result.data);
            }
        });
};

export default  getItemIDList;
