import {fetchPost} from "../../../../util/fetch";
import {TEMPLATE_NUM_API} from "../constants/Api";
import { RECEIVE_TEMPLATE_NUM,INITI_FORM_DATALIST,RESET_FORM_DATALIST,SET_SITE} from "../constants/index"
import {REVISE_TEMPLATE_TAB_NUM} from "../constants";
const receiveTemplateNum = (dispatch, data) => {
    dispatch({
        type: RECEIVE_TEMPLATE_NUM,
        data
    })
}
/**
 * 获取模板数量
 * @param {*} params
 */
export const getTemplateNum = (params) => dispatch => {
    fetchPost(TEMPLATE_NUM_API, params, )
        .then(result => {
            if(result.state === '000001'){
                receiveTemplateNum(dispatch, result.data)
            }
        })
}

/**
 * 初始化运输模板弹窗列表数据
 * @param {*} params
 */
export const initiFormDatalist = (params) => dispatch => {
    dispatch({
        type: INITI_FORM_DATALIST,
        ...params
    })
}

/**
 * 重置运输模板弹窗列表数据
 * @param {*} params
 */
export const resetFormDatalist = (params) => dispatch => {
    dispatch({
        type: RESET_FORM_DATALIST,
        ...params
    })
}

/**
 * 设置站点
 * @param {*} params
 */
export const resetRetSite = (params) => dispatch => {
    dispatch({
        type: SET_SITE,
        ...params
    })
};


/**
 * 修改模板页签数量
 * @param {*} params
 */
export const  reviseTemplateTabNum = (dispatch, data) => {
    dispatch({
        type: REVISE_TEMPLATE_TAB_NUM,
        ...data
    })
}
