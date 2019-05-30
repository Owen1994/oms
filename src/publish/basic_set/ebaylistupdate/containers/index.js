import { connect } from 'react-redux'
import App from '../components'
import querySites from '../../../common/actions/SiteAction'
import { queryUpdateList } from '../actions'
import { parseUpdates } from '../selectors'
const mapStateToProps = (state, props) => ({
  ...props,
  sites: state.Sites,
  data: parseUpdates(state),
  loadingState: state.loadingUpdateState,
})

export default connect(
  mapStateToProps, 
  { querySites, queryUpdateList }
)(App)
