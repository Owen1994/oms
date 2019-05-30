import React from 'react'
import { connect } from 'react-redux'
import PublishComponent from '../components/basicinfo/publishtemplate'
import {
    getTemplatiesAction
} from '../actions'

const mapStateToProps = (state, props) => {
    const basicData = state.basicData;
    const templatiesData = state.templatiesData;
    return { ...props,basicData,templatiesData }
};

export default connect(
    mapStateToProps,{
        getTemplatiesAction
    }
)(PublishComponent)
