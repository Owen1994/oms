import {
    RECEIVE_REJECTS_LIST,
    LOADING_REJECTS_LIST,
} from '../constants';

export const rejects = (state = { list: [], total: 0 }, action) => {
    switch (action.type) {
    case RECEIVE_REJECTS_LIST:
        return action.data;
    default:
        return state;
    }
};

export const loadingRejectsState = (state = false, action) => {
    switch (action.type) {
    case LOADING_REJECTS_LIST:
        return action.state;
    default:
        return state;
    }
};
