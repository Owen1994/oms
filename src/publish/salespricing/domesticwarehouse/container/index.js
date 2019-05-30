import { connect } from 'react-redux';
import DomesticWarehouse from '../components';
import { queryResult, pricingStateInit } from '../actions';

const mapStateToProps = (state, ownProps) => {
    return {
        ...state,
        ...ownProps
    }
}

export default connect(
    mapStateToProps,
    { queryResult, pricingStateInit },
)(DomesticWarehouse);

