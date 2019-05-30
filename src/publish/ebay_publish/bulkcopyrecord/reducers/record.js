import { 
    RECEIVE_RECORD_LIST,
    LOADING_RECORD_LIST
} from '../constants'

export const records = (state={data: [], total: 0}, action) => {
    switch(action.type){
        case RECEIVE_RECORD_LIST:
            return action.data
        default:
            return state    
    }
}


export const loadingRecordState = (state=false, action) => {
    switch(action.type){
        case LOADING_RECORD_LIST:
            return action.state
        default:
            return state    
    }
}