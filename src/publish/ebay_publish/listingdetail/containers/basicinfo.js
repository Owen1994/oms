import React from 'react'
import { connect } from 'react-redux'
import BasicInfoComponent from '../components/basicinfo/basicInfo'
import {
    editComponentDataAction,
    loadingSkuInfoAction,
    editAnotherDataAction,
    editProductAttrAction,
    switchSiteAction,
    switchSaleTypeAction,
    getTemplatiesAction,
    resetTemplatiesAction,
    getCategorySpecificsAction,
    setTemplatiesAction
} from '../actions'
import {parseBasicData} from '../selector/basicdataparse'

const mapStateToProps = (state, props) => {
    const basicObj = parseBasicData(state);
    const ebayCategoryData = state.ebayCategoryData;
    const anotherData = state.anotherData;
    return { basicObj,ebayCategoryData,anotherData,...props }
};

export default connect(
    mapStateToProps,{
        editComponentDataAction,
        editProductAttrAction,
        loadingSkuInfoAction,
        editAnotherDataAction,
        switchSiteAction,
        switchSaleTypeAction,
        getTemplatiesAction,
        resetTemplatiesAction,
        getCategorySpecificsAction,
        setTemplatiesAction
    }
)(BasicInfoComponent)
