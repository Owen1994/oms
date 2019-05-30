import {fetchPost} from "../../../../util/fetch";
import {GET_TRANSPORT_TEMPLATE} from "../constants/TransportApi";
import {RECEIVE_TRANSPORT_LIST,LOADING_TEMPLATE_LIST} from "../constants/index"
import {reviseTemplateTabNum} from "./index";



const receiveGetTransportTemplate = (dispatch, data) => {
    dispatch({
        type: RECEIVE_TRANSPORT_LIST,
        data
    })
}
/**
 * 运输模板列表
 * @param {*} params
 */
export const getTransportTemplate = (params) => dispatch => {
    dispatch({
        type: LOADING_TEMPLATE_LIST,
        data: {state: true}
    })
    fetchPost(GET_TRANSPORT_TEMPLATE, params, )
        .then(result => {
            dispatch({
                type: LOADING_TEMPLATE_LIST,
                data: {state: false}
            })
            if(result.state === '000001'){
                receiveGetTransportTemplate(dispatch, result.data)
                reviseTemplateTabNum(dispatch, {num: result.data.total, index: 1});
            }
        })
}