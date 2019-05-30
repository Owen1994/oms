import { connect } from 'react-redux'
import ListingCost from '../components/getlistingcost'
import { datasaddkey } from '../../../../util/baseTool';
import { getListingCostAction } from '../actions'

const mapStateToProps = (state, props)=>{
    const listingCostData = datasaddkey(state.listingCostData);
    return { listingCostData, ...props }
}

export default connect(mapStateToProps,{
    getListingCostAction
})(ListingCost)
