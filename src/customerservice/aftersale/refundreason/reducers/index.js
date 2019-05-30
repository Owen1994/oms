import { combineReducers } from 'redux';
import {
    REFUND_REASON_LIST, REFUND_FORM_LIST, REFUND_REASON_LOADING, REFUND_FORM_LOADING,
} from '../constants';

// 退款原因分类列表
const refundReasonList = (state = { data: [], total: 0 }, action) => {
    switch (action.type) {
    case REFUND_REASON_LIST:
        return action.payload;
    default:
        return state;
    }
};

// loading
const refundReasonLoading = (state = false, action) => {
    switch (action.type) {
    case REFUND_REASON_LOADING:
        return action.payload;
    default:
        return state;
    }
};

// 自定义表单列表
const refundFormList = (state = { data: [], total: 0 }, action) => {
    switch (action.type) {
    case REFUND_FORM_LIST:
        return action.payload;
    default:
        return state;
    }
};

// loading
const refundFormLoading = (state = false, action) => {
    switch (action.type) {
    case REFUND_FORM_LOADING:
        return action.payload;
    default:
        return state;
    }
};

const rootReducer = combineReducers({
    refundReasonList,
    refundFormList,
    refundReasonLoading,
    refundFormLoading,
});

export default rootReducer;
