import { connect } from 'react-redux';
import App from '../components';
import { getOrderDetailAccess, getOrderDetailLog, getProductSelect } from '../actions';
import { parseAddress, parseDetailLog } from '../selectors';

const mapStateToProps = state => ({
    access: parseAddress(state),
    detailLog: parseDetailLog(state),
    isCanEdit: state.isCanEdit,
    isAccessLoading: state.isAccessLoading,
    selectData: state.ProductSelectData,
});
export default connect(
    mapStateToProps,
    { getOrderDetailAccess, getOrderDetailLog, getProductSelect },
)(App);
