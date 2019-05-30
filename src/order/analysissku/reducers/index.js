import { combineReducers } from 'redux';
import {
    RECEIVE_ANALYSISKU_LIST,
    LOADING_RECORD_LIST,
} from '../constants';

const data = (state = { skuRanking: [], skuRate: [] }, action) => {
    switch (action.type) {
    case RECEIVE_ANALYSISKU_LIST:
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
    data,
    loadingRecordState,
});

export default rootReducer;
