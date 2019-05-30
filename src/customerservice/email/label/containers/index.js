import { connect } from 'react-redux';
import App from '../components';
import { listFetch, platformList } from '../actions';

const mapStateToProps = (state) => {
    const listReducer = state.listReducer;
    const paginationReducer = state.paginationReducer;
    const platformlistReducer = state.platformlistReducer;
    return { listReducer, paginationReducer, platformlistReducer };
};

export default connect(
    mapStateToProps,
    { listFetch, platformList },
)(App);
