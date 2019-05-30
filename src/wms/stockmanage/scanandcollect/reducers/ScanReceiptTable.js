import {
    SCAN_RECEIPT_PART_LIST,
    SCAN_RECEIPT_LOADING_PART_LIST,
} from '../constants';

/**
 * 扫描采购单
 * @param state
 * @param action
 * @returns {*}
 */
export const scanReceiptParts = (state = { list: [] }, action) => {
    switch (action.type) {
    case SCAN_RECEIPT_PART_LIST:
        return action.data;
    default:
        return state;
    }
};
/**
 * 扫描收货
 * @param state
 * @param action
 * @returns {*}
 */
export const scanReceiptLoadingState = (state = false, action) => {
    switch (action.type) {
    case SCAN_RECEIPT_LOADING_PART_LIST:
        return action.state;
    default:
        return state;
    }
};
