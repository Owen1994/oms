import { combineReducers } from 'redux';
import { list, category } from '../actions';
import { paginationReducer } from '../../../common/pagination';

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

// 公司分类
const category_reducer = (
    state = {
        data: [],
    }, action) => {
    switch (action.type) {
        case category:
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
    category_reducer
});

export default rootReducer
