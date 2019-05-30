import { combineReducers } from 'redux';

import {
    tasks,
    loadingTaskObj,
} from './WaitingReviewTask';

import {
    orders,
    loadingOrderObj,
} from './WaitingReviewOrder';


const rootReducer = combineReducers({
    tasks,
    orders,
    loadingTaskObj,
    loadingOrderObj,
});

export default rootReducer;
