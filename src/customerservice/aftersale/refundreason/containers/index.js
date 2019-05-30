import { connect } from 'react-redux';
import App from '../components';
import { reasonListFetch, formListFetch } from '../actions';

const mapStateToProps = (state) => {
    const refundReasonList = state.refundReasonList;
    const refundFormList = state.refundFormList;
    const refundReasonLoading = state.refundReasonLoading;
    const refundFormLoading = state.refundFormLoading;
    // const platformlistReducer = state.platformlistReducer;
    return {
        refundReasonList, refundReasonLoading, refundFormList, refundFormLoading,
    };
};

export default connect(
    mapStateToProps,
    { reasonListFetch, formListFetch },
)(App);
