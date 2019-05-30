import {productAttr} from "../constants/listingDetail";
import * as types from '../constants/reducerTypes'

export const productattrData = (state = productAttr
    , action) => {
    switch (action.type){
        case types.LISTING_DETAIL_DATA_FETCH:
            return action.data.productAttr;
        case types.ADD_PRODUCTATTR:
            return action.data;
        case types.LOADING_SKUINFO:
            const {data} = action.data
            return data.productAttr
        case types.RESET_DETAIL_DATA:
            return []
        case types.GET_CATEGORY_SPECIFICS:
            if(action.productAttr){
                state = action.productAttr.map(item => {
                    if(item.children){
                        item.children = item.children.map(it => {
                            it.value = [];
                            return it;
                        })
                    }
                    return item;
                });
            }
            return state
        case types.PRODUCT_SELECT:
            state[action.key].children[0].value = action.value;
            return [...state]
        default:
            return state
    }
};
