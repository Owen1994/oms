import { combineReducers } from 'redux'
import {
    loadingAction,
    getDetialAction
} from '../actions'

const loading = (state = false, action) => {
    switch (action.type) {
        case loadingAction:
            return action.payload;
        default:
            return state
    }
}

const detial = (state = {}, action) => {
    switch (action.type) {
        case getDetialAction:
            return action.payload;
        default:
            return state
    }
}


const rootReducer = combineReducers({
    detial,
    loading,
});

export default rootReducer