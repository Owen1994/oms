import { combineReducers } from 'redux'
import { 
    RECEIVE_WISHORDER_LIST,
    LOADING_WISHORDER_LIST,
    RECEIVE_WISHORDER_DETAIL,
    RECEIVE_WISHORDER_TAB_STATE,
    RECEIVE_WISHORDER_TAG_STATE,
} from '../constants/index'

//wish订单列表数据reducer
export const wishOrders = (state={data: [], total: 0}, action) => {
    switch(action.type){
        case RECEIVE_WISHORDER_LIST:
            return action.data
        default:
            return state    
    }
}

//loading状态reducer
export const loadingWishOrderState = (state=false, action) => {
    switch(action.type){
        case LOADING_WISHORDER_LIST:
            return action.state
        default:
            return state    
    }
}

//wish订单弹窗详情reducer
export const wishOrderDetail = (state={data: []}, action) => {
    switch(action.type){
        case RECEIVE_WISHORDER_DETAIL:
            return action.data
        default:
            return state    
    }
}

//wish订单页签数据reducer
export const wishOrderTabState = (state={data: []}, action) => {
    switch(action.type){
        case RECEIVE_WISHORDER_TAB_STATE:
            return action.data
        default:
            return state    
    }
}

//wish订单标记状态数据reducer
export const wishOrderTagState = (state={data: []}, action) => {
    switch(action.type){
        case RECEIVE_WISHORDER_TAG_STATE:
            return action.data
        default:
            return state    
    }
}

const rootReducer = combineReducers({
    wishOrders,
    loadingWishOrderState,
    wishOrderDetail,
    wishOrderTabState,
    wishOrderTagState
})

export default rootReducer

