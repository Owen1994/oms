import { combineReducers } from 'redux';
import {
    LIST,
    EDIT_DATA,
} from '../constants';
import { paginationReducer } from '../../../../common/pagination';

// 邮箱绑定列表
const listReducer = (
    state = {
        data: [],
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

// edit弹窗数据
const editModalData = (state = [], action) => {
    switch (action.type) {
    case EDIT_DATA:
        return [
            // ...state,
            ...action.payload,
        ];
    default:
        return state;
    }
};

const rootReducer = combineReducers({
    listReducer,
    paginationReducer,
    editModalData,
});

export default rootReducer;
