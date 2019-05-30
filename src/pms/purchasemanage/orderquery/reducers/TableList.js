import { GET_ORDER_QUERY_LIST, ORDER_LIST_LOADING } from '../constants';

export const orderQueryListState = (state = { list: [], total: 0 }, action) => {
    switch (action.type) {
    case GET_ORDER_QUERY_LIST:
        return action.data;
    default:
        return state;
    }
};
export const orderQueryListLoading = (state = false, action) => {
    switch (action.type) {
    case ORDER_LIST_LOADING:
        return action.data;
    default:
        return state;
    }
};
