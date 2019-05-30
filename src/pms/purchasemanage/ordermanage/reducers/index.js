import { combineReducers } from 'redux';

import { levelOptions } from '../../../../util/options';

import {
    orderManagement,
    orderManagementAbnormalOrderInfo,
    getOrderException, // 下单异常
} from '../constants';

// const getInitPrams = () => ({
//     pageNumber: levelOptions('pageInit').pagenum,
//     pageData: levelOptions('pageInit').pagedata,
// });

const orderManagementList = (state = {
    loading: false,
    // params: getInitPrams(),
    list: [],
    total: 0,
}, action) => {
    switch (action.type) {
    case orderManagement:
        return {
            ...state,
            ...action.payload,
        };
    default:
        return state;
    }
};

const orderManagementAbnormalOrderList = (state = {
    loading: false,
    // params: getInitPrams(),
    list: [],
    total: 0,
}, action) => {
    switch (action.type) {
    case orderManagementAbnormalOrderInfo:
        return {
            ...state,
            ...action.payload,
        };
    default:
        return state;
    }
};
// 下单异常
const getOrderExceptionList = (state = {
    loading: false,
    // params: getInitPrams(),
    list: [],
    total: 0,
}, action) => {
    switch (action.type) {
    case getOrderException:
        return {
            ...state,
            ...action.payload,
        };
    default:
        return state;
    }
};


const rootReducer = combineReducers({
    orderManagementList,
    orderManagementAbnormalOrderList,
    getOrderExceptionList,
});

export default rootReducer;
