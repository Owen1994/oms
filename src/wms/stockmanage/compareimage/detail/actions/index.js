import {
    RECEIVE_PART_LIST,
    LOADING_PART_LIST,
} from '../constants';
import { fetchPost } from '../../../../../util/fetch';
import ITEM_DETAILS from '../constants/Api';

const receiveData = (dispatch, data) => {
    dispatch({
        type: RECEIVE_PART_LIST,
        data,
    });
};

const queryData = params => (dispatch) => {
    dispatch({
        type: LOADING_PART_LIST,
        state: true,
    });
    fetchPost(ITEM_DETAILS, params, 2)
        .then((result) => {
            dispatch({
                type: LOADING_PART_LIST,
                state: false,
            });
            if (result.state === '000001') {
                receiveData(dispatch, result.data);
            }
        });
};

export default queryData;
