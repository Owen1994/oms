import { TRANSPORT_COST_DATA } from "../constants/reduceTypes";

export const transportCostData = (state=[], action)=>{
    switch (action.type){
        case TRANSPORT_COST_DATA:
            state = action.data
            return [...state]
        default:
            return state
    }
}