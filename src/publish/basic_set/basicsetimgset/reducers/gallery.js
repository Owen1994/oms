import { 
    RECEIVE_GALLERY_LIST,
    RECEIVE_IMG_TYPE_LIST,
    LOADING_GALLERY_LIST,
    RECEIVE_GALLERY_IMG_LIST,
    ADD_IMG_LIST,
    DELETE_IMG_LIST,
    RESET_IMG_LIST,
} from '../constants'

/**
 * 图库设置列表查询
 * @param {*} state 默认数据 
 * @param {*} action 
 */
export const gallery = (state={list: [], total: 0}, action) => {
    switch(action.type){
        case RECEIVE_GALLERY_LIST:
            return action.data
        default:
            return state    
    }
}

/**
 * 图片类型列表查询
 * @param {*} state 默认数据 
 * @param {*} action 
 */
export const imgTypes = (state={list: [], total: 0}, action) => {
    switch(action.type) {
        case RECEIVE_IMG_TYPE_LIST:
            return action.data
        default:
            return state    
    }
}

/**
 * 图库列表加载状态
 * @param {*} state 
 * @param {*} action 
 */
export const loadingGalleryState = (state=false, action) => {
    switch(action.type){
        case LOADING_GALLERY_LIST:
            return action.state
        default:
            return state    
    }
}

/**
 * 图库类型列表查询
 * @param {*} state 默认数据 
 * @param {*} action 
 */
export const galleryImgs = (state={list: [], total: 0}, action) => {
    switch(action.type){
        case RECEIVE_GALLERY_IMG_LIST:
            return action.data
        default:
            return state    
    }
}

/**
 * 图片类型集合
 * @param {*} state 默认数据 
 * @param {*} action 
 */
export const imgTypeList = (state=[{key: Date.now()}], action) => {
    switch(action.type){
        case ADD_IMG_LIST:
            state.push(action.data)
            return [...state]
        case DELETE_IMG_LIST:
            state.splice(action.data.index, 1)
            return [...state]
        case RESET_IMG_LIST:
            return action.data    
        default:
            return state
    }
}