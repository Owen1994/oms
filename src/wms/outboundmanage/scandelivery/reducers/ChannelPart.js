import {
    CHANNEL_PART_LIST,
    CHANNEL_LOADING,
} from '../constants';

export const channelParts = (state = { list: [], total: 0 }, action) => {
    switch (action.type) {
    case CHANNEL_PART_LIST:
        return action.data;
    default:
        return state;
    }
};

export const channelLoading = (state = false, action) => {
    switch (action.type) {
    case CHANNEL_LOADING:
        return action.state;
    default:
        return state;
    }
};
