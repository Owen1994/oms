import { connect } from 'react-redux';
import App from '../components/qualitytestdetail/index';
import {
    queryQualitryTestDetailList,
    clearRejectsList,
} from '../actions';

const mapStateToProps = (state, props) => ({
    ...props,
    partList: state.qualityTestDetailDrawerParts,
    loadingState: state.qualityTestDetailDrawerLoading,
});

export default connect(
    mapStateToProps,
    {
        queryQualitryTestDetailList,
        clearRejectsList,
    },
)(App);
