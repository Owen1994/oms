import { connect } from 'react-redux';
import App from '../components';
import {
    getNotCoveredMainDataList,
    getHasCoveredMainDataList,
    getHasCovereDefaultData,
    getNotCoveredDefaultData,
} from '../actions';
import { parseHasCoverData, parseNotCoverData} from '../selectors';


const mapStateToProps = state => ({
    HasListData: parseHasCoverData(state),
    NotListData: parseNotCoverData(state),
    HasLoading: state.HasCoverLoading,
    NotLoading: state.NotCoverLoading,
});

export default connect(
    mapStateToProps,
    {
        getHasCoveredMainDataList,
        getNotCoveredMainDataList,
        getHasCovereDefaultData,
        getNotCoveredDefaultData,
    },
)(App);
