import {
    GET_RECEIVIE_GOODS_DETAIL_LIST, GET_RECEIVIE_GOODS_DETAIL_LIST_LOADING,
} from '../constants';

export const receivieGoodsDetailParts = (state = { list: [], total: 0 }, action) => {
    switch (action.type) {
    case GET_RECEIVIE_GOODS_DETAIL_LIST:
        return action.data;
    default:
        return state;
    }
};

export const receivieGoodsDetailLoading = (state = false, action) => {
    switch (action.type) {
    case GET_RECEIVIE_GOODS_DETAIL_LIST_LOADING:
        return action.state;
    default:
        return state;
    }
};
