import { connect } from 'react-redux';
import App from '../components';

const mapStateToProps = (state, props) => ({
    ...props,
    // data: parsedataListData(state),
    // loadingState: state.loadingRecordState,
});

export default connect(
    mapStateToProps,
)(App);
