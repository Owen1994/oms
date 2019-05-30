import {
    GET_COMPARE_LIST,
    GET_COMPARE_LIST_LOADING,
} from '../constants';

export const compareParts = (state = { list: [], total: 0 }, action) => {
    switch (action.type) {
    case GET_COMPARE_LIST:
        return action.data;
    default:
        return state;
    }
};

export const compareLoading = (state = false, action) => {
    switch (action.type) {
    case GET_COMPARE_LIST_LOADING:
        return action.state;
    default:
        return state;
    }
};
