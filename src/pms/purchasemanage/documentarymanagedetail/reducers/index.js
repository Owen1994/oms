import { combineReducers } from 'redux';
import RECEIVE_DOCUMENTAR_DETAIL_LIST from '../constants/index';

export const documentaryDetailListObj = (state = { list: [], supplierInfo: {} }, action) => {
    switch (action.type) {
    case RECEIVE_DOCUMENTAR_DETAIL_LIST:
        return action.data;
    default:
        return state;
    }
};

const rootReducer = combineReducers({
    documentaryDetailListObj,
});

export default rootReducer;
