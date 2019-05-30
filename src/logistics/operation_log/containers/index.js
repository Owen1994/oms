import React from 'react'
import { connect } from 'react-redux'
import App from '../components'
import {
  getOperationLogList,
  paginationAction,
  filterAction,
} from '../actions/'


const mapStateToProps = (state, props) => {
  // console.log("state");
  // console.log(state);
  const operationList = state.operationList;
  const visibility = state.visibilityFilter;
  const paginationModel = state.paginationModel;
  const filterModel = state.filterModel;
  return { visibility, operationList, paginationModel, filterModel }
};

export default connect(
  
  mapStateToProps,
  { getOperationLogList, paginationAction, filterAction }
)(App)
