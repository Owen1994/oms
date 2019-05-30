import { 
    RECEIVE_UPDATE_LIST,
    LOADING_UPDATE_LIST,
} from '../constants'
import * as API from '../../../common/constants/Api'
import { fetchPost } from '../../../../util/fetch';

const receiveUpdateList = (dispatch, data) => {
    dispatch({
        type: RECEIVE_UPDATE_LIST,
        data
    })
}

export const queryUpdateList = (params) => dispatch => {
    dispatch({
        type: LOADING_UPDATE_LIST,
        state: true
    })
    fetchPost(API.GET_UPDATE_LIST, params)
        .then(result => {
            dispatch({
                type: LOADING_UPDATE_LIST,
                state: false
            })
            if(result.state === '000001'){
                receiveUpdateList(dispatch, result.data)
            }
        })
}


