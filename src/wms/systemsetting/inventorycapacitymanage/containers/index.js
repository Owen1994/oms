import { connect } from 'react-redux';
import App from '../components';
import {
    queryStoragePlaceList,
    clearStoragePlaceList,
} from '../actions/storageplace';
import {
    queryInventoryList,
    clearInventoryList,
} from '../actions/inventory';
// import parseStoragePlace from '../selectors/storageplace';
import parseInventory from '../selectors/inventory';

const mapStateToProps = (state, props) => ({
    ...props,
    // data: parseStoragePlace(state),
    dataInventory: parseInventory(state),
    data: state.storageplace,
    loadingState: state.loadingStoragePlaceState,
});

export default connect(
    mapStateToProps,
    {
        queryStoragePlaceList,
        clearStoragePlaceList,
        queryInventoryList,
        clearInventoryList,
    },
)(App);
