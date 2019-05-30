import { connect } from 'react-redux';
import App from '../components';
import queryMerchandiserDetailList from '../actions/index';
import parseDocumentaryDetai from '../selectors/index';

const mapStateToProps = state => ({
    documentaryDetailData: parseDocumentaryDetai(state),
});


export default connect(
    mapStateToProps,
    { queryMerchandiserDetailList },
)(App);
