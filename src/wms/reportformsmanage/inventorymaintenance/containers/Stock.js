import { connect } from 'react-redux';
import Stock from '../components/stock/index';
import { queryStockList, clearRejectsList } from '../actions';

const mapStateToProps = (state, props) => ({
    ...props,
    partList: state.stockParts,
    loadingState: state.stockLoading,
});
// 渠道合并
export default connect(
    mapStateToProps,
    { queryStockList, clearRejectsList },
)(Stock);
