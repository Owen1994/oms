import { connect } from 'react-redux';
import App from '../components';
import getAnalysisList from '../actions';
import parsedataListData from '../selectors';

const mapStateToProps = (state, props) => ({
    ...props,
    data: parsedataListData(state),
    loadingState: state.loadingRecordState,
});

export default connect(
    mapStateToProps,
    { getAnalysisList },
)(App);
