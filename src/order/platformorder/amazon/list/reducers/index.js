import { combineReducers } from 'redux';
import { Receive_Amazon_List, Receive_Amazon_List_State } from '../constants/index';

export const amazonListObj = (state = { data: [], total: 0 }, action) => {
    switch (action.type) {
        case Receive_Amazon_List:
            return action.data;
        default:
            return state;
    }
};

export const amazonListloadingObj = (state = { loadingState: false }, action) => {
    switch (action.type) {
        case Receive_Amazon_List_State:
            return action.loadingObj;
        default:
            return state;
    }
};


const rootReducer = combineReducers({
    amazonListloadingObj,
    amazonListObj,
});

export default rootReducer;
