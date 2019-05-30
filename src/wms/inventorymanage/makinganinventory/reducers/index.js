import { combineReducers } from 'redux';
import {
    parts,
    loadingPartState,
} from './part';
import {
    planDetailLoadingPartState,
    planDetailParts,
} from './planPart';

const rootReducer = combineReducers({
    parts,
    loadingPartState,
    planDetailLoadingPartState,
    planDetailParts,
});

export default rootReducer;
