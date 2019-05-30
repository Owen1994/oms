import { connect } from 'react-redux';
import App from '../components';
import queryMerchandiserList from '../actions/index';
// import parseDocumentary from '../selectors/index';

const mapStateToProps = state => ({
    documentaryData: state.documentaryListObj,
    loadingData: state.loadingObj,
});


export default connect(
    mapStateToProps,
    { queryMerchandiserList },
)(App);
