import { connect } from 'react-redux';
import App from '../components';
import queryPickerList from '../actions';
import parseParts from '../selectors';

const mapStateToProps = (state, props) => ({
    ...props,
    partList: parseParts(state),
    loadingState: state.loadingPartState,
});

export default connect(
    mapStateToProps,
    { queryPickerList },
)(App);
