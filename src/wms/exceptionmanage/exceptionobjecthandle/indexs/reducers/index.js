import { combineReducers } from 'redux';
import {
    exceptions,
    loadingExceptionState,
} from './exception';

const rootReducer = combineReducers({
    exceptions,
    loadingExceptionState,
});

export default rootReducer;
