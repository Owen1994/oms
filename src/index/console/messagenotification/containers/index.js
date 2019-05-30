import { connect } from 'react-redux';
import App from '../components';
import { getMyReceiveList, getMySendList, updataMyReviewMsgListViewState, updataMySendMsgListViewState } from '../actions';
import { receiveTables, sendTables } from '../selectors';

/**
 * 当前页面需要的state中的数据
 * @param state
 * @returns {{list: *}}
 */
const mapStateToProps = state => ({
    myReceiveList: receiveTables(state.getMyReceiveList),
    mySendList: sendTables(state.getMySendList),
    listLoadState: state.receiveLoadState,
});

export default connect(
    mapStateToProps,
    { getMyReceiveList, getMySendList, updataMySendMsgListViewState, updataMyReviewMsgListViewState },
)(App);
