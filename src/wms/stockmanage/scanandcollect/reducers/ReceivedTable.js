import {
    RECEIVE_PART_LIST,
    RECEIVE_LOADING_PART_LIST,
} from '../constants';

/**
 * 已收货
 * @param state
 * @param action
 * @returns {*}
 */
export const receivedParts = (state = { list: [], total: 0 }, action) => {
    switch (action.type) {
    case RECEIVE_PART_LIST:
        return action.data;
    default:
        return state;
    }
};

export const receivedLoadingState = (state = false, action) => {
    switch (action.type) {
    case RECEIVE_LOADING_PART_LIST:
        return action.state;
    default:
        return state;
    }
};
