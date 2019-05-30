import { combineReducers } from 'redux';
import { RECEIVE_DOCUMENTAR_LIST, RECEIVE_LOADING_DOCUMENTAR_STATE } from '../constants/index';

export const documentaryListObj = (state = { list: [], total: 0 }, action) => {
    switch (action.type) {
    case RECEIVE_DOCUMENTAR_LIST:
        return action.data;
    default:
        return state;
    }
};

export const loadingObj = (state = { loadingState: false }, action) => {
    switch (action.type) {
    case RECEIVE_LOADING_DOCUMENTAR_STATE:
        return action.loadingObj;
    default:
        return state;
    }
};


const rootReducer = combineReducers({
    loadingObj,
    documentaryListObj,
});

export default rootReducer;
