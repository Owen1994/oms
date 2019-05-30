import { connect } from 'react-redux'
import App from '../components'
import { queryAuthorizationList } from '../actions'
import { parseAuthorizations } from '../selectors'

const mapStateToProps = (state, props) => ({
    ...props,
    data: parseAuthorizations(state),
    loadingState: state.loadingAuthorizationState,
  })


export default connect(
    mapStateToProps,
    {queryAuthorizationList},
)(App)