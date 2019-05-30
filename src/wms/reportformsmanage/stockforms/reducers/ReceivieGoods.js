import { GET_RECEIVIE_GOODS_LIST, GET_RECEIVIE_GOODS_LIST_LOADING } from '../constants';

export const receivieGoodsParts = (state = { list: [], total: 0 }, action) => {
    switch (action.type) {
    case GET_RECEIVIE_GOODS_LIST:
        return action.data;
    default:
        return state;
    }
};

export const receivieGoodsLoading = (state = false, action) => {
    switch (action.type) {
    case GET_RECEIVIE_GOODS_LIST_LOADING:
        return action.state;
    default:
        return state;
    }
};
