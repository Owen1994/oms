import { connect } from 'react-redux';
import App from '../components';
import { loadDataList } from '../actions';
import parsedataListData from '../selectors/index';

const mapStateToProps = (state, props) => ({
    data: parsedataListData(state),
    loadingState: state.loadingState,
    ...props,
});

export default connect(
    mapStateToProps,
    { loadDataList },
)(App);
