import {
    UPDATE_WEIGHT_LOADING,
    UPDATE_WEIGHT_PART_LIST,
} from '../constants';

export const updateWeightParts = (state = { list: [], total: 0 }, action) => {
    switch (action.type) {
    case UPDATE_WEIGHT_PART_LIST:
        return action.data;
    default:
        return state;
    }
};

export const updateWeightLoading = (state = false, action) => {
    switch (action.type) {
    case UPDATE_WEIGHT_LOADING:
        return action.state;
    default:
        return state;
    }
};
