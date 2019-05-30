import { connect } from 'react-redux';
import OutStock from '../components/outstock/index';
import { queryOutStockList, clearRejectsList } from '../actions';

const mapStateToProps = (state, props) => ({
    ...props,
    partList: state.outStockParts,
    loadingState: state.outStockLoading,
});
// 扫描发运
export default connect(
    mapStateToProps,
    { queryOutStockList, clearRejectsList },
)(OutStock);
