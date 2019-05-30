import { combineReducers } from 'redux';
import {
    parts,
    loadingPartState,
} from './part';

const rootReducer = combineReducers({
    parts,
    loadingPartState,
});

export default rootReducer;
