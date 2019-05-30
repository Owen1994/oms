import { combineReducers } from 'redux';
import {
    RECEIVE_PRSEARCH_LIST,
    LOADING_RECORD_LIST,
    SORT_FIELDS_LIST,
} from '../constants';

const dataList = (state = { list: [], total: 0, }, action) => {
    switch (action.type) {
    case RECEIVE_PRSEARCH_LIST:
        return action.data;
    case SORT_FIELDS_LIST: {
        const {
            field,
            order,
        } = action.data;
        if (order === 'ascend') {
            state.list.sort((item1, item2) => (item1[field] - item2[field]));
        } else {
            state.list.sort((item1, item2) => (item2[field] - item1[field]));
        }
        // state.data = [...state.data];
        return { ...state };
    }
    default:
        return state;
    }
};


const loadingRecordState = (state = false, action) => {
    switch (action.type) {
    case LOADING_RECORD_LIST:
        return action.state;
    default:
        return state;
    }
};


const rootReducer = combineReducers({
    dataList,
    loadingRecordState,
});

export default rootReducer;
