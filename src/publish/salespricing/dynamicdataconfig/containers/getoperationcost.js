import { connect } from 'react-redux'
import OperationCost from '../components/getoperationcost'
import { datasaddkey } from '../../../../util/baseTool';
import { getOperationCostAction } from '../actions'

const mapStateToProps = (state, props)=>{
    const operationCostData = datasaddkey(state.operationCostData);
    return { operationCostData, ...props }
};

export default connect(mapStateToProps,{
    getOperationCostAction
})(OperationCost)

