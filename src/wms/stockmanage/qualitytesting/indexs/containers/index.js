import { connect } from 'react-redux';
import App from '../components';
import { queryPartList, setItemEdit } from '../actions';
import parseParts from '../selectors';

const mapStateToProps = (state, props) => ({
    ...props,
    partList: parseParts(state),
    loadingState: state.loadingPartState,
});

export default connect(
    mapStateToProps,
    { queryPartList, setItemEdit },
)(App);
