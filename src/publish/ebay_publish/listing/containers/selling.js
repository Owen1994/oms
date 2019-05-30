import { connect } from 'react-redux'
import SellingComponent from '../components/selling'
import { querySellingList, checkrepeatAsync, getNumberofSearch, autoAdjustAsync } from '../actions/selling'
import { parseSellingData } from '../selector/selling'

const mapStateToProps = (state, props) => {
    const sellingData = parseSellingData(state)
    const loadingObj = state.loadingObj
    return { sellingData, loadingObj, ...props }
};

export default connect(
    mapStateToProps,
    { querySellingList, checkrepeatAsync, getNumberofSearch, autoAdjustAsync }
)(SellingComponent)