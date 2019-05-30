import {connect} from 'react-redux';
import App from '../components';
import {
    queryChannelExceptionList,
} from "../actions";

const mapStateToProps = (state, props)=>({
    ...props,
    channelExceptionListData: state.channelExceptionListData,
    loadingState: state.loadingState,
})

export default connect(
    mapStateToProps,
    {
        queryChannelExceptionList,
    }
)(App)