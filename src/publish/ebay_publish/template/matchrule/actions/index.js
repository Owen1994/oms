import {fetchPost} from "../../../../../util/fetch";
import {GET_TEMPL_MATCH_LIST} from "../constants/MatchList";
import {RECEIVE_MATCH_LIST,LOADING_TEMPLATE_LIST} from "../constants/index"



const receiveMatchList = (dispatch, data) => {
    dispatch({
        type: RECEIVE_MATCH_LIST,
        data
    })
}
/**
 * 运输模板列表
 * @param {*} params
 */
export const getMatchList = (params) => dispatch => {
    dispatch({
        type: LOADING_TEMPLATE_LIST,
        data: {state: true}
    })
    fetchPost(GET_TEMPL_MATCH_LIST, params, )
        .then(result => {
            dispatch({
                type: LOADING_TEMPLATE_LIST,
                data: {state: false}
            })
            if(result.state === '000001'){
                receiveMatchList(dispatch, result.data)
            }
        })
}