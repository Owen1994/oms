import {
    RECEIVE_TABLE_LIST,
    LOADING_TABLE_LIST,
} from '../constants';

export const listdata = (state = { data: [], total: 0 }, action) => {
    switch (action.type) {
    case RECEIVE_TABLE_LIST:
        return action.data;
    default:
        return state;
    }
};

export const loadingTableState = (state = false, action) => {
    switch (action.type) {
    case LOADING_TABLE_LIST:
        return action.state;
    default:
        return state;
    }
};
