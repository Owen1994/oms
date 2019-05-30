import { connect } from 'react-redux'
import App from '../components'
import actions from '../actions'
import comActions from "../../common/action/index"
import "../css/css.css"



const mapStateToProps = (state,own) => {
  return { ...state,...own }
};

export default connect(
  mapStateToProps,
  {
    ...comActions,
    ...actions
  }
)(App)
