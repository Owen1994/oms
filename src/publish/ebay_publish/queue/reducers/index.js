/**
 *作者: pzt
 *功能描述:  模板管理 reducers
 *参数说明:
 *时间: 2018/7/27 15:48
 */
import { combineReducers } from 'redux'
import { RECEIVE_GALLERY_LIST } from '../constants/index'

const visibilityFilter = (state = {}, action) => {
    switch(action.type) {
        case 'SHOW_ALL':
            return action.type;
        default:
            return state
    }
};

export const queueList = (state = {
    total: 0,
    data: [],
    loading: false,
}, action) => {
    switch (action.type) {
        case RECEIVE_GALLERY_LIST:
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
    queueList,
    paginationModel,
    filterModel,
    visibilityFilter,
});

export default rootReducer
