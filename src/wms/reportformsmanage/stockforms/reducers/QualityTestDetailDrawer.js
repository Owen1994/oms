import {
    GET_QUALITYTEST_DRAWER_LIST,
    GET_QUALITYTEST_DRAWER_LIST_LOADING,
} from '../constants';

export const qualityTestDetailDrawerParts = (state = { list: [], total: 0 }, action) => {
    switch (action.type) {
    case GET_QUALITYTEST_DRAWER_LIST:
        return action.data;
    default:
        return state;
    }
};

export const qualityTestDetailDrawerLoading = (state = false, action) => {
    switch (action.type) {
    case GET_QUALITYTEST_DRAWER_LIST_LOADING:
        return action.state;
    default:
        return state;
    }
};
