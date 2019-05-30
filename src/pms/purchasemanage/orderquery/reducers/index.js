import { combineReducers } from 'redux';
import { orderQueryListState, orderQueryListLoading } from './TableList';

const rootReducer = combineReducers({
    getOrderQueryList: orderQueryListState,
    isLoading: orderQueryListLoading,
});

export default rootReducer;
