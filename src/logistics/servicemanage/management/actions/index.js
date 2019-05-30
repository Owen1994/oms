import {
    fetchPost,
} from '../../../../util/fetch';
import { 
    SHEET_MANAGEMENT
} from '../constants/Api';
import {
    RECEIVE_DATA_LIST,
    LOADING_LIST,
} from '../constants/ActionTypes';

const getDataList = params => (dispatch) => {
    dispatch({
        type: LOADING_LIST,
        state: true,
    });
    fetchPost(SHEET_MANAGEMENT, params).then((result) => {
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
