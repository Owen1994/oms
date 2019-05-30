/**
 *作者: 黄建峰
 *功能描述:  *参数说明:
 *时间: 2018/4/17 10:55
 */
import { combineReducers } from 'redux'

import * as types from '../constants/ActionTypes'

export const visibilityFilter = (state = {}, action) => {
    switch(action.type) {
        case 'SHOW_ALL':
            return action.type;
        default:
            return state
    }
};

// 分页数据
const paginationModel = (state = {
    current: 1,
    total: 0,
    pageSize: 10
}, action) => {
    switch (action.type) {
        case "PAGINATION_TYPE":
            return {
                ...state,
                ...action.data
            };
        default:
            return state;
    }
}

// 搜索条件数据
const filterDataModel = (state = {}, action) => {
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

// SKU税率列表数据
export const skuRateListModel = (state={
    data: [],
    total: 100,
    loading: true,
}, action) =>{
    switch(action.type){
        case types.RECEIVE_SKU_RATE_LIST:
            return {
                ...state,
                ...action.data,
            }
        default: 
            return state
    }
}

//税率列表数据
export const rateListModel = (state = {
    data: [],
    total: 100,
    loading: true,
}, action) => {
    switch (action.type) {
        case types.RECEIVE_RATE_LIST:
            return {
                ...state,
                ...action.data,
            }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    visibilityFilter,
    paginationModel,
    filterDataModel,
    skuRateListModel,
    rateListModel,
});

export default rootReducer
