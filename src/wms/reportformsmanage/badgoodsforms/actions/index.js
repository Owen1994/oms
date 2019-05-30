import {
    RECEIVE_PART_LIST,
    LOADING_PART_LIST,
} from '../constants';
import { PART_LIST } from '../constants/Api';
import { fetchPost } from '../../../../util/fetch';

const receivePartList = (dispatch, data) => {
    dispatch({
        type: RECEIVE_PART_LIST,
        data,
    });
};

export const queryPartList = params => (dispatch) => {
    dispatch({
        type: LOADING_PART_LIST,
        state: true,
    });
    fetchPost(PART_LIST, params, 2)
        .then((result) => {
            dispatch({
                type: LOADING_PART_LIST,
                state: false,
            });
            if (result.state === '000001') {
                receivePartList(dispatch, result.data);
            }
        });
};

// 清空列表数据
export const clearRejectsList = () => (dispatch) => {
    receivePartList(dispatch, { list: [] });
};

export default queryPartList;
