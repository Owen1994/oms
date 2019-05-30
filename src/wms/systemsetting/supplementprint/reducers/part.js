import {
    BOX_LOADING, ERROR_LOADING, SKU_LOADING,
    LOAD_BOX_INFO, LOAD_ERROR_INFO, LOAD_SKU_INFO,

} from '../constants';

export const boxInfo = (state = {}, action) => {
    switch (action.type) {
    case LOAD_BOX_INFO:
        return action.data;
    default:
        return state;
    }
};

export const skuInfo = (state = { number: '', printInfoArr: [] }, action) => {
    switch (action.type) {
    case LOAD_SKU_INFO:
        return action.data;
    default:
        return state;
    }
};
export const errorInfo = (state = {}, action) => {
    switch (action.type) {
    case LOAD_ERROR_INFO:
        return action.data;
    default:
        return state;
    }
};
export const skuLoading = (state = false, action) => {
    switch (action.type) {
    case SKU_LOADING:
        return action.data;
    default:
        return state;
    }
};
export const boxLoading = (state = false, action) => {
    switch (action.type) {
    case BOX_LOADING:
        return action.data;
    default:
        return state;
    }
};
export const errorLoading = (state = false, action) => {
    switch (action.type) {
    case ERROR_LOADING:
        return action.data;
    default:
        return state;
    }
};
