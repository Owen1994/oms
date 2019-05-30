import {fetchPost} from "../../../../util/fetch";
import {GET_PUBLISH_TEMPLLIST} from "../constants/PublishApi";
import {RECEIVE_PUBLISH_LIST,LOADING_TEMPLATE_LIST} from "../constants/index"
import {reviseTemplateTabNum} from "./index";



const receiveGetPaymentTemplate = (dispatch, data) => {
    dispatch({
        type: RECEIVE_PUBLISH_LIST,
        data
    })
}
/**
 * 刊登模板列表
 * @param {*} params
 */
export const getPublishTemplate = (params) => dispatch => {
    dispatch({
        type: LOADING_TEMPLATE_LIST,
        data: {state: true}
    })
    fetchPost(GET_PUBLISH_TEMPLLIST, params, )
        .then(result => {
            dispatch({
                type: LOADING_TEMPLATE_LIST,
                data: {state: false}
            })
            if(result.state === '000001'){
                if(result.data && !result.data.data){
                    result.data.data = []
                }
                receiveGetPaymentTemplate(dispatch, result.data)
                reviseTemplateTabNum(dispatch, {num: result.data.total, index: 4});
            }
        })
}