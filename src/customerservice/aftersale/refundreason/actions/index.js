import {
    GET_REFUNDRESON_LIST,
    GET_REFUND_FORM,
    REFUND_REASON_LIST,
    REFUND_FORM_LIST,
    REFUND_REASON_LOADING,
    REFUND_FORM_LOADING,
} from '../constants';
import { fetchPost } from '../../../../util/fetch';

// 退款原因分类列表
export const reasonAction = value => ({
    type: REFUND_REASON_LIST,
    payload: value,
});

export const reasonListFetch = value => (dispatch) => {
    dispatch({
        type: REFUND_REASON_LOADING,
        payload: true,
    });
    fetchPost(GET_REFUNDRESON_LIST, value, 2)
        .then((data) => {
            if (data && data.state === '000001') {
                dispatch({
                    type: REFUND_REASON_LOADING,
                    payload: false,
                });
                dispatch(reasonAction(data.data));
            } else {
                dispatch({
                    type: REFUND_REASON_LOADING,
                    payload: false,
                });
                dispatch(reasonAction([]));
            }
        });
};

// 退款自定义表单
export const formAction = value => ({
    type: REFUND_FORM_LIST,
    payload: value,
});

export const formListFetch = value => (dispatch) => {
    dispatch({
        type: REFUND_FORM_LOADING,
        payload: true,
    });
    fetchPost(GET_REFUND_FORM, value, 2)
        .then((data) => {
            if (data && data.state === '000001') {
                const res = data.data;
                dispatch({
                    type: REFUND_FORM_LOADING,
                    payload: false,
                });
                dispatch(formAction({ data: res }));
            } else {
                dispatch({
                    type: REFUND_FORM_LOADING,
                    payload: false,
                });
                dispatch(formAction([]));
            }
        });
};

const actions = {
    reasonListFetch,
    formListFetch,
};

export default actions;
