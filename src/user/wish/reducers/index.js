import { combineReducers } from 'redux'
import { 
    RECEIVE_AUTHORIZATION_LIST,
    LOADING_AUTHORIZATION_LIST
} from '../constants'

//授权列表reducer
export const authorizations = (state={data: [], total: 0}, action) => {
    switch(action.type){
        case RECEIVE_AUTHORIZATION_LIST:
            return action.data
        default:
            return state    
    }
}

//loading状态reducer
export const loadingAuthorizationState = (state=false, action) => {
    switch(action.type){
        case LOADING_AUTHORIZATION_LIST:
            return action.state
        default:
            return state    
    }
}

const rootReducer = combineReducers({
    authorizations,
    loadingAuthorizationState,
})

export default rootReducer

