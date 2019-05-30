import { connect } from 'react-redux'
import App from '../components'
import action from '../actions'


const mapStateToProps = (state, props) => ({
    ...state,
    ...props
})

export default connect(
    mapStateToProps,
    action,
)(App)