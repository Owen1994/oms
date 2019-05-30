import { combineReducers } from 'redux';
import {
    RECEIVE_ANALYSI_LIST,
    LOADING_RECORD_LIST,
} from '../constants';

const dataList = (state = { sum:{customerUnitPrice: null, orderCount: null, salesAmount: null}, countryRanking: [], sellerIdRanking: [] }, action) => {
    switch (action.type) {
    case RECEIVE_ANALYSI_LIST:
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
