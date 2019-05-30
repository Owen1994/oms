import {combineReducers} from 'redux';
import {
    RECEIVE_LIST,
    LOADING_LIST,
} from "../actions";

const deliveryPriorityListData = (state = {data: []}, action) => {
    switch (action.type){
        case RECEIVE_LIST:
            return action.data;
        default:
            return state;
    }
}

const loadingState = (state = false, action) => {
    switch (action.type) {
    case LOADING_LIST:
        return action.state;
    default:
        return state;
    }
};

const RooterReducer = combineReducers({
    deliveryPriorityListData,
    loadingState,
});

export default RooterReducer;