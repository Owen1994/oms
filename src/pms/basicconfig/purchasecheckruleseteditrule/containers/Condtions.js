import { connect } from 'react-redux';
import Condtions from '../components/Condtions';
// import {
//     checkCondtion,
// } from '../actions';


const mapStateToProps = (state, props) => ({
    ...props,
    ...state,
});

export default connect(
    mapStateToProps,
    // {
    //     checkCondtion,
    // },
)(Condtions);
