import { connect } from 'react-redux';
import App from '../components/receiviegoodsdetail/index';
import {
    queryReceivieGoodsDetailList,
    clearRejectsList,
} from '../actions';

const mapStateToProps = (state, props) => ({
    ...props,
    partList: state.receivieGoodsDetailParts,
    loadingState: state.receivieGoodsDetailLoading,
});

export default connect(
    mapStateToProps,
    {
        queryReceivieGoodsDetailList,
        clearRejectsList,
    },
)(App);
