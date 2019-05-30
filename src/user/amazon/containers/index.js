import { connect } from 'react-redux';
import App from '../components';
import queryAmazonAuthorizationList from '../actions/index';
import { parseTables } from '../selectors';

const mapStateToProps = state => ({
    amazonAuthorizationData: parseTables(state),
    amazonAuthorizationLoadingState: state.amazonAuthorizationListloadingObj,
});


export default connect(
    mapStateToProps,
    { queryAmazonAuthorizationList },
)(App);
