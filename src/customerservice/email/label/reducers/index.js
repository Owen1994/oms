import { combineReducers } from 'redux';
import { FETCH_LIST, PLATFORM_LIST } from '../constants/index';
import { paginationReducer } from '../../../../common/pagination';

// 列表
const listReducer = (
    state = {
        // data: [],
        loading: true,
    }, action,
) => {
    switch (action.type) {
    case FETCH_LIST:
        return {
            ...state,
            ...action.payload,
        };
    default:
        return state;
    }
};

// 平台列表
const platformlistReducer = (state = {}, action) => {
    switch (action.type) {
    case PLATFORM_LIST:
        return {
            ...state,
            ...action.payload,
        };
    default:
        return state;
    }
};

const rootReducer = combineReducers({
    listReducer,
    paginationReducer,
    platformlistReducer,
});

export default rootReducer;
