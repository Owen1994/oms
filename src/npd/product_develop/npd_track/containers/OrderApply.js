import { connect } from 'react-redux'
import App from '../components/OrderApply'
import { getTrackList } from '../actions'


const mapStateToProps = (state, props) => {
  return { ...state, ...props }
};

export default connect(
  mapStateToProps,
  { getTrackList }
)(App)
