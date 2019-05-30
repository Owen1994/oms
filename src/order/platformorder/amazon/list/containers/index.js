import { connect } from 'react-redux';
import App from '../components';
import queryAmazonList from '../actions/index';
import { parseTables } from '../selectors';

const mapStateToProps = state => ({
    amazonListData: parseTables(state),
    amazonListLoadingState: state.amazonListloadingObj,
});


export default connect(
    mapStateToProps,
    { queryAmazonList },
)(App);
