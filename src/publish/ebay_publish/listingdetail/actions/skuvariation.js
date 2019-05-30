/**
 * 作者: pzt
 * 描述: listing 多属性页面相关action
 * 时间: 2018/7/28 15:39
 **/
import { fetchPost } from '../../../../util/fetch'
import * as types from '../constants/reducerTypes'
import { GET_GALLERYLIST } from '../constants/api'

export const addVpropsName = params =>(dispatch)=>{
    return dispatch({type: types.ADD_VPROPSNAME,...params});
}
export const delVpropsName = params =>(dispatch)=>{
    return dispatch({type: types.DEL_VPROPSNAME,...params});
}
export const editVpropsName = params =>(dispatch)=>{
    return dispatch({type: types.EDIT_VPROPSNAME,...params});
}
export const addVlistItem = params =>(dispatch)=>{
    return dispatch({type: types.ADD_VLISTITEM,...params});
}
export const delVlistItem = params =>(dispatch)=>{
    return dispatch({type: types.DEL_VLISTITEM,...params});
}
export const saveDelVlistItem = params =>(dispatch)=>{
    return dispatch({type: types.SAVE_DEL_VLISTITEM,...params});
}
export const editVlistItem = params =>(dispatch, getState)=>{
    const specificName = getState().vrelationship.specificName;
    return dispatch({type: types.EDIT_VLISTITEM,...params, specificName});
}
export const editVlistAll = params =>(dispatch)=>{
    return dispatch({type: types.EDIT_VLISTALL,...params});
}
export const editVarListing = params =>(dispatch)=>{
    return dispatch({type: types.EDIT_VAR_LISTING,...params});
}
export const uploadVimg = params =>(dispatch)=>{
    return dispatch({type: types.UPLOAD_VIMG,...params});
}
export const getGalleryListAction = params => (dispatch) => {
    // debugger
    return fetchPost(GET_GALLERYLIST, params,2).then(res => {
        if (res && res.state === "000001") {
            return res.data || []
        }
    })
}
