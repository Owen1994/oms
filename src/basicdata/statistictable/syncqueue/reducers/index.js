import { combineReducers } from 'redux';
import {
    LOADING_RECORD_LIST,
} from '../constants/ActionTypes';
import procurementData from './exportsyncqueue';
import supplierData from './importsyncqueue';


const loadingRecordState = (state = false, action) => {
    switch (action.type) {
    case LOADING_RECORD_LIST:
        return action.state;
    default:
        return state;
    }
};


const rootReducer = combineReducers({
    procurementData,
    supplierData,
    loadingRecordState,
});

export default rootReducer;
