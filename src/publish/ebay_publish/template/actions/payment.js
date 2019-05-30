import {fetchPost} from "../../../../util/fetch";
import {GET_PAYMENT_TEMPLATE} from "../constants/PaymentApi";
import {RECEIVE_PAYMENT_LIST,LOADING_TEMPLATE_LIST,REVISE_TEMPLATE_TAB_NUM} from "../constants/index"
import {reviseTemplateTabNum} from "./index";



//修改tab表头数量
const  revise_template_tab_num = (dispatch, data) => {
    dispatch({
        type: REVISE_TEMPLATE_TAB_NUM,
        data
    })
}

const receiveGetPaymentTemplate = (dispatch, data) => {
    dispatch({
        type: RECEIVE_PAYMENT_LIST,
        data
    })
}
/**
 * 付款模板列表
 * @param {*} params
 */
export const getPaymentTemplate = (params) => dispatch => {
    dispatch({
        type: LOADING_TEMPLATE_LIST,
        data: {state: true}
    })
    fetchPost(GET_PAYMENT_TEMPLATE, params, )
        .then(result => {
            dispatch({
                type: LOADING_TEMPLATE_LIST,
                data: {state: false}
            });
            if(result.state === '000001'){
                receiveGetPaymentTemplate(dispatch, result.data);
                reviseTemplateTabNum(dispatch, {num: result.data.total, index: 3});
            }
        })
};