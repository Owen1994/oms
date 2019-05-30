import { connect } from 'react-redux';
import App from '../components';
import actions from '../actions';

const mapStateToProps = (state, own) => ({
    ...state,
    ...own,
});

export default connect(mapStateToProps, actions)(App);
