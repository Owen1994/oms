import { connect } from 'react-redux'
import App from '../components'
import { getSpecimenList } from '../actions'
import { addKey } from '../selector'



const mapStateToProps = state => {
  const datas = addKey(state.datas);
  return { datas }
};

export default connect(
  mapStateToProps,
  { getSpecimenList }
)(App)
