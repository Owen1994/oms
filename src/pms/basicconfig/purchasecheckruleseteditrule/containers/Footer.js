import { connect } from 'react-redux';
import Footer from '../components/Footer';
import {
    executionActionAdd,
    executionActionDel,
    executionActionSetValue,
} from '../actions';


const mapStateToProps = (state, props) => ({
    ...props,
    ...state,
});

export default connect(
    mapStateToProps,
    {
        executionActionAdd,
        executionActionDel,
        executionActionSetValue,
    },
)(Footer);
