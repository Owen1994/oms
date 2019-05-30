import { 
    RECEIVE_RULE_LIST,
    LOADING_RULE_LIST,
} from '../constants'
import * as API from '../../../common/constants/Api'
import { fetchPost } from '../../../../util/fetch';

const receiveRuleList = (dispatch, data) => {
    dispatch({
        type: RECEIVE_RULE_LIST,
        data
    })
}

export const queryRuleList = (params) => dispatch => {
    dispatch({
        type: LOADING_RULE_LIST,
        state: true
    })
    fetchPost(API.GET_AUTO_FIX_LIST, params)
        .then(result => {
            dispatch({
                type: LOADING_RULE_LIST,
                state: false
            })
            if(result.state === '000001'){
                receiveRuleList(dispatch, result.data)
            }
        })
}