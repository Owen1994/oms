import { LISTING_COST_DATA } from "../constants/reduceTypes";

export const listingCostData = (state=[], action)=>{
    switch (action.type){
        case LISTING_COST_DATA:
            state = action.data
            return [...state]
        default:
            return state
    }
}