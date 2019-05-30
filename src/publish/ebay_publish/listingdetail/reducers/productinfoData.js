import {productInfo} from "../constants/listingDetail";
import * as types from '../constants/reducerTypes'

export const productinfoData = (state = productInfo
    , action) => {
    switch (action.type){
        case types.LISTING_DETAIL_DATA_FETCH:
            return action.data.productInfo;
        case types.ADD_PRODUCTINFO:
            state[action.key] = action.value;
            return {...state}
        case types.LOADING_SKUINFO:
            const {formObj, data} = action.data;
            return {
                ...formObj.productInfo,
                defaultDescriptionContent:data.descriptionConent,
                descriptionContent: data.descriptionConent
            }
        case types.RESET_DETAIL_DATA:
            return {
                "descriptionContent": null,
                "descriptionTemplateObj": {
                    id: '',
                    name: ''
                }
            }
        default:
            return state
    }
};
