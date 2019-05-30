import { combineReducers } from 'redux';
import { Receive_Amazon_Authorization_List, Receive_Amazon_Authorization_List_State } from '../constants/index';

export const amazonAuthorizationListObj = (state = { list: [], total: 0 }, action) => {
    switch (action.type) {
        case Receive_Amazon_Authorization_List:
            return action.data;
        default:
            return state;
    }
};

export const amazonAuthorizationListloadingObj = (state = { loadingState: false }, action) => {
    switch (action.type) {
        case Receive_Amazon_Authorization_List_State:
            return action.loadingObj;
        default:
            return state;
    }
};


const rootReducer = combineReducers({
    amazonAuthorizationListObj,
    amazonAuthorizationListloadingObj,
});

export default rootReducer;
