import { combineReducers } from 'redux';
import { Receive_Amazon_Detail, Receive_Amazon_Detail_Log } from '../constants/index';

const amazonDetailObj = (state = {}, action) => {
    switch (action.type) {
        case Receive_Amazon_Detail:
            return action.data;
        default:
            return state;
    }
};

const amazonDetailLogObj = (state = {}, action) => {
    switch (action.type) {
        case Receive_Amazon_Detail_Log:
            return action.data;
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    amazonDetailObj,
    amazonDetailLogObj,
});

export default rootReducer;
