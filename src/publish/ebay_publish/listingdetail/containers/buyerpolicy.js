import React from 'react'
import { connect } from 'react-redux'
import BuyerPolicyComponent from '../components/buyersPolicy'
import {
    editComponentDataAction,
} from '../actions'
import {parseBuyerPolicy} from '../selector/buyerpolicyparse'

const mapStateToProps = (state, props) => {
    const buyerpolicyData = parseBuyerPolicy(state)
    return { ...props,buyerpolicyData }
};

export default connect(
    mapStateToProps,{
        editComponentDataAction
    }
)(BuyerPolicyComponent)
