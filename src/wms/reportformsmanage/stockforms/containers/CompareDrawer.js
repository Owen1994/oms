import { connect } from 'react-redux';
import App from '../components/comparedetail/index';
import {
    queryCompareDetailList,
    clearRejectsList,
} from '../actions';

const mapStateToProps = (state, props) => ({
    ...props,
    partList: state.compareDetailDrawerParts,
    loadingState: state.compareDetailDrawerLoading,
});

export default connect(
    mapStateToProps,
    {
        queryCompareDetailList,
        clearRejectsList,
    },
)(App);
