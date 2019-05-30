import { 
    RECEIVE_TITLE_LIST,
    LOADING_TITLE_LIST,
} from '../constants'
import { QUERY } from '../../../common/constants/Api'
import { fetchPost } from '../../../../util/fetch'

const receiveTitleList = (dispatch, data) => {
    dispatch({
        type: RECEIVE_TITLE_LIST,
        data
    })
}
export const queryTitleList = (params) => dispatch => {
    dispatch({
        type: LOADING_TITLE_LIST,
        state: true
    })
    fetchPost(QUERY, params)
        .then(result => {
            dispatch({
                type: LOADING_TITLE_LIST,
                state: false
            })
            if(result.state === '000001'){
                receiveTitleList(dispatch, result.data)
            }
        })
}

