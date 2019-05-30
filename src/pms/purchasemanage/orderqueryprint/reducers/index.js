import { combineReducers } from 'redux';
import {
    GET_ORDER_PRINT_DETAILS_ACCESS,
    PRINT_ACCESS_LOADING,
} from '../constants/index';

export const orderQueryPrintObj = (state = [{ skuList: [], info: {}, infoCard: {}, listCard: [] }], action) => {
    switch (action.type) {
    case GET_ORDER_PRINT_DETAILS_ACCESS:
        return action.data;
    default:
        return state;
    }
};

export const loadingState = (state = false, action) => {
    switch (action.type) {
    case PRINT_ACCESS_LOADING:
        return action.data;
    default:
        return state;
    }
};


const rootReducer = combineReducers({
    orderQueryPrintObj,
    loadingState,
});

export default rootReducer;
