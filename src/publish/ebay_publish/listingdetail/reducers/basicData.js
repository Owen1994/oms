import {basicInfoData} from '../constants/listingDetail'
import * as types from '../constants/reducerTypes'

export const basicData = (state = basicInfoData
    , action) => {
    switch (action.type){
        case types.LISTING_DETAIL_DATA_FETCH:
            return action.data.basicData;
        case types.ADD_BASICDATA:
            state[action.key] = action.value
            return {...state}
        case types.RESET_DETAIL_DATA:
            return {
                "ebayCategoryArr1": [],
                "ebayCategoryArr2": [],
                "publishTime": null,
                "publishTemplObj": null,
                "saleAccount": null,
                "saleType": 1,
                "shopclassObj1": {
                    id: "",
                    name: ""
                },
                "shopclassObj2": {
                    id: "",
                    name: ""
                },
                "autoPartsObj": null,
                "site": null,
                "subtitle": null,
                "title": null,
                "publishTimeStr": null
            }
        case types.LOADING_SKUINFO:
            const { formObj, data} = action.data;
            return {
                ...basicInfoData,
                ...formObj.basicData,
                publishTimeStr: state.publishTimeStr,
                title: data.title,
            };
        case types.SWITCH_SITE:
            state.site =  action.site;
            return {...state}
        default:
            return state
    }
};
