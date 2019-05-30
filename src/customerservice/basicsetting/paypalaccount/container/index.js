import { connect } from 'react-redux';
import PaypalAccount from '../components';
import { fetchList } from '../actions';

const mapStateToProps = (state, ownProps) => {
    return {
        ...state,
        ...ownProps
    }
}

export default connect(
    mapStateToProps,
    { fetchList },
)(PaypalAccount);

