import { connect } from 'react-redux'
import Vlist from '../components/skuinfo/variationlist'
import {
    addVlistItem, delVlistItem, editVlistItem, editVlistAll, editVarListing, saveDelVlistItem
} from '../actions/skuvariation'
import {
    moreListingComputPriceAction, getDomesticList
} from '../actions/index'
import parseVimgs from '../selector/vlist';
const mapStateToProps = (state, props) => {
    const site = state.basicData.site
    const vlist = parseVimgs(state);
    const vrelationship = state.vrelationship;
    return { site, vlist, vrelationship, ...props }
};

export default connect(
    mapStateToProps,
    {
        addVlistItem,
        delVlistItem,
        editVlistItem,
        editVlistAll,
        editVarListing,
        saveDelVlistItem,
        moreListingComputPriceAction,
        getDomesticList
    }
)(Vlist)
