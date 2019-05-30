import { combineReducers } from 'redux';
import { list, pagination, datas } from '../actions'

// 列表
const list_reducer = (
    state = {
        data: [],
        loading: true,
    }, action) => {
    switch (action.type) {
        case list:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state
    }
};

//分页
export const paginationReducer = (
    state = {
        current: 1,
        total: 0,
        pageSize: 20,
    }
    , action) => {
    switch (action.type) {
        case pagination:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}

// 其他数据
const data_reducer = (
    state = {
        attachment1: [],
        attachment2: [],
        data: [],
    }, action) => {
    switch (action.type) {
        case datas:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state
    }
};

const rootReducer = combineReducers({
    list_reducer,
    paginationReducer, 
    data_reducer,
});
export default rootReducer
