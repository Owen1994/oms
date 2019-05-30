import { 
    RECEIVE_CHECKRULES_LIST,
    LOADING_CHECKRULES_LIST,
} from '../constants/index'
import * as API from '../constants/api'
import { fetchPost } from '../../../util/fetch';

export const filterTableactionInfo = 'filterTableactionInfo'
//请求订单审核规则列表action
const receiveCheckRulesList = (dispatch, data) => {
    dispatch({
        type: RECEIVE_CHECKRULES_LIST,
        data
    })
}
//过滤器组件action
export const filterTableaction = value => ({
    type: filterTableactionInfo,
    payload: value
})

export const queryCheckRulesList = (params) => dispatch => {
    dispatch({
        type: LOADING_CHECKRULES_LIST,
        state: true
    })
    fetchPost(API.GET_ORDER_AUDIT_RULE_LIST, params, 2)
        .then(result => {
            dispatch({
                type: LOADING_CHECKRULES_LIST,
                state: false
            })
            if(result.state === '000001'){
                receiveCheckRulesList(dispatch, result.data)
            }
        })
}