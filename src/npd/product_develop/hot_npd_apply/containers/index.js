import { connect } from 'react-redux'
import App from '../components'
import { 
  getHotNpdApplyList,
  deleteItem,
  assignTask,
  exportFile
} from '../actions'
import { addKeyToArray } from '../../../selector'


const mapStateToProps = state => {
  const datas = addKeyToArray(state.datas);
  const loadState = state.loadState;
  return { datas, loadState }
};

export default connect(
  mapStateToProps,
  { getHotNpdApplyList,deleteItem,assignTask,exportFile  }
)(App)
