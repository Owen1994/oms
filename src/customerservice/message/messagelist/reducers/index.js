import { combineReducers } from 'redux';
import { LIST } from '../constants';
// import { paginationReducer } from '../../../../common/pagination';

// 消息列表
const listReducer = (
    state = {
        data: {
            messageList: [],
            messageStatusList: [],
        },
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
    // paginationReducer,
});

export default rootReducer;
