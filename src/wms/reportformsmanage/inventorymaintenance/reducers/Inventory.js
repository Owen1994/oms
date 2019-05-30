import {
    GET_INVENTORY_LIST,
    GET_INVENTORY_LIST_LOADING,
} from '../constants';

export const inventoryParts = (state = { list: [], total: 0 }, action) => {
    switch (action.type) {
    case GET_INVENTORY_LIST:
        return action.data;
    default:
        return state;
    }
};

export const inventoryLoading = (state = false, action) => {
    switch (action.type) {
    case GET_INVENTORY_LIST_LOADING:
        return action.state;
    default:
        return state;
    }
};
