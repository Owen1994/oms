import React from 'react'
import { connect } from 'react-redux'
import App from '../components'
import { paginationAction, getSkuRateList, getRateList, filterDataAction} from '../actions'


const mapStateToProps = state => {
  const visibility = state.visibilityFilter;
  const skuRateListModel = state.skuRateListModel;
  const rateListModel = state.rateListModel;
  const paginationModel = state.paginationModel;
  const filterDataModel = state.filterDataModel;
return {visibility, paginationModel, skuRateListModel, rateListModel, filterDataModel}
};

export default connect(
  mapStateToProps,
  { getSkuRateList, getRateList, paginationAction, filterDataAction }
)(App)
