/**
 * 运输模板新增修改弹窗服务action
 */
import {GET_SERVICE_DELETE,GET_SERVICE_ADD,MODIFY_SERVIVE_ITEM,RESET_SERVIVE_ITEM,INITI_DATALIST,RESET_DATALIST} from "../constants/index"
import {RESET_FORM_DATALIST} from "../constants";

/**
 * 新增服务列表
 * @param {*} params
 */
export const addService = (params) => dispatch => {
    dispatch({
        type: GET_SERVICE_ADD,
        ...params
    })
}
/**
 * 删除服务列表
 * @param {*} params
 */
export const deleteService = (params) => dispatch => {
    dispatch({
        type: GET_SERVICE_DELETE,
        ...params
    })
}
/**
 * 修改服务列表
 * @param {*} params
 */
export const modifyServiveItem = (params) => dispatch => {
    dispatch({
        type: MODIFY_SERVIVE_ITEM,
        ...params
    })
}
/**
 * 单独重置本地运输或全球运输服务列表
 * @param {*} params
 */
export const resetServiveItem = (params) => dispatch => {
    dispatch({
        type: RESET_SERVIVE_ITEM,
        ...params
    })
}
/**
 * 重置弹窗详情数据
 * @param {*} params
 */
export const resetInitidatalist = (params) => dispatch => {
    dispatch({
        type: INITI_DATALIST,
        ...params
    })
}
/**
 * 重置弹窗本地运输和全球运输模板数据
 * @param {*} params
 */
export const resetdatalist = (params) => dispatch => {
    dispatch({
        type: RESET_DATALIST,
        ...params
    })
}