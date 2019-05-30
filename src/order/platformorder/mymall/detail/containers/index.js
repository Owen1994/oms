import { connect } from 'react-redux';
import App from '../components';
import queryTableList from '../actions';
import parseListData from '../selectors';

const mapStateToProps = (state, props) => ({
    ...props,
    data: parseListData(state),
    loadingState: state.loadingTableState,
});

export default connect(
    mapStateToProps,
    { queryTableList },
)(App);
