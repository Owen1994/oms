import {
    RECEIVE_REJECTS_LIST,
    LOADING_REJECTS_LIST,
} from '../constants';
import { GET_REJECTS_LIST } from '../constants/Api';
import { fetchPost } from '../../../../util/fetch';

const receiveRejectsList = (dispatch, data) => {
    dispatch({
        type: RECEIVE_REJECTS_LIST,
        data,
    });
};

// 获取异常实物数据列表
export const queryRejectsList = params => (dispatch) => {
    dispatch({
        type: LOADING_REJECTS_LIST,
        state: true,
    });
    fetchPost(GET_REJECTS_LIST, params, 2)
        .then((result) => {
            dispatch({
                type: LOADING_REJECTS_LIST,
                state: false,
            });
            if (result.state === '000001') {
                receiveRejectsList(dispatch, result.data);
            }
        });
};

// 清空列表数据
export const clearRejectsList = () => (dispatch) => {
    receiveRejectsList(dispatch, { list: [] });
};
