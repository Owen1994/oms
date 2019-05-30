import { combineReducers } from 'redux';
import {
    RECEIVE_DATA_LIST,
    LOADING_LIST,
} from '../../constants/ActionTypes';

const dataList = (state = { list: [], total: 0 }, action) => {
    switch (action.type) {
    case RECEIVE_DATA_LIST:
        return action.data;
    default:
        return state;
    }
};


const loadingState = (state = false, action) => {
    switch (action.type) {
    case LOADING_LIST:
        return action.state;
    default:
        return state;
    }
};


const rootReducer = combineReducers({
    dataList,
    loadingState,
});

export default rootReducer;
