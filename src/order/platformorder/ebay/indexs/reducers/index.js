import { combineReducers } from 'redux'
import { 
    RECEIVE_EBAYORDER_LIST,
    LOADING_EBAYORDER_LIST,
    RECEIVE_EBAYORDER_TAB_STATE,
} from '../constants/index'

//ebay订单列表数据reducer
export const ebayOrders = (state={list: [], total: 0}, action) => {
    switch(action.type){
        case RECEIVE_EBAYORDER_LIST:
            return action.data
        default:
            return state    
    }
}

//loading状态reducer
export const loadingEbayOrderState = (state=false, action) => {
    switch(action.type){
        case LOADING_EBAYORDER_LIST:
            return action.state
        default:
            return state    
    }
}

//ebay订单页签数据reducer
export const ebayOrderTabState = (state={data: []}, action) => {
    switch(action.type){
        case RECEIVE_EBAYORDER_TAB_STATE:
            return action.data
        default:
            return state    
    }
}

const rootReducer = combineReducers({
    ebayOrders,
    loadingEbayOrderState,
    ebayOrderTabState,
})

export default rootReducer

