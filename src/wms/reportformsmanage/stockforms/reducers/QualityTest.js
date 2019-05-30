import {
    GET_QUALITYTEST_LIST, GET_QUALITYTEST_LIST_LOADING,
} from '../constants';

export const qualityTestParts = (state = { list: [], total: 0 }, action) => {
    switch (action.type) {
    case GET_QUALITYTEST_LIST:
        return action.data;
    default:
        return state;
    }
};

export const qualityTestLoading = (state = false, action) => {
    switch (action.type) {
    case GET_QUALITYTEST_LIST_LOADING:
        return action.state;
    default:
        return state;
    }
};
