import {buyerPolicy} from "../constants/listingDetail";
import * as types from '../constants/reducerTypes'

export const buyerpolicyData = (state = buyerPolicy
    , action) => {
    switch (action.type){
        case types.LISTING_DETAIL_DATA_FETCH:
            return action.data.buyerPolicy;
        case types.ADD_BUYERPOLICY:
            state[action.key] = action.value;
            return {...state}
        case types.RESET_DETAIL_DATA:
            return {
                "buyers": {
                    "isPaypalFlag": {
                        "days": null,
                        "isSelect": null,
                        "times": null
                    },
                    "minScore": {
                        "isSelect": null,
                        "score": null
                    },
                    "pastTimes": {
                        "isSelect": null,
                        "times": null
                    },
                    "unReachable": true
                },
                "privacy": 1,
                "sellerReq": 2
            }
        default:
            return state
    }
};
