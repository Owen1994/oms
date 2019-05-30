import { combineReducers } from 'redux';
import {
    LOADING_STATE,
} from '../constants/ActionTypes';
import headerData from './Header';
import condtionsData from './Condtions';
import finishConditionData from './FinishCondition';
import executionData from './ExecutionAction';


const loadingRecordState = (state = false, action) => {
    switch (action.type) {
    case LOADING_STATE:
        return action.state;
    default:
        return state;
    }
};


const rootReducer = combineReducers({
    loadingRecordState,
    headerData,
    condtionsData,
    finishConditionData,
    executionData,
});

export default rootReducer;
