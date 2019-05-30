import { connect } from 'react-redux';
import App from '../components/compare/index';
import {
    queryCompareList,
    clearRejectsList,
} from '../actions';
import parseParts from '../selectors';

const mapStateToProps = (state, props) => ({
    ...props,
    partList: parseParts(state.compareParts),
    loadingState: state.compareLoading,
});

export default connect(
    mapStateToProps,
    {
        queryCompareList,
        clearRejectsList,
    },
)(App);
