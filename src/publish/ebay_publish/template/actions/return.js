import {fetchPost} from "../../../../util/fetch";
import {GET_RETURN_TEMPLATE} from "../constants/ReturnApi";
import {RECEIVE_RETURN_LIST,LOADING_TEMPLATE_LIST} from "../constants/index"
import {reviseTemplateTabNum} from "./index";



const receiveGetReturnTemplate = (dispatch, data) => {
    dispatch({
        type: RECEIVE_RETURN_LIST,
        data
    })
}
/**
 * 退款模板列表
 * @param {*} params
 */
export const getReturnTemplate = (params) => dispatch => {
    dispatch({
        type: LOADING_TEMPLATE_LIST,
        data: {state: true}
    })
    fetchPost(GET_RETURN_TEMPLATE, params, )
        .then(result => {
            dispatch({
                type: LOADING_TEMPLATE_LIST,
                data: {state: false}
            })
            if(result.state === '000001'){
                receiveGetReturnTemplate(dispatch, result.data)
                reviseTemplateTabNum(dispatch, {num: result.data.total, index: 2});
            }
        })
}