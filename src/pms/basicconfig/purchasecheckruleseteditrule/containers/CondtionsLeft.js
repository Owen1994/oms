import { connect } from 'react-redux';
import {
    checkCondtion,
} from '../actions';
import CondtionsLeft from '../components/CondtionsLeft';


const mapStateToProps = (state, props) => ({
    ...props,
    ...state,
});

export default connect(
    mapStateToProps,
    {
        checkCondtion,
    },
)(CondtionsLeft);
