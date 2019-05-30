import {connect} from 'react-redux';
import actions from '../actions';
import OperateComponent from '../components/operate';

const mapStateToProps = (state, props) => ({
    ...state,
    ...props
})

const mapDispatchToProps = {
    ...actions
}
  
export default connect(mapStateToProps, mapDispatchToProps)(OperateComponent);
