import React from 'react'
import { connect } from 'react-redux'
import EbayCategoryComponent from '../components/basicinfo/ebaycategory'
import {
    editProductAttrAction,
    searchClassAction,
    // getCategorySpecificsAction
} from '../actions'
import {parseEbayCategoryData} from '../selector/ebaycategorydataparse'

const mapStateToProps = (state, props) => {
    const ebayCategoryData = parseEbayCategoryData(state);
    const vrelationship = state.vrelationship;
    return { ebayCategoryData,vrelationship,...props }
};

export default connect(
    mapStateToProps,{
        editProductAttrAction,
        searchClassAction,
        // getCategorySpecificsAction
    }
)(EbayCategoryComponent)
