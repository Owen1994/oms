import { 
    RECEIVE_AUTHORIZATION_LIST,
    LOADING_AUTHORIZATION_LIST,
} from '../constants/index'
import * as API from '../constants/api'
import { fetchPost } from '@/util/fetch';

//请求wish授权列表action
const receiveAuthorizationList = (dispatch, data) => {
    dispatch({
        type: RECEIVE_AUTHORIZATION_LIST,
        data
    })
}

export const queryAuthorizationList = (params) => dispatch => {
    dispatch({
        type: LOADING_AUTHORIZATION_LIST,
        state: true
    })
    fetchPost(API.GET_WISH_ACCOUNT_LIST, params, 2)
        .then(result => {
            dispatch({
                type: LOADING_AUTHORIZATION_LIST,
                state: false
            })
            if(result.state === '000001'){
                receiveAuthorizationList(dispatch, result.data)
            }
        })
}