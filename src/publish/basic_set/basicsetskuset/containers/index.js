import { connect } from 'react-redux'
import App from '../components'
import querySites from '../../../common/actions/SiteAction'
import { querySkuList } from '../actions'
import { parseSkus } from '../selectors'
const mapStateToProps = state => ({
  sites: state.Sites,
  data: parseSkus(state),
  loadingState: state.loadingSkuState
})

export default connect(
  mapStateToProps, 
  { querySites, querySkuList }
)(App)
