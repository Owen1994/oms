import { connect } from 'react-redux';
import App from '../components';
// import Contents from './Content';
import { getRulesList } from '../actions';

const mapStateToProps = (state, props) => ({
    ...props,
    ...state,
});

export default connect(
    mapStateToProps,
    { getRulesList },
)(App);
