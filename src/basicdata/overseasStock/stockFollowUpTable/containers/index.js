import { connect } from 'react-redux';
import App from '../components';
import parsedataListData from '../selectors';
import getDataList from '../actions';

const mapStateToProps = (state, props) => ({
    data: parsedataListData(state),
    loadingState: state.loadingState,
    ...props,
});

export default connect(
    mapStateToProps,
    { getDataList },
)(App);
