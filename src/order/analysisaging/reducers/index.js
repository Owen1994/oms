import { combineReducers } from 'redux';
import {
    RECEIVE_LIST,
    LOADING_LIST,
} from '../constants';

const listdata = (state = {data: [], total: 0}, action) => {
    switch (action.type) {
    case RECEIVE_LIST:
        return {...state, ...action.payload};
    default:
        return state;
    }
};


const loadingState = (state = false, action) => {
    switch (action.type) {
    case LOADING_LIST:
        return action.state;
    default:
        return state;
    }
};


const rootReducer = combineReducers({
    listdata,
    loadingState,
});

export default rootReducer;
