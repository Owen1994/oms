import { connect } from 'react-redux';
import App from '../components';
import {queryAmazonDetail, queryAmazonDetailLog} from '../actions';
import { parseTables } from '../selectors';

const mapStateToProps = state => ({
        amazonListData: parseTables(state),
        amazonLogData: state.amazonDetailLogObj,
});


export default connect(
    mapStateToProps,
    { queryAmazonDetail, queryAmazonDetailLog },
)(App);
