import {
    GET_COMPARE_DETAIL_LIST,
    GET_COMPARE_DETAIL_LIST_LOADING,
} from '../constants';

export const compareDetailParts = (state = { list: [], total: 0 }, action) => {
    switch (action.type) {
    case GET_COMPARE_DETAIL_LIST:
        return action.data;
    default:
        return state;
    }
};

export const compareDetailLoading = (state = false, action) => {
    switch (action.type) {
    case GET_COMPARE_DETAIL_LIST_LOADING:
        return action.state;
    default:
        return state;
    }
};
