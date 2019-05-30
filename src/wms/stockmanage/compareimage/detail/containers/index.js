import { connect } from 'react-redux';
import App from '../components';
import queryData from '../actions';

const mapStateToProps = (state, props) => ({
    ...props,
    data: state.parts,
    loadingState: state.loadingPartState,
});

export default connect(
    mapStateToProps,
    { queryData },
)(App);
