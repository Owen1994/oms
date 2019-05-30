import { combineReducers } from 'redux';
import { LIST } from '../constants';

// 列表
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

const rootReducer = combineReducers({
    listReducer,
});

export default rootReducer;
