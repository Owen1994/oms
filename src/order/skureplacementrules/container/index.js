import {connect} from 'react-redux';
import App from '../components';
import {
    querySkuReplacementList,
    queryPlatformList,
    addItem,
    delItem,
    modifyItem,
    editItem,
    saveItem,
    initItem,
    clearItem,
} from "../actions";

const mapStateToProps = (state, props)=>({
    ...props,
    skuReplacementListData: state.skuReplacementListData,
    loadingState: state.loadingState,
    platformList: state.platformList,
    actionData: state.actiondata,
})

export default connect(
    mapStateToProps,
    {
        querySkuReplacementList,
        queryPlatformList,
        addItem,
        delItem,
        modifyItem,
        editItem,
        saveItem,
        initItem,
        clearItem,
    }
)(App)