import React from 'react'
import { connect } from 'react-redux'
import App from '../components'
import { getDecalarationListAciton } from '../actions'
import {addKey} from '../../selector'

const mapStateToProps = state => {
  const visibility = state.visibilityFilter;
  const decalarationListModel = addKey(state.decalarationListModel);
  // console.log(decalarationListModel)
  return { visibility, decalarationListModel }
};

export default connect(
  mapStateToProps,
  { getDecalarationListAciton }
)(App)
