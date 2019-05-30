import {skuInfo} from "../constants/listingDetail";
import * as types from '../constants/reducerTypes'

export const skuinfoData = (state = skuInfo
    , action) => {
    switch (action.type){
        case types.LISTING_DETAIL_DATA_FETCH:
            return action.data.skuInfo;
        case types.ADD_SKUINFO:
            state[action.key] = action.value;
            return {...state}
        case types.LOADING_SKUINFO:
            const {formObj, data} = action.data;
            return {
                ...state,
                ...formObj.skuInfo,
                img: data.img,
                sellerSku: data.sellerSku
            }
        case types.SWITCH_SITE:
            state.upcOrEanVal =  action.upcOrEanVal;
            state.upcOrEan =  action.upcOrEan;
            return {...state}
        case types.SWITCH_SALETYPE:
            if(action.stock){
                state.stock =  action.stock;
            }
            if(action.sellingTimeObj) {
                state.sellingTimeObj =  action.sellingTimeObj;
            }
            if(action.itemConditionObj) {
                state.itemConditionObj =  action.itemConditionObj;
            }
            return {...state}
        case types.RESET_DETAIL_DATA:
            return {
                "bestOffer": {
                    "isAccept": null,
                    "isMax": null,
                    "isMin": null,
                    "maxPrice": null,
                    "minPrice": null
                },
                "ean": null,
                "img": [],
                "isLargeImage": null,
                "price": null,
                "sellerSku": null,
                "sellingTime": null,
                "stock": null,
                "upc": null,
                "upcOrEan": null,
                "upcOrEanVal": null,
                "sellingTimeObj": {
                    id: "-1",
                    name: "Good till cancel"
                },
                "itemConditionObj":{
                    id: '1000',
                    name: 'New'
                },
                "variationInfo": {
                    "mainPic": null,
                    "specificName": null,
                    "specificSetJson": null,
                    "variationDetail": []
                }
            }
        default:
            return state
    }
};
