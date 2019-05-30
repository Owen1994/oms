import {
    RECEIVE_PART_LIST,
    LOADING_PART_LIST,
} from '../constants';
import { GET_VERSION_LIST } from '../constants/Api';
import { fetchPost } from '../../../../util/fetch';

const receivePickerList = (dispatch, data) => {
    dispatch({
        type: RECEIVE_PART_LIST,
        data,
    });
};

const queryPickerList = params => (dispatch) => {
    dispatch({
        type: LOADING_PART_LIST,
        state: true,
    });
    fetchPost(GET_VERSION_LIST, params, 2)
        .then((result) => {
            dispatch({
                type: LOADING_PART_LIST,
                state: false,
            });
            if (result.state === '000001') {
                receivePickerList(dispatch, result.data);
            }
        });
};

export default queryPickerList;
