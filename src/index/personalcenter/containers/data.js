import {connect} from 'react-redux';
import actions from '../actions';
import DataComponent from '../components/data';

const mapStateToProps = (state, props) => ({
    ...state,
    ...props
})

const mapDispatchToProps = {
    ...actions
}
  
export default connect(mapStateToProps, mapDispatchToProps)(DataComponent);
