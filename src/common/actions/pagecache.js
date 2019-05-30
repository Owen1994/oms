import { 
    SET_PAGE_CACHE,
    CLEAR_PAGE_CACHE,
    CLEAR_ALL_PAGE_CACHE,
} from '../constants'

/**
 * 设置页面缓存
 * @param {path: path, data: data} data 
 */
export const setPageCacheAction = (data) => (dispatch) => {
    dispatch({
        type: SET_PAGE_CACHE,
        data
    })
}

/**
 * 清除页面缓存
 * @param {path: path } data 
 */
export const clearPageCacheAction = (data) => (dispatch) => {
    dispatch({
        type: CLEAR_PAGE_CACHE,
        data
    })
}

/**
 * 清除页面缓存
 * @param { }  
 */
export const clearAllPageCacheAction = () => (dispatch) => {
    dispatch({
        type: CLEAR_ALL_PAGE_CACHE,
    })
}
