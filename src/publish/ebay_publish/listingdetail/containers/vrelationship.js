import React from 'react'
import { connect } from 'react-redux'
import Vrelationship from '../components/skuinfo/variationrelationship'
import {
    addVpropsName,delVpropsName,editVpropsName
} from '../actions/skuvariation'

const mapStateToProps = (state, props) => {
    const vrelationship = state.vrelationship;
    const vlist = state.vlist;
    return { vrelationship,vlist,...props }
};

export default connect(
    mapStateToProps,{
        addVpropsName,delVpropsName,editVpropsName
    }
)(Vrelationship)
