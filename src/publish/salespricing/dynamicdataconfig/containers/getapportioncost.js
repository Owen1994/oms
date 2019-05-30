import { connect } from 'react-redux'
import ApportionCost from '../components/getapportioncost'
import {datasaddkey} from "../../../../util/baseTool";
import { getApportionCostAction } from "../actions";

const mapStateToProps = (state, props)=>{
    const apportionCostData = datasaddkey(state.apportionCostData);
    return {apportionCostData,...props}
}

export default connect(mapStateToProps,{
    getApportionCostAction,
})(ApportionCost)
