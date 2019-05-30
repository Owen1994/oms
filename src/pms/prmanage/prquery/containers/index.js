import { connect } from 'react-redux';
import App from '../components';
import getPrsearchList from '../actions';
import parsedataListData from '../selectors';
import sortFieldsList from '../actions/ListDataOperate';

const mapStateToProps = (state, props) => ({
    ...props,
    data: parsedataListData(state),
    loadingState: state.loadingRecordState,
});

export default connect(
    mapStateToProps,
    { getPrsearchList, sortFieldsList },
)(App);
