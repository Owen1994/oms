/**
 * 作者: pzt
 * 描述: 模板管理
 * 时间: 2018/7/27 15:58
 **/
import React from 'react'
import { connect } from 'react-redux'
import App from '../components'
import querySites from '../../../common/actions/SiteAction'
import { queryRecordList } from '../actions'
import { parseRecords } from '../selectors'
const mapStateToProps = (state, props) => ({
  ...props,
  sites: state.Sites,
  data: parseRecords(state),
  loadingState: state.loadingRecordState
})

export default connect(
  mapStateToProps, 
  { querySites, queryRecordList }
)(App)
