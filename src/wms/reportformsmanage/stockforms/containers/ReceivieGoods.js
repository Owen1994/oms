import { connect } from 'react-redux';
import App from '../components/receiviegoods/index';
import {
    queryReceivieGoodsList,
    clearRejectsList,
} from '../actions';
import parseParts from '../selectors';

const mapStateToProps = (state, props) => ({
    ...props,
    partList: parseParts(state.receivieGoodsParts),
    loadingState: state.receivieGoodsLoading,
});

export default connect(
    mapStateToProps,
    {
        queryReceivieGoodsList,
        clearRejectsList,
    },
)(App);
