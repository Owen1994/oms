import { connect } from 'react-redux';
import StockDetail from '../components/stockdetail/index';
import { queryStockDetailList, clearRejectsList } from '../actions';

const mapStateToProps = (state, props) => ({
    ...props,
    partList: state.stockDetailsParts,
    loadingState: state.stockDetailsLoading,
});
// 集货袋合并
export default connect(
    mapStateToProps,
    { queryStockDetailList, clearRejectsList },
)(StockDetail);
