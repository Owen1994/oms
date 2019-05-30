import { combineReducers } from 'redux';
import { LIST, LOG_LIST } from '../constants';
import { paginationReducer } from '../../../../common/pagination';

// 邮箱绑定列表
const listReducer = (
    state = {
        data: [],
        statusList: [],
        loading: true,
    }, action,
) => {
    switch (action.type) {
    case LIST:
        return {
            ...state,
            ...action.payload,
        };
    default:
        return state;
    }
};

// 绑定记录列表
const logListReducer = (
    state = {
        data: [],
    }, action,
) => {
    switch (action.type) {
    case LOG_LIST:
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
    logListReducer,
});

export default rootReducer;
