import { connect } from 'react-redux'
import App from '../components'
import { queryCheckRulesList, filterTableaction } from '../actions'
import { parseCheckRules } from '../selectors'

const mapStateToProps = (state, props) => ({
    ...props,
    data: parseCheckRules(state),
    loadingState: state.loadingCheckRulesState,
    filtertable: state.filtertable,
  })


export default connect(
    mapStateToProps,
    {queryCheckRulesList, filterTableaction},
)(App)