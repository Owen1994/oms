/**
 *作者: 黄建峰
 *参数说明:
 *时间: 2018/4/16 10:48
 */
import { connect } from 'react-redux';
import AppComponent from '../components';
import actions from '@/common/actions';

const mapStateToProps = (state, props) => ({
    ...state,
    ...props,
});

export default connect(
    mapStateToProps,
    { ...actions },
)(AppComponent);
