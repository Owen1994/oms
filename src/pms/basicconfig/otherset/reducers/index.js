import { combineReducers } from 'redux';
import {
    RECEIVE_OTHERSET_LIST,
    LOADING_RECORD_LIST,
} from '../constants';

const dataList = (state = { list: [], total: 0 }, action) => {
    switch (action.type) {
    case RECEIVE_OTHERSET_LIST:
        return action.data;
    default:
        return state;
    }
};


const loadingRecordState = (state = false, action) => {
    switch (action.type) {
    case LOADING_RECORD_LIST:
        return action.state;
    default:
        return state;
    }
};


const rootReducer = combineReducers({
    dataList,
    loadingRecordState,
});

export default rootReducer;
