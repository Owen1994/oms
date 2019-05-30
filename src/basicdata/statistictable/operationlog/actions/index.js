import {
    fetchPost,
} from '../../../../util/fetch';
import GET_OPERATE_LOG from '../constants/Api';
import {
    RECEIVE_DATA_LIST,
    LOADING_LIST,
} from '../constants/ActionTypes';

const getDataList = params => (dispatch) => {
    dispatch({
        type: LOADING_LIST,
        state: true,
    });
    fetchPost(GET_OPERATE_LOG, params).then((result) => {
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
