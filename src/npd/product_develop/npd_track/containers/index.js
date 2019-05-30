import { connect } from 'react-redux'
import App from '../components'
import { getTrackList,searchUserList } from '../actions'
import { parseList } from '../selector'


const mapStateToProps = (state, props) => {
  const data = parseList(state.datas);
  return { data, ...props }
};

export default connect(
  mapStateToProps,
  { getTrackList,searchUserList }
)(App)
