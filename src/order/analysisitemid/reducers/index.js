import { combineReducers } from 'redux';
import {
    RECEIVE_ITEMID_LIST,
    LOADING_ITEMID_LIST,
} from '../constants';

const itemIdlistdata = (state = [], action) => {
    switch (action.type) {
    case RECEIVE_ITEMID_LIST:
        return action.data;
    default:
        return state;
    }
};


const loadingItemIDState = (state = false, action) => {
    switch (action.type) {
    case LOADING_ITEMID_LIST:
        return action.state;
    default:
        return state;
    }
};


const rootReducer = combineReducers({
    itemIdlistdata,
    loadingItemIDState,
});

export default rootReducer;
