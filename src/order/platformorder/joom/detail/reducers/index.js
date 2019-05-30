import {combineReducers} from 'redux'
import {
    joomDetialInfo,
} from '../actions'

function Infos(state = {}, action) {
    switch (action.type) {
        case joomDetialInfo:
            return action.payload
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    Infos
})

export default rootReducer
