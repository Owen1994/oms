import {templateInfo} from "../constants/listingDetail";
import * as types from '../constants/reducerTypes'

export const templateinfoData = (state = templateInfo
    , action) => {
    switch (action.type){
        case types.LISTING_DETAIL_DATA_FETCH:
            return action.data.templateInfo;
        case types.ADD_TEMPLATEINFO:
            state[action.key] = action.value;
            return {...state}
        case types.LOADING_SKUINFO:
            const {formObj} = action.data;
            formObj.templateInfo.countryObj = state.countryObj;
            return formObj.templateInfo
        case types.RESET_DETAIL_DATA:
            return {
                "city": null,
                "country": null,
                "irregularPackage": null,
                "packageSize": {
                    "height": null,
                    "length": null,
                    "wide": null
                },
                "packageType": null,
                "salestax": {
                    "rate": null,
                    "shippingIncludedInTax": null,
                    "taxId": null,
                    "taxObj": {
                        id: null,
                        name: null
                    }
                },
                "zip": null,
                "countryObj":{
                    id: null,
                    name: null
                },
                "paymentTemplate":{
                    id: null,
                    name: null
                },
                "returnTemplate":{
                    id: null,
                    name: null
                },
                "transportTemplate":{
                    id: null,
                    name: null
                },
            }
        default:
            return state
    }
};
