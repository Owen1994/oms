import { 
    RECEIVE_RULE_LIST,
    LOADING_RULE_LIST,
} from '../constants'

export const rules = (state={list: [], total: 0}, action) => {
    switch(action.type){
        case RECEIVE_RULE_LIST:
            return action.data
        default:
            return state    
    }
}


export const loadingRuleState = (state=false, action) => {
    switch(action.type){
        case LOADING_RULE_LIST:
            return action.state
        default:
            return state    
    }
}