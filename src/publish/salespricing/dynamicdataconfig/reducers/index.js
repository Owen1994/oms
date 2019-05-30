import { combineReducers } from 'redux'
import { apportionCostData } from "./getapportioncostdata";
import { operationCostData } from "./getoperationcostdata";
import { listingCostData } from "./getlistingcostdata";
import { transportCostData } from "./gettransportcostdata";

const rootReducer = combineReducers({
    apportionCostData,
    operationCostData,
    listingCostData,
    transportCostData,
})

export default rootReducer
