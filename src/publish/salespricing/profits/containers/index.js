import { connect } from 'react-redux'
import App from '../components'
import {
    getPricingStateAction,
    resetConditionsAction,
    getPricingResultAction,
    editPricingResultAction,
} from "../actions";
import {parsePricingResultData} from "../selectors";

const mapStateToProps = (state,props)=>{
    const pricingStateData = state.pricingStateData;
    const pricingResultData = parsePricingResultData(state);
    return {pricingStateData,pricingResultData, ...props}
}

export default connect(mapStateToProps,{
    getPricingStateAction,
    resetConditionsAction,
    getPricingResultAction,
    editPricingResultAction,
})(App)
