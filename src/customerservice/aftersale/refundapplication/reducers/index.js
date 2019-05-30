import { combineReducers } from 'redux';
import { REFUND_LIST, REFUND_LIST_LOADING } from '../constants';

// 退款申请订单列表
const refundList = (state = {
    data: [],
    total: 0,
}, action) => {
    switch (action.type) {
    case REFUND_LIST:
        return action.payload;
    default:
        return state;
    }
};

// loading
const refundLoading = (state = false, action) => {
    switch (action.type) {
    case REFUND_LIST_LOADING:
        return action.payload;
    default:
        return state;
    }
};

const rootReducer = combineReducers({
    refundList,
    refundLoading,
});

export default rootReducer;
