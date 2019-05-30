import { combineReducers } from 'redux';
import {
    listdata,
    loadingTableState,
    channelobtaindata,
    exceptiontypedata,
    selectedRowKeys,
} from './listdata';

const rootReducer = combineReducers({
    listdata,
    loadingTableState,
    channelobtaindata,
    exceptiontypedata,
    selectedRowKeys,
});

export default rootReducer;
