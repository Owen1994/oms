import { combineReducers } from 'redux'
import {
    GET_PRICINT_STATE,
    RESET_CONDITIONS,
    GET_PRICING_RESULT,
    EDIT_PRICING_RESULT,
} from '../constants/reducerTypes'
import {pricingstatedata} from '../constants/intialDatas'

export const pricingStateData = (state = pricingstatedata, action)=>{
    switch (action.type){
        case GET_PRICINT_STATE:
            state = action.data;
            state.currency = [state.currency];
            state.currency[0].label = `${state.currency[0].key} ${state.currency[0].label}`;
            state.platform = [state.platform];
            state.site = [state.site];
            state.destination = [state.destination];
            state.shipmentPort = [state.shipmentPort];
            state.depot = [state.depot];
            return {...state}
        case RESET_CONDITIONS:
            state.currency = pricingstatedata.currency;
            state.transport = pricingstatedata.transport;
            state.site = pricingstatedata.site;
            state.shipmentPort = pricingstatedata.shipmentPort;
            state.platform = pricingstatedata.platform;
            state.destination = pricingstatedata.destination;
            state.depot = pricingstatedata.depot;
            state.pricingTaskId = pricingstatedata.pricingTaskId;
            return {...state}
        default:
            return state
    }
}

export const pricingResultData = (state = [], action)=>{
    switch (action.type){
        case GET_PRICING_RESULT:
            state = action.data;
            return [...state];
        case EDIT_PRICING_RESULT:
            state = state.map(v=>{
                if(v.pricingId === action.key){
                    v = {...v, ...action.data};
                }
                return v
            });
            return [...state];
        default:
            return state
    }
}

const rootReducer = combineReducers({
    pricingStateData,pricingResultData
})

export default rootReducer
