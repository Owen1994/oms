import React from 'react'
import { connect } from 'react-redux'
import App from '../components'
import {
    getListingDetailDataAction,
    resetDetailDataAction,
    initUpcOrEanAction,
    setInitDetail
} from '../actions'
import {sendFormAction,isSkuExistAction} from '../actions/send'

const mapStateToProps = (state, props) => {
    const sendResult = state.sendResult;
    const skuInfo = state.skuinfoData;
    return { sendResult,skuInfo,...props }
};

export default connect(
    mapStateToProps,{
        setInitDetail,
        getListingDetailDataAction,
        resetDetailDataAction,
        initUpcOrEanAction,
        sendFormAction,
        isSkuExistAction,
    }
)(App)
