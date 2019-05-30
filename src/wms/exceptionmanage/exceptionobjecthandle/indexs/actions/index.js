import {
    RECEIVE_EXCEPTION_LIST,
    LOADING_EXCEPTION_LIST,
} from '../constants';
import { GET_SPECIAL_CASE_LIST } from '../constants/Api';
import { fetchPost } from '../../../../../util/fetch';

const receiveExceptionList = (dispatch, data) => {
    dispatch({
        type: RECEIVE_EXCEPTION_LIST,
        data,
    });
};

// 获取异常实物数据列表
export const queryExceptionList = params => (dispatch) => {
    dispatch({
        type: LOADING_EXCEPTION_LIST,
        state: true,
    });
    fetchPost(GET_SPECIAL_CASE_LIST, params, 2)
        .then((result) => {
            dispatch({
                type: LOADING_EXCEPTION_LIST,
                state: false,
            });
            if (result.state === '000001') {
                receiveExceptionList(dispatch, result.data);
            }
        });
};

// 清空列表数据
export const clearExceptionList = () => (dispatch) => {
    receiveExceptionList(dispatch, { list: [] });
};
