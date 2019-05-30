import { combineReducers } from 'redux';
import {
    listdata,
    loadingTableState,
    capacitystatedata,
    prioritytypedata,
    selectedRowKeys,
} from './listdata';

const rootReducer = combineReducers({
    listdata,
    loadingTableState,
    capacitystatedata,
    prioritytypedata,
    selectedRowKeys,
});

export default rootReducer;
