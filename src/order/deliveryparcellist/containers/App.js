import { connect } from 'react-redux';
import App from '../components';
import actions from '../actions';

const mapStateToProps = (state, props) => {
    return ({
    ...state,
    ...props,
});
}
export default connect(mapStateToProps, actions)(App);
