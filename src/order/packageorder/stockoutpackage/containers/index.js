import { connect } from 'react-redux';
import App from '../components';
import actions from '../actions';
import { parseListData, formatToTags } from '../selectors';

const mapStateToProps = (state, props) => ({
        ...props,
        tabledata: parseListData(state),
        loadingState: state.loadingTableState,
        capacitystatedata: formatToTags(state.capacitystatedata),
        prioritytypedata: formatToTags(state.prioritytypedata),
        selectedRowKeys: state.selectedRowKeys,
});

export default connect(
    mapStateToProps,
    { ...actions },
)(App);
