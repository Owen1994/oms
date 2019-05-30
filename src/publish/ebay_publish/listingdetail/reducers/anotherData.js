import {another} from "../constants/listingDetail";
import * as types from '../constants/reducerTypes'

export const anotherData = (state = another
    , action) => {
    switch (action.type){
        case types.LISTING_DETAIL_DATA_FETCH:
            let {basicData,templateInfo} = action.data;
            let packageType = templateInfo.packageType;
            let {categoryFeatureObj} = basicData;
            let title = basicData.title ? basicData.title : "";
            let subtitle = basicData.subtitle ? basicData.subtitle : "";
            state.titleLen = 80 - title.length;
            state.subTitleLen = 55 - subtitle.length;
            state.newPackageType = packageType ? packageType : null;
            state.isItemCompatibilityEnabled = categoryFeatureObj.isItemCompatibilityEnabled;
            state.isItemSpecificsEnabled = categoryFeatureObj.isItemSpecificsEnabled;
            state.isVariationsEnabled = categoryFeatureObj.isVariationsEnabled;
            state.isConditionEnabled = categoryFeatureObj.isConditionEnabled
            return {...state};
        case types.ANOTHER_DATA:
            state[action.key] = action.value;
            return {...state}
        case types.LOADING_SKUINFO:
            const {data} = action.data;
            state.titleLen = 80 - data.title.length
            return {...state}
        case types.GET_CATEGORY_SPECIFICS:
            state.isItemCompatibilityEnabled = action.isItemCompatibilityEnabled;
            state.isItemSpecificsEnabled = action.isItemSpecificsEnabled;
            state.isVariationsEnabled = action.isVariationsEnabled;
            state.isConditionEnabled = action.isConditionEnabled
            return {...state}
        case types.SEARCH_EBAY_CATEGORY:
            state.isVariationsEnabled = true
            return {...state}
        case types.RESET_DETAIL_DATA:
            return {
                "newPackageType": null,
                "isItemCompatibilityEnabled": false,
                "isItemSpecificsEnabled": true,
                "isVariationsEnabled": true,
                "isConditionEnabled": true
            }
        default:
            return state
    }
};
