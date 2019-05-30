import { combineReducers } from 'redux';
import { PAYPAL_LIST } from '../constants';
import { paginationReducer } from '../../../../common/pagination';

const paypalReducer = (state = {
    paypalList: [],
    loading: false
}, action) => {
    switch (action.type) {
        case PAYPAL_LIST:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
        }
}

export default combineReducers({
    paypalReducer,
    paginationReducer
})
