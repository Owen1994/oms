import {connect} from 'react-redux';
import App from '../components';
import {
    queryDeliveryPriorityList,
} from "../actions";

const mapStateToProps = (state, props)=>({
    ...props,
    deliveryPriorityListData: state.deliveryPriorityListData,
    loadingState: state.loadingState,
})

export default connect(
    mapStateToProps,
    {
        queryDeliveryPriorityList,
    }
)(App)