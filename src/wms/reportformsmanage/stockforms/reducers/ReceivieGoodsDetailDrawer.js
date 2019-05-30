import {
    GET_RECEIVIE_GOODS_DRAWER_LIST, GET_RECEIVIE_GOODS_DRAWER_LIST_LOADING,
} from '../constants';

export const receivieGoodsDetailDrawerParts = (state = { list: [], total: 0 }, action) => {
    switch (action.type) {
    case GET_RECEIVIE_GOODS_DRAWER_LIST:
        return action.data;
    default:
        return state;
    }
};

export const receivieGoodsDetailDrawerLoading = (state = false, action) => {
    switch (action.type) {
    case GET_RECEIVIE_GOODS_DRAWER_LIST_LOADING:
        return action.state;
    default:
        return state;
    }
};
