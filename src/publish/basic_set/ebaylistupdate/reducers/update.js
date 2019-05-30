import { 
    RECEIVE_UPDATE_LIST,
    LOADING_UPDATE_LIST,
} from '../constants'

export const updates = (state={list: [], total: 0}, action) => {
    switch(action.type){
        case RECEIVE_UPDATE_LIST:
            return action.data
        default:
            return state    
    }
}


export const loadingUpdateState = (state=false, action) => {
    switch(action.type){
        case LOADING_UPDATE_LIST:
            return action.state
        default:
            return state    
    }
}
