import { connect } from 'react-redux';
import App from '../components/comparedetail/index';
import {
    queryCompareDetailList,
    clearRejectsList,
} from '../actions';

const mapStateToProps = (state, props) => ({
    ...props,
    partList: state.compareDetailParts,
    loadingState: state.compareDetailLoading,
});

export default connect(
    mapStateToProps,
    {
        queryCompareDetailList,
        clearRejectsList,
    },
)(App);
