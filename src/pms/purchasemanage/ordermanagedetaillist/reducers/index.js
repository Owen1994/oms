import { combineReducers } from 'redux';

import { levelOptions } from '../../../../util/options';

import {
    orderDetailOrderGoodsListInfo,
} from '../actions/index';

const initPrams = {
    pageNumber: levelOptions('pageInit').pagenum,
    pageData: levelOptions('pageInit').pagedata,
};

const orderDetailOrderGoodsList = (state = {
    loading: false,
    params: initPrams,
    list: [],
    total: 0,
}, action) => {
    switch (action.type) {
    case orderDetailOrderGoodsListInfo:
        return {
            ...state,
            ...action.payload,
        };
    default:
        return state;
    }
};


const rootReducer = combineReducers({
    orderDetailOrderGoodsList,
});

export default rootReducer;
