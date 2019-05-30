import {
    GET_OUT_STOCK_DETAIL_LIST,
    GET_OUT_STOCK_DETAIL_LIST_LOADING,
} from '../constants';

export const outStockDetailsParts = (state = { list: [], total: 0 }, action) => {
    switch (action.type) {
    case GET_OUT_STOCK_DETAIL_LIST:
        return action.data;
    default:
        return state;
    }
};

export const outStockDetailsLoading = (state = false, action) => {
    switch (action.type) {
    case GET_OUT_STOCK_DETAIL_LIST_LOADING:
        return action.state;
    default:
        return state;
    }
};
