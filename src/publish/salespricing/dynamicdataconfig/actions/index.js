import {
    APPORTION_COST_DATA,
    LISTING_COST_DATA,
    TRANSPORT_COST_DATA,
    OPERATION_COST_DATA
} from "../constants/reduceTypes";

export const getApportionCostAction = data => dispatch=>{
    return dispatch({type: APPORTION_COST_DATA, data})
};
export const getListingCostAction = data => dispatch=>{
    return dispatch({type: LISTING_COST_DATA, data})
};
export const getOperationCostAction = data => dispatch=>{
    return dispatch({type: OPERATION_COST_DATA, data})
};
export const getTransportCostAction = data => dispatch=>{
    return dispatch({type: TRANSPORT_COST_DATA, data})
};