import  Api from '../constants/Api'
import  ActionType from '../constants'
import {fetchPost} from '../../../../util/fetch'

const receivePublishfailList = (dispatch, data) => {
    dispatch({
        type: ActionType.tablemodelInfo,
        data
    })
}
/**
 * 加载已下架列表数据
 * @param {*} params 
 */
export const queryPublishfailList = (params,key) => dispatch => {
    dispatch({
        type: ActionType.tablemodelInfo,
        data: {loading: true}
    })
    receivePublishfailList(dispatch, { lst: [], total: 0 })
    fetchPost(Api.GET_LISTING_LIST, params, 2)
        .then(result => {
            dispatch({
                type: ActionType.tablemodelInfo,
                data:{loading: false}
            })
            if(result.state === '000001'){
                receivePublishfailList(dispatch, {
                    total:result.data.total,
                    lst:result.data.lst,
                    params,key
                })
            }
        })
}
