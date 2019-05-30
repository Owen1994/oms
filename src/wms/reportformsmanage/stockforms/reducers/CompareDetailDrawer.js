import {
    GET_COMPARE_DRAWER_LIST, GET_COMPARE_DRAWER_LOADING,
} from '../constants';

export const compareDetailDrawerParts = (state = { list: [], total: 0 }, action) => {
    switch (action.type) {
    case GET_COMPARE_DRAWER_LIST:
        return action.data;
    default:
        return state;
    }
};

export const compareDetailDrawerLoading = (state = false, action) => {
    switch (action.type) {
    case GET_COMPARE_DRAWER_LOADING:
        return action.state;
    default:
        return state;
    }
};
