import { connect } from 'react-redux';
import App from '../components';
import action from '../actions';

const mapStateToProps = state => ({
    ...state,
});


export default connect(
    mapStateToProps,
    action,
)(App);
