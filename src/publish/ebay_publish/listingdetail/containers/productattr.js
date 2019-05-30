import React from 'react'
import { connect } from 'react-redux'
import ProductAttrComponent from '../components/productAttr'
import {
    editProductAttrAction,editComponentDataAction,productSelectAction
} from '../actions'
import {parseProductAttr} from '../selector/productattrparse'

const mapStateToProps = (state, props) => {
    const productattrData = parseProductAttr(state)
    const basicData = state.basicData;
    const anotherData = state.anotherData
    return { ...props,productattrData,basicData,anotherData }
};

export default connect(
    mapStateToProps,{
        editProductAttrAction,editComponentDataAction,productSelectAction
    }
)(ProductAttrComponent)
