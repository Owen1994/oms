import { connect } from 'react-redux';
import App from '../components';
import { listFetch, isOpenTitleSearch } from '../actions';

const mapStateToProps = (state) => {
    const listReducer = state.listReducer;
    const paginationReducer = state.paginationReducer;
    return { listReducer, paginationReducer };
};

export default connect(
    mapStateToProps,
    { listFetch, isOpenTitleSearch },
)(App);
