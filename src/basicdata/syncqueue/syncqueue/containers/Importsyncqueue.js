import { connect } from 'react-redux';
import Importsyncqueue from '../components/importsyncqueue';
import { getImportList } from '../actions';
import supplierList from '../selectors/importsyncqueue';

const mapStateToProps = (state, props) => ({
    ...props,
    supplierData: supplierList(state),
    loadingState: state.loadingRecordState,
});

export default connect(
    mapStateToProps,
    { getImportList },
)(Importsyncqueue);
