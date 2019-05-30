import {
    GET_OUT_STOCK_LIST, GET_OUT_STOCK_LIST_LOADING,
} from '../constants';

export const outStockParts = (state = { list: [], total: 0 }, action) => {
    switch (action.type) {
    case GET_OUT_STOCK_LIST:
        return action.data;
    default:
        return state;
    }
};

export const outStockLoading = (state = false, action) => {
    switch (action.type) {
    case GET_OUT_STOCK_LIST_LOADING:
        return action.state;
    default:
        return state;
    }
};
