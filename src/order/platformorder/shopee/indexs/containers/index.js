import { connect } from 'react-redux'
import App from '../components'
import {
  getShopeeOrderListAsync,
  getShopeeOrderTabAsync,
} from '../actions'
import { parseshopeeList } from '../selectors'

const mapStateToProps = (state, props) => ({
  ...props,
  shopeeList: parseshopeeList(state),
  tabstate: state.shopeeOrderTabState,
})


export default connect(
  mapStateToProps,
  {
    getShopeeOrderListAsync,
    getShopeeOrderTabAsync,
  },
)(App)