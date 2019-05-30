// 新增编辑方案
import { connect } from 'react-redux';
import App from '../components';
import actions from '../actions';
import { getPlatformShopByEntityCode } from '../actions/loadentitydata';

const mapStateToProps = (state, props) => ({
    ...state,
    ...props,
});

export default connect(
    mapStateToProps,
    { ...actions, getPlatformShopByEntityCode },
)(App);
