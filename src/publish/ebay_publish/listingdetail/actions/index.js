/**
 * 作者: pzt
 * 描述: listing 详情页相关action
 * 时间: 2018/7/28 15:39
 **/
import { fetchPost } from '../../../../util/fetch'
import { GET_LISTING_DETAIL, GET_CALCUL_VAR_LISTING, GET_CALCUL_LISTING, GET_DOMESTIC_LIST } from '../constants/api'
import * as types from '../constants/reducerTypes'

// 获取listing详情数据
export const receiveListingDetailData = data => ({
    type: types.LISTING_DETAIL_DATA_FETCH,
    data
})
// 加载SKU资料时的数据
export const receiveSkuInfoData = data => ({
    type: types.LOADING_SKUINFO,
    data
})
// 修改详情页各组件数据
export const receiveComponentData = (type, key, value) => ({
    type,
    key,
    value
})
// 修改详情页产品属性数据
export const receiveProductAttrData = (type, data) => ({
    type,
    data
})
// 修改临时存放在reducer里的数据
export const receiveAnotherData = (type, key, value) => ({
    type,
    key,
    value
})

// 重置详情页数据数据
export const resetDetailData = () => ({
    type: types.RESET_DETAIL_DATA,
})

export const setInitDetail = (r) => ({
    type: types.SET_INIT_DETAIL,
    payload: r
})

export const getListingDetailDataAction = params => (dispatch) => {
    return fetchPost(GET_LISTING_DETAIL, params, 2).then(res => {
        if (res && res.state === "000001") {
            res.data.productInfo.defaultDescriptionContent = res.data.productInfo.descriptionContent
            // return dispatch(receiveListingDetailData(testData));
            dispatch(receiveListingDetailData(res.data));
            return res.data
        }
    })
}

export const editComponentDataAction = (type, key, value) => (dispatch) => {
    return dispatch(receiveComponentData(type, key, value));
}
export const editProductAttrAction = (type, data) => (dispatch) => {
    return dispatch(receiveProductAttrData(type, data));
}
export const loadingSkuInfoAction = (data) => (dispatch) => {
    return dispatch(receiveSkuInfoData(data));
}
export const editAnotherDataAction = (type, key, data) => (dispatch) => {
    return dispatch(receiveAnotherData(type, key, data));
}

export const resetDetailDataAction = () => (dispatch) => {
    return dispatch(resetDetailData());
}
// 切换站点时触发
export const switchSiteAction = params => (dispatch) => {
    return dispatch({ type: types.SWITCH_SITE, ...params })
}
// 切换销售类型时触发
export const switchSaleTypeAction = params => (dispatch) => {
    return dispatch({ type: types.SWITCH_SALETYPE, ...params })
}
// 编辑时初始化 upcOrEan INIT_UPCOREAN
export const initUpcOrEanAction = params => (dispatch) => {
    return dispatch({ type: types.INIT_UPCOREAN, ...params })
}
// 选择 ebay 分类
export const searchClassAction = params => (dispatch) => {
    return dispatch({ type: types.SEARCH_EBAY_CATEGORY, ...params })
}

// 选择ebay 分类最后一级时触发
export const getCategorySpecificsAction = params => (dispatch) => {
    return dispatch({ type: types.GET_CATEGORY_SPECIFICS, ...params })
}

// 选择刊登模板触发
export const setTemplatiesAction = params => (dispatch) => {
    return dispatch({ type: types.INIT_TEMPLATE, ...params })
}
// 选择刊登模板触发
export const getTemplatiesAction = params => (dispatch) => {
    return dispatch({ type: types.GET_TEMPLATIES, ...params })
}

// 清空刊登模板数据
export const resetTemplatiesAction = () => (dispatch) => {
    return dispatch({ type: types.RESET_TEMPLATIES })
}
// 选择产品属性更改子类的值
export const productSelectAction = params => (dispatch) => {
    return dispatch({ type: types.PRODUCT_SELECT, ...params })
}

// 修改模板信息 的运输模板会切换 运输模板信息
export const templatiesDataToggleAction = params => (dispatch) => {
    return dispatch({ type: types.LISTING_TOGGLE, payload: params })
}
// 获取售价计算规则列表
export const getDomesticList = params => (dispatch) => {
    return fetchPost(GET_DOMESTIC_LIST, params, 2).then(res => {
        if (res.state == '000001' && res.data && res.data.list) {
            return res.data.list
        }
        return []
    })
}


// 单条listing计算价格
export const singleListingComputPriceAction = params => (dispatch) => {
    return fetchPost(GET_CALCUL_LISTING, params, 2).then(res => {
        return res;
    })
}
// 多属性listing计算价格
export const moreListingComputPriceAction = params => (dispatch) => {
    return fetchPost(GET_CALCUL_VAR_LISTING, params, 2).then(res => {
        return res;
    })
}