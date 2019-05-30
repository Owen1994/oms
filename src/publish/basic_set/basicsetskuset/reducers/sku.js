import { 
    RECEIVE_SKU_LIST,
    LOADING_SKU_LIST
} from '../constants'

export const skus = (state={list: [], total: 0}, action) => {
    switch(action.type){
        case RECEIVE_SKU_LIST:
            return action.data
        default:
            return state    
    }
}


export const loadingSkuState = (state=false, action) => {
    switch(action.type){
        case LOADING_SKU_LIST:
            return action.state
        default:
            return state    
    }
}