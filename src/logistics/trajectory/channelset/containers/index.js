import { connect } from 'react-redux';
import App from '../components';
import { loadDataList } from '../actions';
import { parseLogData } from '../seclector';

const mapStateToProps = (state, props) => ({
    data: parseLogData(state.data),
    loadingState: state.loadingState,
    ...props,
});

export default connect(
    mapStateToProps,
    { loadDataList },
)(App);
