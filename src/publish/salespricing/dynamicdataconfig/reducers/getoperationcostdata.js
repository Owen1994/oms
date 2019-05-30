import { OPERATION_COST_DATA } from "../constants/reduceTypes";

export const operationCostData = (state=[], action)=>{
    switch (action.type){
        case OPERATION_COST_DATA:
            state = action.data
            return [...state]
        default:
            return state
    }
}