import { connect } from 'react-redux';
import App from '../components';
import { parsePrint } from '../selectors/index';
import { getOrderPrintAccess } from '../actions/index';

const mapStateToProps = state => ({
    arrayOrderPrintInfo: parsePrint(state),
    loadingObj: state.loadingState,
});

export default connect(
    mapStateToProps,
    {
        getOrderPrintAccess,
    },
)(App);
