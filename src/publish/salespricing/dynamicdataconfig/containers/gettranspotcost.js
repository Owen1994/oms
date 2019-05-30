import { connect } from 'react-redux'
import TransportCost from '../components/gettransportcost'
import { datasaddkey } from '../../../../util/baseTool';
import { getTransportCostAction } from '../actions'

const mapStateToProps = (state, props)=>{
    const transportCostData = datasaddkey(state.transportCostData);
    return { transportCostData, ...props }
};

export default connect(mapStateToProps,{
    getTransportCostAction
})(TransportCost)

