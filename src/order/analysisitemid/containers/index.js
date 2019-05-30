import { connect } from 'react-redux';
import App from '../components';
import getItemIDList from '../actions';
import parsedataListData from '../selectors';

const mapStateToProps = (state, props) => ({
    ...props,
    dataList: parsedataListData(state),
    loadingState: state.loadingItemIDState,
});

export default connect(
    mapStateToProps,
    { getItemIDList },
)(App);
