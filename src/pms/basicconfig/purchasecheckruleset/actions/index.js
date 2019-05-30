import { fetchPost } from '../../../../util/fetch';

import {
    PURCHASE_ORDER_RULES_LIST,
    RECEIVE_PURCHASE_ORDER_RULES_LIST,
    LOADING_RECORD_LIST,
} from '../constants';

const receivePurchaseOrderRulesList = (dispatch, data) => {
    dispatch({
        type: RECEIVE_PURCHASE_ORDER_RULES_LIST,
        data,
    });
};

const getPurchaseOrderRulesList = params => (dispatch) => {
    dispatch({
        type: LOADING_RECORD_LIST,
        state: true,
    });
    fetchPost(PURCHASE_ORDER_RULES_LIST, params)
        .then((result) => {
            dispatch({
                type: LOADING_RECORD_LIST,
                state: false,
            });
            if (result.state === '000001') {
                receivePurchaseOrderRulesList(dispatch, result.data);
            }
        });
};

export default getPurchaseOrderRulesList;
