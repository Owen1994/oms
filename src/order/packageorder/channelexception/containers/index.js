import { connect } from 'react-redux';
import App from '../components';
import actions from '../actions';
import { parseListData, formatToTags } from '../selectors';

const mapStateToProps = (state, props) => ({
        ...props,
        tabledata: parseListData(state),
        loadingState: state.loadingTableState,
        channelobtaindata: formatToTags(state.channelobtaindata),
        exceptiontypedata: formatToTags(state.exceptiontypedata),
        selectedRowKeys: state.selectedRowKeys,
});

export default connect(
    mapStateToProps,
    { ...actions },
)(App);
