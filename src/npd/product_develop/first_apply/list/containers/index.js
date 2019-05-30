import React from 'react'
import { connect } from 'react-redux'
import App from '../components'
import action from '../actions'
import comAction from "../../common/action/index"
import "../css/css.css"


const mapStateToProps = (state,own) => {
  return {
    ...state,
    ...own
  }
};

export default connect(
  mapStateToProps,
  {...action,...comAction}
)(App)
