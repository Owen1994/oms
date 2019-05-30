import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as TodoActions from '../actions'
import App from '../components';
import { parseListData } from '../selectors'

const mapStateToProps = state => ({
  paramsData:state.paramsData,
  listData: parseListData(state),
  loadingData:state.loadingData,
  searchOptionData:state.searchOptionData,
})
// console.log(TodoActions,"TodoActions")
// const mapDispatchToProps = dispatch => ({
//   actions: bindActionCreators(TodoActions, dispatch)
// })
const mapDispatchToProps = {
  ...TodoActions
}
const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default VisibleTodoList
