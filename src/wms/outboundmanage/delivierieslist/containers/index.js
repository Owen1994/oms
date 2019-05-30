import { connect } from 'react-redux';
import App from '../components';
import queryPartList from '../actions';

const mapStateToProps = (state, props) => ({
    ...props,
    partList: state.parts,
    loadingState: state.loadingPartState,
});

export default connect(
    mapStateToProps,
    { queryPartList },
)(App);
