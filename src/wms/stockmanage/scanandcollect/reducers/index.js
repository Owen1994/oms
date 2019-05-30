import { combineReducers } from 'redux';
import {
    scanReceiptParts,
    scanReceiptLoadingState,
} from './ScanReceiptTable';
import {
    receivedParts,
    receivedLoadingState,
} from './ReceivedTable';
import { SELECT_RECEIVING_TYPE, TYPE_1_PURCHASE_GOODS } from '../constants';

/**
 * 选择发货类型
 * @param state
 * @param action
 * @returns {*}
 */
export const receivingType = (state = TYPE_1_PURCHASE_GOODS, action) => {
    switch (action.type) {
    case SELECT_RECEIVING_TYPE:
        return action.data;
    default:
        return state;
    }
};

const rootReducer = combineReducers({
    scanReceiptParts,
    scanReceiptLoadingState,
    receivedParts,
    receivedLoadingState,
    receivingType,
});


export default rootReducer;
