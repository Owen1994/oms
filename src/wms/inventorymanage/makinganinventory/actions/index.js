import {
    RECEIVE_PART_LIST,
    LOADING_PART_LIST, PLAN_DETAIL_LOADING_PART_LIST, PLAN_DETAIL_RECEIVE_PART_LIST,
} from '../constants';
import { PLAN_PART_LIST, PART_DETAIL_LIST } from '../constants/Api';
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
    fetchPost(PLAN_PART_LIST, params, 2)
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

// 盘点计划详情
export const queryDetailsPartList = params => (dispatch) => {
    dispatch({
        type: PLAN_DETAIL_LOADING_PART_LIST,
        state: true,
    });
    fetchPost(PART_DETAIL_LIST, params, 2)
        .then((result) => {
            dispatch({
                type: PLAN_DETAIL_LOADING_PART_LIST,
                state: false,
            });
            if (result.state === '000001') {
                dispatch({
                    type: PLAN_DETAIL_RECEIVE_PART_LIST,
                    data: result.data,
                });
            }
        });
};
