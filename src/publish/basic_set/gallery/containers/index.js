/**
 * 作者: pzt
 * 描述: 图库设置
 * 时间: 2018/7/27 15:58
 **/
import React from 'react'
import { connect } from 'react-redux'
import App from '../components'
import { paginationAction,getGalleryRateList } from '../actions/index'


const mapStateToProps = (state, props) => {

    const visibility = state.visibilityFilter;
    const galleryListModel = state.galleryListModel;
    const paginationModel = state.paginationModel;
    return { visibility,galleryListModel,paginationModel }
};

export default connect(
    mapStateToProps,
    { getGalleryRateList,paginationAction }
)(App)
