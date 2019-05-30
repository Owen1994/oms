import { connect } from 'react-redux';
import App from '../components';
import getTableList from '../actions';
import parsedataListData from '../selectors';

const mapStateToProps = (state, props) => ({
    ...props,
    total: state.listdata.total,
    dataList: parsedataListData(state),
    loadingState: state.loadingState,
})
    

export default connect(
    mapStateToProps,
    { getTableList },
)(App);
