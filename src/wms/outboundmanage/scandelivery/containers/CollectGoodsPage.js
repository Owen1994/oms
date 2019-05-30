import { connect } from 'react-redux';
import collectGoodsPage from '../components/collectgoods/index';
import { collectGoodsPartList } from '../actions';

const mapStateToProps = (state, props) => ({
    ...props,
    partList: state.collectGoodsParts,
    loadingState: state.collectGoodsLoading,
});
// 集货袋合并
export default connect(
    mapStateToProps,
    { collectGoodsPartList },
)(collectGoodsPage);
