import { connect } from 'react-redux';
import App from '../components';
// import queryPartList from '../actions';
import parseParts from '../selectors';
import * as ACTIONS from '../actions';

const mapStateToProps = (state, props) => ({
    ...props,
    partList: parseParts(state),
    loadingState: state.loadingPartState,
    platformmodaldata: state.platformmodaldata,
    channelmodaldata: state.channelmodaldata,
});

export default connect(
    mapStateToProps,
    { ...ACTIONS },
)(App);
