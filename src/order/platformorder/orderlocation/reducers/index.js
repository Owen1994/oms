import {combineReducers} from 'redux';
import {
    RECEIVE_DATA,
    RECEIVE_LOADING_STATE,
} from '../actions'

export const datas = (state=[], action) => {
    switch(action.type) {
        case RECEIVE_DATA:
            return action.data;
        default:
            return state;
    }
}

export const loadingState = (state=false, action) => {
    switch(action.type) {
        case RECEIVE_LOADING_STATE:
            return action.state;
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    datas,
    loadingState,
});

export default rootReducer;
