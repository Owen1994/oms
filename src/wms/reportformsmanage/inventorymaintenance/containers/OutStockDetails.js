import { connect } from 'react-redux';
import OutStockDetailPage from '../components/outstockdetail/index';
import { queryOutStockDetailList, clearRejectsList } from '../actions';

const mapStateToProps = (state, props) => ({
    ...props,
    partList: state.outStockDetailsParts,
    loadingState: state.outStockDetailsLoading,
});
// 更新包裹重量
export default connect(
    mapStateToProps,
    { queryOutStockDetailList, clearRejectsList },
)(OutStockDetailPage);
