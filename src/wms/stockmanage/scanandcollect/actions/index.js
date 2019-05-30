import {
    RECEIVE_PART_LIST,
    RECEIVE_LOADING_PART_LIST,
    SCAN_RECEIPT_PART_LIST,
    SCAN_RECEIPT_LOADING_PART_LIST, SELECT_RECEIVING_TYPE,
} from '../constants';
import { SCAN_CARD_NUMBER, SCAN_PURCHASE_NUMBER } from '../constants/Api';
import { fetchPost } from '../../../../util/fetch';

/**
 * 已收货
 * @param dispatch
 * @param data
 */
export const notifyReceivePartList = data => (dispatch) => {
    dispatch({
        type: RECEIVE_PART_LIST,
        data,
    });
};
/**
 * 已收货
 * @param params
 * @param callback
 * @returns {Function}
 */
export const queryPartList = (params, callback) => (dispatch) => {
    dispatch({
        type: RECEIVE_LOADING_PART_LIST,
        state: true,
    });
    fetchPost(SCAN_CARD_NUMBER, params, 2)
        .then((result) => {
            dispatch({
                type: RECEIVE_LOADING_PART_LIST,
                state: false,
            });
            if (result.state === '000001') {
                dispatch({
                    type: RECEIVE_PART_LIST,
                    data: result.data,
                });
            }
            callback(result);
        });
};
/**
 * 更新扫描收货列表
 * @param dispatch
 * @param data
 */
export const scanReceiptPartList = data => (dispatch) => {
    dispatch({
        type: SCAN_RECEIPT_PART_LIST,
        data,
    });
};
/**
 * 查询扫描采购单
 * @param params
 * @param callback
 * @returns {Function}
 */
export const queryScanReceiptList = (params, callback) => (dispatch) => {
    dispatch({
        type: SCAN_RECEIPT_LOADING_PART_LIST,
        state: true,
    });
    fetchPost(SCAN_PURCHASE_NUMBER, params, 2)
        .then((result) => {
            dispatch({
                type: SCAN_RECEIPT_LOADING_PART_LIST,
                state: false,
            });
            if (callback(result)) {
                dispatch({
                    type: SCAN_RECEIPT_PART_LIST,
                    data: result.data,
                });
            }
        });
};

export const selectReceivingType = receivingType => (dispatch) => {
    dispatch({
        type: SELECT_RECEIVING_TYPE,
        data: receivingType,
    });
};
