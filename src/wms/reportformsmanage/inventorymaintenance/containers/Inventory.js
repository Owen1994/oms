import { connect } from 'react-redux';
import InventoryPage from '../components/inventory/index';
import { queryInventoryList, clearRejectsList } from '../actions';

const mapStateToProps = (state, props) => ({
    ...props,
    partList: state.inventoryParts,
    loadingState: state.inventoryLoading,
});
// 集货称重
export default connect(
    mapStateToProps,
    { queryInventoryList, clearRejectsList },
)(InventoryPage);
