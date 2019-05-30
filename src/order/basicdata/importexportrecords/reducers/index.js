import { combineReducers } from 'redux';
import {
    RECEIVE_IMPORT_LIST,
    LOADING_RECORD_LIST
} from '../constants';

const dataList = (state = { data: [], total: 0 }, action) => {
    switch (action.type) {
    case RECEIVE_IMPORT_LIST:
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
