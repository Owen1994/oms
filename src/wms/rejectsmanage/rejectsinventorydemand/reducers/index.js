import { combineReducers } from 'redux';
import {
    rejects,
    loadingRejectsState,
} from './rejects';

const rootReducer = combineReducers({
    rejects,
    loadingRejectsState,
});

export default rootReducer;
