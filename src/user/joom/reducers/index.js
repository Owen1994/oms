import { combineReducers } from 'redux'
import {
    joomAuthList
} from '../actions/index'

//授权列表reducer
export const authorizations = (state = {
    list: [],
    total: 0,
    params: {
        pageData: 20,
        pageNumber: 1
    },
    loading: false
}, action) => {
    switch (action.type) {
        case joomAuthList:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    authorizations,
})

export default rootReducer