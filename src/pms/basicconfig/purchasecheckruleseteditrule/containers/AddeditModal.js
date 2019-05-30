import { connect } from 'react-redux';
import {
    addFinishConditionRight,
} from '../actions';
import AddeditModal from '../components/AddeditModal';


const mapStateToProps = (state, props) => ({
    ...props,
    ...state,
});

export default connect(
    mapStateToProps,
    {
        addFinishConditionRight,
    },
)(AddeditModal);
