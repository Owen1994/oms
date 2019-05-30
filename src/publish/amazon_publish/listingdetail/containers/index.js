import { connect } from 'react-redux'
import App from '../components'
import action from '../actions'

const mapStateToProps = (state, props) => {
    return { ...state, ...props }
};

export default connect(
    mapStateToProps,
    action
)(App)
