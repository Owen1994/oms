import {
    RECEIVE_TABLE_LIST,
    LOADING_TABLE_LIST,
} from '../constants';
import {} from '../constants/Api';
import { fetchPost } from '../../../../../util/fetch';

const receiveTableList = (dispatch, data) => {
    dispatch({
        type: RECEIVE_TABLE_LIST,
        data,
    });
};

const queryTableList = params => (dispatch) => {
    dispatch({
        type: LOADING_TABLE_LIST,
        state: true,
    });
    fetchPost('', params)
        .then((result) => {
            dispatch({
                type: LOADING_TABLE_LIST,
                state: false,
            });
            if (result.state === '000001') {
                receiveTableList(dispatch, result.data);
            }
        });
};

export default queryTableList;
