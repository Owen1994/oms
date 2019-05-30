import { combineReducers } from 'redux';
import {
    listdata,
    loadingTableState,
} from './listdata';

const rootReducer = combineReducers({
    listdata,
    loadingTableState,
});

export default rootReducer;
