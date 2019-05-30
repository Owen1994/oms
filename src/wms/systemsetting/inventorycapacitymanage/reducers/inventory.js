import {
    RECEIVE_INVENTORY_LIST,
    LOADING_INVENTORY_LIST,
} from '../constants/inventory';

export const inventory = (state = { list: [], total: 0 }, action) => {
    switch (action.type) {
    case RECEIVE_INVENTORY_LIST:
        return action.data;
    default:
        return state;
    }
};

export const loadingInventoryState = (state = false, action) => {
    switch (action.type) {
    case LOADING_INVENTORY_LIST:
        return action.state;
    default:
        return state;
    }
};
