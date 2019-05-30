import { connect } from 'react-redux';
import Procurement from '../components/procurements';
import { getProcurementList } from '../actions';
import procurementList from '../selectors/Procurements';

const mapStateToProps = (state, props) => ({
    ...props,
    procurementData: procurementList(state),
    loadingState: state.loadingRecordState,
});

export default connect(
    mapStateToProps,
    { getProcurementList },
)(Procurement);
