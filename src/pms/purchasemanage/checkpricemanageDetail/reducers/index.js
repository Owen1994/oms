import { combineReducers } from 'redux';

import {
    priceDetailsDataAcquisitionInfo,
    getPaymentMethodInfo,
} from '../actions/index';

const priceDetailsDataAcquisition = (state = {
    loading: false,
    basicInfo: {},
    supplierArray: [],
}, action) => {
    switch (action.type) {
    case priceDetailsDataAcquisitionInfo:
        return {
            ...state,
            ...action.payload,
        };
    default:
        return state;
    }
};

const paymentMethod = (state = [], action) => {
    switch (action.type) {
    case getPaymentMethodInfo:
        return action.payload;
    default:
        return state;
    }
};

const rootReducer = combineReducers({
    priceDetailsDataAcquisition,
    paymentMethod,
});

export default rootReducer;
