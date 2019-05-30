import { connect } from 'react-redux';
import App from '../components';
import { refundFetch } from '../actions';

const mapStateToProps = (state) => {
    const refundList = state.refundList;
    const refundLoading = state.refundLoading;
    return { refundList, refundLoading };
};

export default connect(
    mapStateToProps,
    { refundFetch },
)(App);
