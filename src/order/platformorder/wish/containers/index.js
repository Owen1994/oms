import { connect } from 'react-redux'
import App from '../components'
import { 
    queryWishOrderList,
    queryWishOrderDetail,
    queryWishOrderTabState,
    queryWishOrderTagState,
 } from '../actions'
import { parseWishOrders } from '../selectors'

const mapStateToProps = (state, props) => ({
    ...props,
    data: parseWishOrders(state),
    loadingState: state.loadingWishOrderState,
    detail: state.wishOrderDetail,
    tabstate: state.wishOrderTabState,
    tagstate: state.wishOrderTagState
  })


export default connect(
    mapStateToProps,
    {
        queryWishOrderList, 
        queryWishOrderDetail,
        queryWishOrderTabState,
        queryWishOrderTagState
    },
)(App)