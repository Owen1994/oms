import { connect } from 'react-redux';
import WaitingReviewOrderApp from '../components/order/index';
import { parseOrders } from '../selectors/index';

import {
    queryOrderList,
} from '../actions/index';


const mapStateToProps = state => ({
    orderData: parseOrders(state),
    loadingOrderObj: state.loadingOrderObj,
});

export default connect(
    mapStateToProps,
    { queryOrderList },
)(WaitingReviewOrderApp);
