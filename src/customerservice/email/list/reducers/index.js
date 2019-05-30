import { combineReducers } from 'redux';
import { FETCH_LIST } from '../constants/index';
import { paginationReducer } from '../../../../common/pagination';

// 列表
const listReducer = (
    state = {
        readStateList: [],
        operateStateList: [],
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

const rootReducer = combineReducers({
    listReducer,
    paginationReducer,
});

export default rootReducer;
