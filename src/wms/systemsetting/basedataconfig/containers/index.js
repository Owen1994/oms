import { connect } from 'react-redux';
import App from '../components';
import {
    queryBaseList,
    clearBaseList,
} from '../actions';
// import parseBases from '../selectors';
// import {
//     addBodyItem,
//     delBodyItem,
//     editBodyItem,
//     modifyBodyItem,
//     saveBodyItem,
//     initBodyItem,
//     clearBodyItem,
// } from '../actions/bodymodalaction';
import * as ACTIONS from '../actions/bodymodalaction';

const mapStateToProps = (state, props) => ({
    ...props,
    // data: parseBases(state),
    data: state.bases,
    loadingState: state.loadingBaseState,
    bodymodaldata: state.bodymodaldata,
    warehousemodaldata: state.warehousemodaldata,
});

export default connect(
    mapStateToProps,
    {
        queryBaseList,
        clearBaseList,
        // addBodyItem,
        // delBodyItem,
        // editBodyItem,
        // modifyBodyItem,
        // saveBodyItem,
        // initBodyItem,
        // clearBodyItem,
        ...ACTIONS,
    },
    // ...ACTIONS,
)(App);
