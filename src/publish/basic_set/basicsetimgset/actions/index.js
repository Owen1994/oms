import { 
    RECEIVE_GALLERY_LIST,
    RECEIVE_IMG_TYPE_LIST,
    LOADING_GALLERY_LIST,
    RECEIVE_GALLERY_IMG_LIST
} from '../constants'
import { QUERY } from '../../../common/constants/Api'
import { fetchPost } from '../../../../util/fetch'

const receiveGalleryList = (dispatch, data) => {
    dispatch({
        type: RECEIVE_GALLERY_LIST,
        data
    })
}
/**
 * 加载图库列表
 * @param {*} params 
 */
export const queryGalleryList = (params) => dispatch => {
    dispatch({
        type: LOADING_GALLERY_LIST,
        state: true
    })
    fetchPost(QUERY, params)
        .then(result => {
            dispatch({
                type: LOADING_GALLERY_LIST,
                state: false
            })
            if(result.state === '000001'){
                receiveGalleryList(dispatch, result.data)
            }
        })
}

const receiveImgTypeList = (dispatch, data) => {
    dispatch({
        type: RECEIVE_IMG_TYPE_LIST,
        data
    })
}

/**
 * 加载图片类型列表
 * @param {*} params 
 */
export const loadImgTypeList = (params) => dispatch => {
    fetchPost(QUERY, params)
        .then(result => {
            if(result.state === '000001'){
                receiveImgTypeList(dispatch, result.data)
            }
        })
}

const receiveGalleryImgList = (dispatch, data) => {
    dispatch({
        type: RECEIVE_GALLERY_IMG_LIST,
        data
    })
}

/**
 * 加载图库类型列表
 * @param {*} params 
 */
export const loadGalleryImgList = (params) => dispatch => {
    fetchPost(QUERY, params)
        .then(result => {
            if(result.state === '000001'){
                receiveGalleryImgList(dispatch, result.data)
            }
        })
}

/**
 * 修改图片类型集合
 * @param {*} type 
 * @param {*} params 
 */
export const updateImgTypeList = (type, params) => dispatch => {
    dispatch({
        type,
        data: params
    })
} 