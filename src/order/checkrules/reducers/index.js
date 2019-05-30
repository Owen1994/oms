import { combineReducers } from 'redux'
import { 
    RECEIVE_CHECKRULES_LIST,
    LOADING_CHECKRULES_LIST
} from '../constants'

//订单审单规则列表reducer
export const checkrules = (state={data: [], total: 0}, action) => {
    switch(action.type){
        case RECEIVE_CHECKRULES_LIST:
            return action.data
        default:
            return state    
    }
}

//loading状态reducer
export const loadingCheckRulesState = (state=false, action) => {
    switch(action.type){
        case LOADING_CHECKRULES_LIST:
            return action.state
        default:
            return state    
    }
}

//过滤器组件reducer
import {
    filterTableactionInfo
} from '../actions'

function filtertable(state = {
                            data: [],
                            count: 1,
                            loading:true,
                        }
    , action) {
    switch (action.type) {
        case filterTableactionInfo:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}
const rootReducer = combineReducers({
    checkrules,
    loadingCheckRulesState,
    filtertable
})

export default rootReducer

