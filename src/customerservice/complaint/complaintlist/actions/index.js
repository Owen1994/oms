import {
    DIPUTE_LIST,
    DIPUTE_LOADING,
    COMMENT_LIST,
    COMMENT_COUNT,
    COMMENT_LOADING,
    GET_DISPUTE_LIST,
    GET_COMMENT_LIST,
    GET_COMMENT_COUNT,
} from '../constants';
import { fetchPost } from '../../../../util/fetch';

// 获取纠纷列表
export const diputelistAction = value => ({
    type: DIPUTE_LIST,
    payload: value,
});
export const disputelistFetch = value => (dispatch) => {
    dispatch({
        type: DIPUTE_LOADING,
        payload: true,
    });
    return fetchPost(GET_DISPUTE_LIST, value, 2)
        .then((data) => {
            if (data && data.state === '000001') {
                dispatch(diputelistAction(data.data));
            } else if (data !== true) {
                dispatch(diputelistAction([]));
            }
        })
        .finally(() => {
            dispatch({
                type: DIPUTE_LOADING,
                payload: false,
            });
        })
};

// 获取评价状态统计(V1.2.3.2)
export const commentCountAction = value => ({
    type: COMMENT_COUNT,
    payload: value,
});

// 获取评论列表
export const commentlistAction = value => ({
    type: COMMENT_LIST,
    payload: value,
});
export const commentlistFetch = value => (dispatch) => {
    dispatch({
        type: COMMENT_LOADING,
        payload: true,
    });
    // 获取评价状态统计
    fetchPost(GET_COMMENT_COUNT, value, 2)
        .then((data) => {
            if (data && data.state === '000001') {
                const res = data.data;
                dispatch(commentCountAction({
                    stateNumber: res,
                    totalNumber: [res.pendingReplyNumber, res.pendingLeaveNumber, res.replyedNumber, res.overdueNumber]
                }));
            }
        });
    fetchPost(GET_COMMENT_LIST, value, 2)
        .then((data) => {
            if (data && data.state === '000001') {
                dispatch({
                    type: COMMENT_LOADING,
                    payload: false,
                });
                dispatch(commentlistAction({
                    ...data.data,
                }));
            } else if (data !== true) {
                dispatch(commentlistAction({ data: [] }));
            }
        })
        .finally(() => {
            dispatch({
                type: COMMENT_LOADING,
                payload: false,
            });
        })
};

const actions = {
    disputelistFetch,
    commentlistFetch,
};

export default actions;
