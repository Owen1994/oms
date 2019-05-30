/**
 *作者: 黄建峰
 *功能描述:  *参数说明:
 *时间: 2018/4/17 10:55
 */
import { combineReducers } from 'redux'

import {
    RECEIVE_OPERATION_LOG_LIST,
} from "../constants/ActionTypes"
import {LOADING_STATE, LOADED_STATE} from "../../constant";

const visibilityFilter = (state = {}, action) => {
    switch(action.type) {
        case 'SHOW_ALL':
            return action.type;
        default:
            return state
    }
};

export const loadState = (state = {}, action) => {
    switch (action.type) {
        case LOADED_STATE: {
            const rType = action.rType;
            state[rType] = LOADED_STATE;
            return state;
        }
        case LOADING_STATE: {
            const rType = action.rType;
            state[rType] = LOADING_STATE;
            return state;
        }
        default:
            return state;
    }
};

// 操作日志列表数据
export const operationList = (state = {
        total: 0,
        data: [],
        loading: true,
    }, action) => {
    switch (action.type) {
        case RECEIVE_OPERATION_LOG_LIST:
            return {
                ...state,
                ...action.data,
            };
        default:
            return state
    }
};

// 分页数据
const paginationModel = (state = {
    current: 1,
    total: 0,
    pageSize: 10,
}
    , action) => {
    switch (action.type) {
        case "PAGINATION_TYPE":
            return {
                ...state,
                ...action.data,
            };
        default:
            return state;
    }
}

// 筛选条件数据
const filterModel = (state={}, action) => {
    switch (action.type) {
        case "FILTER_TYPE":
            return {
                ...state,
                ...action.data
            };
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    visibilityFilter,
    loadState,
    operationList,
    paginationModel,
    filterModel,
});

export default rootReducer
