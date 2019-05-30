import {
    RECEIVE_TABLE_LIST,
    LOADING_TABLE_LIST,
    RECEIVE_CAPACITY_STATE,
    RECEIVE_PRIORITY,
    CHANGE_SELECTED,
} from '../constants';

export const listdata = (state = { data: [], total: 0 }, action) => {
    switch (action.type) {
    case RECEIVE_TABLE_LIST:
        return action.data ? action.data : state;
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

export const capacitystatedata = (state = [], action) => {
    switch (action.type) {
    case RECEIVE_CAPACITY_STATE:
        return action.data;
    default:
        return state;
    }
};

export const prioritytypedata = (state = [], action) => {
    switch (action.type) {
    case RECEIVE_PRIORITY:
        return action.data;
    default:
        return state;
    }
};

export const selectedRowKeys = (state = [], action) => {
    switch (action.type) {
    case CHANGE_SELECTED:
        return action.payload;
    default:
        return state;
    }
}
