import { connect } from 'react-redux';
import App from '../components/qualitytestdetail/index';
import {
    queryQualitryTestDetailList,
    clearRejectsList,
} from '../actions';

const mapStateToProps = (state, props) => ({
    ...props,
    partList: state.qualityTestDetailParts,
    loadingState: state.qualityTestDetailLoading,
});

export default connect(
    mapStateToProps,
    {
        queryQualitryTestDetailList,
        clearRejectsList,
    },
)(App);
