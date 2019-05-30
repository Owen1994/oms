import {
    RECEIVE_TASK_LIST,
    RECEIVE_LOADING_TASK_STATE,
} from '../constants/index';

/**
 * 待核查任务列表更新数据
 * @param {*} state 默认数据
 * @param {*} action
 */
export const tasks = (state = { list: [], total: 0 }, action) => {
    switch (action.type) {
    case RECEIVE_TASK_LIST:
        return action.data;
    default:
        return state;
    }
};

/**
 * 待核查任务更新状态数据
 * @param {*} state 默认数据
 * @param {*} action
 */
export const loadingTaskObj = (state = { loadingTaskState: false }, action) => {
    switch (action.type) {
    case RECEIVE_LOADING_TASK_STATE:
        return action.loadingObj;
    default:
        return state;
    }
};
