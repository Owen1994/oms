import { connect } from 'react-redux';
import App from '../components';
import { getMainDataList } from '../actions';
import { parseData } from '../selectors';


const mapStateToProps = state => ({
    mainDataList: parseData(state),
});
export default connect(
    mapStateToProps,
    { getMainDataList },
)(App);
