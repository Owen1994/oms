import { 
    RECEIVE_SKU_LIST,
    LOADING_SKU_LIST,
} from '../constants'
import { QUERY } from '../../../common/constants/Api'
import { fetchPost } from '../../../../util/fetch'

const receiveSkuList = (dispatch, data) => {
    dispatch({
        type: RECEIVE_SKU_LIST,
        data
    })
}

/**
 * 查询sku列表
 * @param {*} params 
 */
export const querySkuList = (params) => dispatch => {
    dispatch({
        type: LOADING_SKU_LIST,
        state: true
    })
    fetchPost(QUERY, params)
        .then(result => {
            dispatch({
                type: LOADING_SKU_LIST,
                state: false
            })
            if(result.state === '000001'){
                receiveSkuList(dispatch, result.data)
            }
        })
}

