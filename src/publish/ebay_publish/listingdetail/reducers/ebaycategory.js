import * as types from "../constants/reducerTypes";

export const ebayCategoryData = (state = {ebayCategoryArr1: [],ebayCategoryArr2: [],ebayCategoryArr3: [],ebayCategoryArr4: []}
    , action) => {
    switch (action.type){
        case types.LISTING_DETAIL_DATA_FETCH:
            let ebayCategoryArr1 = action.data.basicData.ebayCategoryArr1;
            let ebayCategoryArr2 = action.data.basicData.ebayCategoryArr2;
            ebayCategoryArr1 = ebayCategoryArr1 ? ebayCategoryArr1 : [];
            ebayCategoryArr2 = ebayCategoryArr2 ? ebayCategoryArr2 : [];
            let [...ebayCategoryArr3] = ebayCategoryArr1;
            let [...ebayCategoryArr4] = ebayCategoryArr2;
            return {ebayCategoryArr1,ebayCategoryArr2,ebayCategoryArr3,ebayCategoryArr4}
        case types.LOADING_SKUINFO:
            const { data, oldEbayClass} = action.data;
            if(oldEbayClass.length === 0){
                state.ebayCategoryArr1 = data.ebayCategory1;
                state.ebayCategoryArr3 = data.ebayCategory1;
            }
            return {...state}
        case types.SEARCH_EBAY_CATEGORY:
            if(action.way === "skuSearch1"){
                state.ebayCategoryArr1 = action.value;
                state.ebayCategoryArr3 = action.value;
            }else if(action.way === "skuSearch2"){
                state.ebayCategoryArr2 = action.value;
                state.ebayCategoryArr4 = action.value;
            }else{
                state[action.name] = action.value
            }
            return {...state}
        case types.RESET_DETAIL_DATA:
            return {ebayCategoryArr1: [],ebayCategoryArr2: []};
        case types.SWITCH_SITE:
            return {ebayCategoryArr1: [],ebayCategoryArr2: [],ebayCategoryArr3: [],ebayCategoryArr4: []};
        default:
            return state
    }
};
