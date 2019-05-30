import { connect } from 'react-redux'
import App from '../components'
import { getSkuList } from '../actions'
import { parseList } from '../selectors'


const mapStateToProps = state => {
  const data = parseList(state.datas);
  return { data }
};

export default connect(
  mapStateToProps,
  { getSkuList }
)(App)
