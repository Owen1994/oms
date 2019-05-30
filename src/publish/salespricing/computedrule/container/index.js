import { connect } from 'react-redux';
import ComputedRule from '../components';
import { queryRules, rulesStateInit } from '../actions';

const mapStateToProps = (state, ownProps) => {
    return {
        ...state,
        ...ownProps
    }
}

export default connect(
    mapStateToProps,
    { queryRules, rulesStateInit },
)(ComputedRule);

