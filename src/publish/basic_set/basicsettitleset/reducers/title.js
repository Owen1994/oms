import { 
    RECEIVE_TITLE_LIST,
    LOADING_TITLE_LIST
} from '../constants'

export const titles = (state={list: [], total: 0}, action) => {
    switch(action.type){
        case RECEIVE_TITLE_LIST:
            return action.data
        default:
            return state    
    }
}


export const loadingTitleState = (state=false, action) => {
    switch(action.type){
        case LOADING_TITLE_LIST:
            return action.state
        default:
            return state    
    }
}