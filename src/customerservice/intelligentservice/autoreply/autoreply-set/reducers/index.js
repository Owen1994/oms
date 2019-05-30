import { combineReducers } from 'redux';
import {
    receiveListInfo,
    platformListInfo,
} from '../actions/index';

// ebay订单列表数据reducer
export const autoreplySetList = (state = {
    list: [],
    total: 0,
    params: {
        pageNumber: 1,
        pageData: 20,
    },
    loading: false,
}, action) => {
    switch (action.type) {
    case receiveListInfo:
        return {
            ...state,
            ...action.payload,
        };
    default:
        return state;
    }
};

export const platformList = (state = [], action) => {
    switch (action.type) {
    case platformListInfo:
        return action.payload;
    default:
        return state;
    }
};

const rootReducer = combineReducers({
    autoreplySetList,
    platformList,
});

export default rootReducer;
