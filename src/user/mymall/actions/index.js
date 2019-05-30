import { 
    RECEIVE_AUTHORIZATION_LIST,
    LOADING_AUTHORIZATION_LIST,
} from '../constants/index'
import { GET_MYMALL_AUTH_LIST } from '../constants/Api'
import { fetchPost } from '@/util/fetch';

//请求mymall授权列表action
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
    fetchPost(GET_MYMALL_AUTH_LIST, params, 2)
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

export const changeLoadingState = (loadingState) => dispatch => {
    dispatch({
        type: LOADING_AUTHORIZATION_LIST,
        state: loadingState
    })
}