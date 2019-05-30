import React from 'react'
import { connect } from 'react-redux'
import SkuInfoComponent from '../components/skuInfo'
import {
    editComponentDataAction,
    switchSaleTypeAction,
    singleListingComputPriceAction,
    getDomesticList
} from '../actions'
import { parseSkuInfo } from '../selector/skuinfodataparse'

const mapStateToProps = (state, props) => {
    const site = state.basicData.site
    const skuinfoData = parseSkuInfo(state)
    const basicData = state.basicData;
    const anotherData = state.anotherData;
    const vrelationship = state.vrelationship;
    return { ...props, skuinfoData, basicData, anotherData, vrelationship, site }
};

export default connect(
    mapStateToProps, {
        editComponentDataAction,
        switchSaleTypeAction,
        singleListingComputPriceAction,
        getDomesticList
    }
)(SkuInfoComponent)
