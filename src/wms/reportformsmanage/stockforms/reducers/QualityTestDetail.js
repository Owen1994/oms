import {
    GET_QUALITYTEST_DETAIL_LIST, GET_QUALITYTEST_DETAIL_LIST_LOADING,
} from '../constants';

export const qualityTestDetailParts = (state = { list: [], total: 0 }, action) => {
    switch (action.type) {
    case GET_QUALITYTEST_DETAIL_LIST:
        return action.data;
    default:
        return state;
    }
};

export const qualityTestDetailLoading = (state = false, action) => {
    switch (action.type) {
    case GET_QUALITYTEST_DETAIL_LIST_LOADING:
        return action.state;
    default:
        return state;
    }
};
