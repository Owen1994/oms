import { 
    RECEIVE_RECORD_LIST,
    LOADING_RECORD_LIST,
} from '../constants'
import * as API from '../../../common/constants/Api';
import { fetchPost } from '../../../../util/fetch';

const receiveRecordList = (dispatch, data) => {
    dispatch({
        type: RECEIVE_RECORD_LIST,
        data
    })
}
export const queryRecordList = (params) => dispatch => {
    dispatch({
        type: LOADING_RECORD_LIST,
        state: true
    })
    fetchPost(API.GET_COPY_LIST, params)
        .then(result => {
            dispatch({
                type: LOADING_RECORD_LIST,
                state: false
            })
            if(result.state === '000001'){
                receiveRecordList(dispatch, result.data)
            }
        })
}

