import {
    SCAN_DELIVERY_LOADING,
    SCAN_DELIVERY_PART_LIST,
} from '../constants';

export const scanDeliveryParts = (state = { list: [], total: 0 }, action) => {
    switch (action.type) {
    case SCAN_DELIVERY_PART_LIST:
        return action.data;
    default:
        return state;
    }
};

export const scanDeliveryLoading = (state = false, action) => {
    switch (action.type) {
    case SCAN_DELIVERY_LOADING:
        return action.state;
    default:
        return state;
    }
};
