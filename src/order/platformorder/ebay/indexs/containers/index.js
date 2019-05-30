import { connect } from 'react-redux'
import App from '../components'
import {
  queryEbayOrderList,
  queryEbayOrderTabState,
} from '../actions'
import { parseEbayOrders } from '../selectors'

const mapStateToProps = (state, props) => ({
  ...props,
  data: parseEbayOrders(state),
  loadingState: state.loadingEbayOrderState,
  tabstate: state.ebayOrderTabState,
})


export default connect(
  mapStateToProps,
  {
    queryEbayOrderList,
    queryEbayOrderTabState,
  },
)(App)