import { connect } from 'react-redux';
import App from '../components';
import {
    loadSkuInfo,
    loadBoxInfo,
    loadErrorInfo,
} from '../actions';
import parseSku from '../selectors';

const mapStateToProps = (state, props) => ({
    ...props,
    boxInfo: state.boxInfo,
    skuInfo: parseSku(state.skuInfo),
    errorInfo: state.errorInfo,
    skuLoading: state.skuLoading,
    boxLoading: state.boxLoading,
    errorLoading: state.errorLoading,
});

export default connect(
    mapStateToProps, {
        loadSkuInfo,
        loadBoxInfo,
        loadErrorInfo,
    },
)(App);
