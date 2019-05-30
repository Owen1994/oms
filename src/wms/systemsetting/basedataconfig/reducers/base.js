import {
    RECEIVE_BASE_LIST,
    LOADING_BASE_LIST,
} from '../constants';

export const bases = (state = { list: [], total: 0 }, action) => {
    switch (action.type) {
    case RECEIVE_BASE_LIST:
        return action.data;
    default:
        return state;
    }
};

export const loadingBaseState = (state = false, action) => {
    switch (action.type) {
    case LOADING_BASE_LIST:
        return action.state;
    default:
        return state;
    }
};
