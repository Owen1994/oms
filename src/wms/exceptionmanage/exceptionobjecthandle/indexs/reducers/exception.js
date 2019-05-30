import {
    RECEIVE_EXCEPTION_LIST,
    LOADING_EXCEPTION_LIST,
} from '../constants';

export const exceptions = (state = { list: [], total: 0 }, action) => {
    switch (action.type) {
    case RECEIVE_EXCEPTION_LIST:
        return action.data;
    default:
        return state;
    }
};

export const loadingExceptionState = (state = false, action) => {
    switch (action.type) {
    case LOADING_EXCEPTION_LIST:
        return action.state;
    default:
        return state;
    }
};
