import { 
    RECEIVE_PART_LIST,
    LOADING_PART_LIST,
} from '../constants'
import * as API from '../../../common/constants/Api'
import { fetchPost } from '../../../../util/fetch';

const receivePartList = (dispatch, data) => {
    dispatch({
        type: RECEIVE_PART_LIST,
        data
    })
}

export const queryPartList = (params) => dispatch => {
    dispatch({
        type: LOADING_PART_LIST,
        state: true
    })
    fetchPost(API.GET_PART_LIST, params)
        .then(result => {
            dispatch({
                type: LOADING_PART_LIST,
                state: false
            })
            if(result.state === '000001'){
                receivePartList(dispatch, result.data)
            }
        })
}