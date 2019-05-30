import { connect } from 'react-redux';
import App from '../components';
import {
    queryExceptionList,
    clearExceptionList,
} from '../actions';
import parseExceptions from '../selectors';

const mapStateToProps = (state, props) => ({
    ...props,
    partList: parseExceptions(state),
    loadingState: state.loadingExceptionState,
});

export default connect(
    mapStateToProps,
    {
        queryExceptionList,
        clearExceptionList,
    },
)(App);
