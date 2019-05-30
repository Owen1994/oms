
import {
    RECEIVE_TASK_LIST,
    RECEIVE_ORDER_LIST,
    RECEIVE_LOADING_TASK_STATE,
    RECEIVE_LOADING_ORDER_STATE,
} from '../constants';

import { fetchPost } from '../../../../util/fetch';
import { REVIEW_TASK_AND_ORDER_API } from '../constants/Api';

const receiveTaskList = (dispatch, data) => {
    dispatch({
        type: RECEIVE_TASK_LIST,
        data,
    });
};

const receiveOrderList = (dispatch, data) => {
    dispatch({
        type: RECEIVE_ORDER_LIST,
        data,
    });
};


/**
 * 加载待核查任务列表
 */
export const queryTaskList = params => (dispatch) => {
    dispatch({
        type: RECEIVE_LOADING_TASK_STATE,
        loadingObj: { loadingTaskState: true },
    });

    fetchPost(REVIEW_TASK_AND_ORDER_API, params)
        .then((result) => {
            dispatch({
                type: RECEIVE_LOADING_TASK_STATE,
                loadingObj: { loadingTaskState: false },
            });
            if (result.state === '000001') {
                receiveTaskList(dispatch, result.data);
            }
        });
};


/**
 * 加载待审核订单列表
 */
export const queryOrderList = params => (dispatch) => {
    dispatch({
        type: RECEIVE_LOADING_ORDER_STATE,
        loadingObj: { loadingOrderState: true },
    });
    fetchPost(REVIEW_TASK_AND_ORDER_API, params)
        .then((result) => {
            dispatch({
                type: RECEIVE_LOADING_ORDER_STATE,
                loadingObj: { loadingOrderState: false },
            });
            if (result.state === '000001') {
                receiveOrderList(dispatch, result.data);
            }
        });
};
