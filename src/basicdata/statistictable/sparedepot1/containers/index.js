import { connect } from 'react-redux';
import App from '../components';
import {
    getSkuList,
    // importSku,
    exportSku,
} from '../actions';
import parsedataListData from '../selectors';

const mapStateToProps = (state, props) => ({
    data: parsedataListData(state),
    loadingState: state.loadingState,
    ...props,
});

export default connect(
    mapStateToProps,
    {
        getSkuList,
        // importSku,
        exportSku,
    },
)(App);
