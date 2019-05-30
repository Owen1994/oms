import {
    RECEIVE_TABLE_LIST,
    LOADING_TABLE_LIST,
    RECEIVE_CHANNEL_STATE,
    RECEIVE_EXCEPTION_TYPE,
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

export const channelobtaindata = (state = [], action) => {
    switch (action.type) {
    case RECEIVE_CHANNEL_STATE:
        return action.data;
    default:
        return state;
    }
};

export const exceptiontypedata = (state = [], action) => {
    switch (action.type) {
    case RECEIVE_EXCEPTION_TYPE:
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
