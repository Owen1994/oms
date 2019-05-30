import { 
    RECEIVE_PART_LIST,
    LOADING_PART_LIST,
} from '../constants'

export const parts = (state={data: [], total: 0}, action) => {
    switch(action.type){
        case RECEIVE_PART_LIST:
            return action.data
        default:
            return state    
    }
}


export const loadingPartState = (state=false, action) => {
    switch(action.type){
        case LOADING_PART_LIST:
            return action.state
        default:
            return state    
    }
}