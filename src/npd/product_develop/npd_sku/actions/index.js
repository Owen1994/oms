import {
    GET_SKU_LIST,
    RECEIVE_SKU_LIST
} from '../constants'
import {post} from '../../../../util/axios'
import { parseNetErrorToMsg } from '../../../../util/baseTool'
import {
    LIST_APL
} from '../constants/Api';

const receiveSkuList = data => ({
    type: RECEIVE_SKU_LIST,
    data
})

export const getSkuList= params => (dispatch)=>{
    dispatch(({loading: true, type: GET_SKU_LIST}))
    post(LIST_APL, params).then(data=>{
        if(data && data.state === "000001"){
            return dispatch(receiveSkuList(data.data));
        }
        return dispatch({loading: false, type: GET_SKU_LIST, msg: parseNetErrorToMsg(data)})
    })
}

