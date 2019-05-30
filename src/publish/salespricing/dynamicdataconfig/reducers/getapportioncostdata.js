import { APPORTION_COST_DATA } from "../constants/reduceTypes";

export const apportionCostData = (state=[], action)=>{
    switch (action.type){
        case APPORTION_COST_DATA:
            state = action.data
            return [...state]
        default:
            return state
    }
}