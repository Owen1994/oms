import { connect } from 'react-redux';
import App from '../components';
import queryTableList, { queryMymallTabState } from '../actions';
import parseListData from '../selectors';

const mapStateToProps = (state, props) => ({
    ...props,
    data: parseListData(state),
    loadingState: state.loadingTableState,
    tabstate: state.mymallOrderTabState,
});

export default connect(
    mapStateToProps,
    { queryTableList, queryMymallTabState },
)(App);
