import { connect } from 'react-redux'
import App from '../components'
import querySites from '../../../common/actions/SiteAction'
import { queryPartList } from '../actions'
import { parseParts } from '../selectors'
const mapStateToProps = (state, props) => ({
  ...props,
  sites: state.Sites,
  data: parseParts(state),
  loadingState: state.loadingPartState,
})

export default connect(
  mapStateToProps, 
  { querySites, queryPartList }
)(App)

