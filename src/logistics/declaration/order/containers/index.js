/**
 *作者: 黄建峰
 *功能描述: 制单、查看制单资料
 *参数说明:
 *时间: 2018/6/12
 */
import React from 'react'
import { connect } from 'react-redux'
import App from '../components'
import {
  getCustomsDocument,
  editCustomsDocumentColumn,
} from '../actions'

const mapStateToProps = (state,props) => {
  const customsDocument = state.customsDocument;
  const loadState = state.loadState;
  const editColumnsState = state.editColumnsState;
  return { loadState, customsDocument, editColumnsState, ...props }
};

export default connect(
  mapStateToProps,
  { getCustomsDocument, editCustomsDocumentColumn }
)(App)
