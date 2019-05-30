import {
    GET_STOCK_LIST,
    GET_STOCK_LIST_LOADING,
} from '../constants';

export const stockParts = (state = { list: [], total: 0 }, action) => {
    switch (action.type) {
    case GET_STOCK_LIST:
        return action.data;
    default:
        return state;
    }
};

export const stockLoading = (state = false, action) => {
    switch (action.type) {
    case GET_STOCK_LIST_LOADING:
        return action.state;
    default:
        return state;
    }
};
