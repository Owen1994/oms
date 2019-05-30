import { connect } from 'react-redux';
import Supplier from '../components/suppliers';
import { getSupplierList } from '../actions';
import supplierList from '../selectors/Suppliers';

const mapStateToProps = (state, props) => ({
    ...props,
    supplierData: supplierList(state),
    loadingState: state.loadingRecordState,
});

export default connect(
    mapStateToProps,
    { getSupplierList },
)(Supplier);
