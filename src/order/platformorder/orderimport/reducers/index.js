import {combineReducers} from 'redux';
import {
    ADD_TABLE_ITEM,
    MODIFY_TABLE_ITEM,
    DELETE_TABLE_ITEM,
    CLEAR_TABLE_ITEM,
    CHANGE_CURRENCY,
} from '../actions'

function tabledata(state=[], action) {
    switch (action.type) {
        case ADD_TABLE_ITEM:
            state.push(action.payload);
            return [...state];
        case MODIFY_TABLE_ITEM:
            state.splice(action.payload.index, 1, action.payload.newItem);
            return [...state];
        case DELETE_TABLE_ITEM:
            state.splice(action.index, 1);
            return [...state];
        case CLEAR_TABLE_ITEM:
            return [];
        case CHANGE_CURRENCY:
            state.map(v => {
                v.productFreightCurrency = action.payload.productFreightCurrency;
            });
            return [...state];
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    tabledata
});

export default rootReducer;
