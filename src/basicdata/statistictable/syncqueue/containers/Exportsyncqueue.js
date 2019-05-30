import { connect } from 'react-redux';
import Exportsyncqueue from '../components/exportsyncqueue';
import { getExportList } from '../actions';
import procurementList from '../selectors/exportsyncqueue';

const mapStateToProps = (state, props) => ({
    ...props,
    procurementData: procurementList(state),
    loadingState: state.loadingRecordState,
});

export default connect(
    mapStateToProps,
    { getExportList },
)(Exportsyncqueue);
