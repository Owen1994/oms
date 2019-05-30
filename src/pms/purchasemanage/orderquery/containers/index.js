import { connect } from 'react-redux';
import App from '../components';
import { getOrderQueryList } from '../actions';
import { parseTables } from '../selectors';


/**
 * 当前页面需要的state中的数据
 * @param state
 * @returns {{list: *}}
 */
const mapStateToProps = state => ({
    orderList: parseTables(state),
    isLoading: state.isLoading,
});
export default connect(
    mapStateToProps,
    { getOrderQueryList },
)(App);
