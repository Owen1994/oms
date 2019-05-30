import { connect } from 'react-redux'
import App from '../components'
import querySites from '../../../common/actions/SiteAction'
import { queryRuleList } from '../actions'
import { parseRules } from '../selectors'
const mapStateToProps = (state, props) => ({
  ...props,
  sites: state.Sites,
  data: parseRules(state),
  loadingState: state.loadingRuleState,
})

export default connect(
  mapStateToProps, 
  { querySites, queryRuleList }
)(App)

