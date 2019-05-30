import { connect } from 'react-redux';
import ScanDeliveryPage from '../components/scandelivery/index';
import { scanDeliveryPartList } from '../actions';

const mapStateToProps = (state, props) => ({
    ...props,
    partList: state.scanDeliveryParts,
    loadingState: state.scanDeliveryLoading,
});
// 扫描发运
export default connect(
    mapStateToProps,
    { scanDeliveryPartList },
)(ScanDeliveryPage);
