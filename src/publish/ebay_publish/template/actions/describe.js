import {fetchPost} from "../../../../util/fetch";
import {GET_DESCRIPTION_TEMPLATE} from "../constants/DescribeApi";
import {LOADING_TEMPLATE_LIST,RECEIVE_DESCRIBE_LIST} from "../constants"
import { reviseTemplateTabNum } from './index';

const receiveGetDescriptionTemplate = (dispatch, data) => {
    dispatch({
        type: RECEIVE_DESCRIBE_LIST,
        data
    })
}
/**
 * 描述模板列表
 * @param {*} params
 */
export const getDescriptionTemplate = (params) => dispatch => {
    dispatch({
        type: LOADING_TEMPLATE_LIST,
        data: {state: true}
    })
    fetchPost(GET_DESCRIPTION_TEMPLATE, params, )
        .then(result => {
            dispatch({
                type: LOADING_TEMPLATE_LIST,
                data: {state: false}
            })
            if(result.state === '000001'){
                receiveGetDescriptionTemplate(dispatch, result.data);
                reviseTemplateTabNum(dispatch, {num: result.data.total, index: 0});
            }
        })
}