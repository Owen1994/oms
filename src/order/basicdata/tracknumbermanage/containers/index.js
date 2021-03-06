import React from 'react'
import { connect } from 'react-redux'
import App from '../components'
import action from '../actions'
import "../css/css.css"


const mapStateToProps = (state,own) => {
  return {
    ...own,
    ...state
  }
};

export default connect(
  mapStateToProps,
  action
)(App)
