import {
    RECEIVE_STORAGE_PALCE_LIST,
    LOADING_STORAGE_PALCE_LIST,
} from '../constants/storageplace';

export const storageplace = (state = { list: [], total: 0 }, action) => {
    switch (action.type) {
    case RECEIVE_STORAGE_PALCE_LIST:
        return action.data;
    default:
        return state;
    }
};

export const loadingStoragePlaceState = (state = false, action) => {
    switch (action.type) {
    case LOADING_STORAGE_PALCE_LIST:
        return action.state;
    default:
        return state;
    }
};
