import { connect } from 'react-redux';
import App from '../components';
import {
    queryRejectsList,
    clearRejectsList,
} from '../actions';
// import parseRejects from '../selectors';

const mapStateToProps = (state, props) => ({
    ...props,
    // data: parseRejects(state),
    data: state.rejects,
    loadingState: state.loadingRejectsState,
});

export default connect(
    mapStateToProps,
    {
        queryRejectsList,
        clearRejectsList,
    },
)(App);
