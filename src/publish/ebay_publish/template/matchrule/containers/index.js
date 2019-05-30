/**
 * 作者: pzt
 * 描述: 模板管理
 * 时间: 2018/7/27 15:58
 **/
import React from 'react'
import { connect } from 'react-redux'
import App from '../components'
import { getMatchList} from '../actions'
import  { parseMatchListData } from '../selectors'




const mapStateToProps = (state, props) => {
    const loadingState = state.loadingState;
    const matchListData = parseMatchListData(state)
    return {loadingState,matchListData}
};

export default connect(
    mapStateToProps,
    { getMatchList }
)(App)
