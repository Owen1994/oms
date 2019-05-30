import { combineReducers } from 'redux';
import {
    has_list_main_data,
    has_list_loading_state,
    not_list_main_data,
    not_list_loading_state,
} from '../constants';

const queryHasCoverMainDataList = (state = { list: [], total: 0 }, action) => {
    switch (action.type) {
    case has_list_main_data:
        return action.data;
    default:
        return state;
    }
};

const queryNotCoverMainDataList = (state = { list: [], total: 0 }, action) => {
    switch (action.type) {
        case not_list_main_data:
            return action.data;
        default:
            return state;
    }
};


const queryHasCoverListLoading = (state = false, action) => {
    switch (action.type) {
    case has_list_loading_state:
        return action.data;
    default:
        return state;
    }
};

const queryNotCoverListLoading = (state = false, action) => {
    switch (action.type) {
        case not_list_loading_state:
            return action.data;
        default:
            return state;
    }
};


const rootReducer = combineReducers({
    HasCoverListData: queryHasCoverMainDataList,
    HasCoverLoading: queryHasCoverListLoading,
    NotCoverListData: queryNotCoverMainDataList,
    NotCoverLoading: queryNotCoverListLoading,
});

export default rootReducer;
