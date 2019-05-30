import { connect } from 'react-redux';
import App from '../components';
import { queryPartList, queryDetailsPartList } from '../actions';
import parseParts from '../selectors';

const mapStateToProps = (state, props) => ({
    ...props,
    partList: parseParts(state),
    loadingState: state.loadingPartState,
    planDetailLoadingState: state.planDetailLoadingPartState,
    planDetailParts: state.planDetailParts,
});

export default connect(
    mapStateToProps,
    { queryPartList, queryDetailsPartList },
)(App);
