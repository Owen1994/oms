import {
    fetchPost,
} from '../../../../util/fetch';
import { USER_LIST_LIST } from '../constants/Api';
import {
    RECEIVE_DATA_LIST,
    LOADING_LIST,
} from '../constants/ActionTypes';

const getDataList = params => (dispatch) => {
    dispatch({
        type: LOADING_LIST,
        state: true,
    });
    fetchPost(USER_LIST_LIST, params).then((result) => {
        dispatch({
            type: LOADING_LIST,
            state: false,
        });
        if (result.state === '000001') {
            dispatch({
                type: RECEIVE_DATA_LIST,
                data: result.data,
            });
        }
    });
};
export default getDataList;
