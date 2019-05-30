import {
    GET_STOCK_DETAIL_LIST,
    GET_STOCK_DETAIL_LIST_LOADING,
} from '../constants';

export const stockDetailsParts = (state = { list: [], total: 0 }, action) => {
    switch (action.type) {
    case GET_STOCK_DETAIL_LIST:
        return action.data;
    default:
        return state;
    }
};

export const stockDetailsLoading = (state = false, action) => {
    switch (action.type) {
    case GET_STOCK_DETAIL_LIST_LOADING:
        return action.state;
    default:
        return state;
    }
};
