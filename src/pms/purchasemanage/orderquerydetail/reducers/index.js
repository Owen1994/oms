import { combineReducers } from 'redux';
import orderDetailsLogState from './OrderDetailLog';
import { orderDetailsAccessState, isCanEditState, isAccessLoadingState, ProductSelectData } from './OrderDetailAccess';

const rootReducer = combineReducers({
    detailAccess: orderDetailsAccessState,
    detailLog: orderDetailsLogState,
    isCanEdit: isCanEditState,
    isAccessLoading: isAccessLoadingState,
    ProductSelectData: ProductSelectData,
});

export default rootReducer;
