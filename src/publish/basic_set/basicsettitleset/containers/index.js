import { connect } from 'react-redux'
import App from '../components'
import querySites from '../../../common/actions/SiteAction'
import { queryTitleList } from '../actions'
import { parseTitles } from '../selectors'
const mapStateToProps = state => ({
  sites: state.Sites,
  data: parseTitles(state),
  loadingState: state.loadingTitleState
})

export default connect(
  mapStateToProps, 
  { querySites, queryTitleList }
)(App)
