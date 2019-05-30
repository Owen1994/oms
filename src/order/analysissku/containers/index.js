import { connect } from 'react-redux';
import App from '../components';
import getAnalysiSkuList from '../actions';
import parseEcharData from '../selectors/Echar';
import parsedataListData from '../selectors';

const mapStateToProps = (state, props) => ({
    ...props,
    dataList: parsedataListData(state),
    options: parseEcharData(state.data),
    loadingState: state.loadingRecordState,
});

export default connect(
    mapStateToProps,
    { getAnalysiSkuList },
)(App);
