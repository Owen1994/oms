import { connect } from 'react-redux';
import App from '../components';
import {
    notifyReceivePartList,
    queryPartList,
    queryScanReceiptList,
    scanReceiptPartList,
    selectReceivingType,
} from '../actions';
import { parseReceivedParts, parseScanReceiptParts } from '../selectors';

const mapStateToProps = (state, props) => ({
    ...props,
    scanReceiptParts: parseScanReceiptParts(state),
    scanReceiptLoadingState: state.scanReceiptLoadingState,
    receivedParts: parseReceivedParts(state),
    receivedLoadingState: state.receivedLoadingState,
    receivingType: state.receivingType,
});

export default connect(
    mapStateToProps,
    {
        notifyReceivePartList,
        queryPartList,
        queryScanReceiptList,
        scanReceiptPartList,
        selectReceivingType,
    },
)(App);
