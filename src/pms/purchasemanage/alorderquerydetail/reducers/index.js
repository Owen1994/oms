import { combineReducers } from 'redux';
import { list_main_data } from '../constants';

export const queryMainDataList = (state = { productInfo: [], orderInfo: {} }, action) => {
    switch (action.type) {
        case list_main_data:
            return action.data;
        default:
            return state;
    }
};


const rootReducer = combineReducers({
    getMainDataList: queryMainDataList,
});

export default rootReducer;
