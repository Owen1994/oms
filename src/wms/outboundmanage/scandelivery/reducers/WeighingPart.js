import {
    WEIGHING_LOADING,
    WEIGHING_PART_LIST,
} from '../constants';

export const weighingParts = (state = { list: [], total: 0 }, action) => {
    switch (action.type) {
    case WEIGHING_PART_LIST:
        return action.data;
    default:
        return state;
    }
};

export const weighingLoading = (state = false, action) => {
    switch (action.type) {
    case WEIGHING_LOADING:
        return action.state;
    default:
        return state;
    }
};
