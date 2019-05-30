import {
    LOADING_PART_LIST,
    PLAN_DETAIL_LOADING_PART_LIST, PLAN_DETAIL_RECEIVE_PART_LIST, RECEIVE_PART_LIST,
} from '../constants';

export const planParts = (state = { list: [], total: 0 }, action) => {
    switch (action.type) {
    case RECEIVE_PART_LIST:
        return action.data;
    default:
        return state;
    }
};

export const planLoadingPartState = (state = false, action) => {
    switch (action.type) {
    case LOADING_PART_LIST:
        return action.state;
    default:
        return state;
    }
};


export const planDetailParts = (state = { list: [], total: 0 }, action) => {
    switch (action.type) {
    case PLAN_DETAIL_RECEIVE_PART_LIST:
        return action.data;
    default:
        return state;
    }
};

export const planDetailLoadingPartState = (state = false, action) => {
    switch (action.type) {
    case PLAN_DETAIL_LOADING_PART_LIST:
        return action.state;
    default:
        return state;
    }
};
