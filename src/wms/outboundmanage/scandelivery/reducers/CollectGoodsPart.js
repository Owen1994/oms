import {
    COLLECT_GOODS_LOADING,
    COLLECT_GOODS_PART_LIST,
} from '../constants';

export const collectGoodsParts = (state = { list: [], total: 0 }, action) => {
    switch (action.type) {
    case COLLECT_GOODS_PART_LIST:
        return action.data;
    default:
        return state;
    }
};

export const collectGoodsLoading = (state = false, action) => {
    switch (action.type) {
    case COLLECT_GOODS_LOADING:
        return action.state;
    default:
        return state;
    }
};
