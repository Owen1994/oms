import { combineReducers } from 'redux';
import { list_main_data, list_loading_state } from '../constants';

const queryMainDataList = (state = { list: [], total: 0 }, action) => {
    switch (action.type) {
    case list_main_data:
        return action.data;
    default:
        return state;
    }
};

const queryListLoading = (state = false, action) => {
    switch (action.type) {
    case list_loading_state:
        return action.data;
    default:
        return state;
    }
};


const rootReducer = combineReducers({
    getMainDataList: queryMainDataList,
    isLoading: queryListLoading,
});

export default rootReducer;
