import { connect } from 'react-redux';
import QualityTest from '../components/qualitytest/index';
import {
    queryQualitryTestList,
    clearRejectsList,
} from '../actions';
import parseParts from '../selectors';

const mapStateToProps = (state, props) => ({
    ...props,
    partList: parseParts(state.qualityTestParts),
    loadingState: state.qualityTestLoading,
});

export default connect(
    mapStateToProps,
    {
        queryQualitryTestList,
        clearRejectsList,
    },
)(QualityTest);
