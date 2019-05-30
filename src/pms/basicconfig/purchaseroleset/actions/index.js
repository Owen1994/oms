import { fetchPost } from '../../../../util/fetch';

import {
    PROCUREMENT_ROLE_CONFIGUR_ATION_LIST,
    PROCUREMENT_ROLE_SUPPLIER_LIST,
    RECEIVE_PROCUREMENT_LIST,
    RECEIVE_SUPPLIER_LIST,
    LOADING_RECORD_LIST,
} from '../constants';

// 采购角色配置
const receiveProcurementList = (dispatch, data) => {
    dispatch({
        type: RECEIVE_PROCUREMENT_LIST,
        data,
    });
};

const getProcurementList = params => (dispatch) => {
    dispatch({
        type: LOADING_RECORD_LIST,
        state: true,
    });
    fetchPost(PROCUREMENT_ROLE_CONFIGUR_ATION_LIST, params)
        .then((result) => {
            dispatch({
                type: LOADING_RECORD_LIST,
                state: false,
            });
            if (result.state === '000001') {
                receiveProcurementList(dispatch, result.data);
            }
        });
};

// 供应商跟单员配置
const receiveSupplierList = (dispatch, data) => {
    dispatch({
        type: RECEIVE_SUPPLIER_LIST,
        data,
    });
};

const getSupplierList = params => (dispatch) => {
    dispatch({
        type: LOADING_RECORD_LIST,
        state: true,
    });
    fetchPost(PROCUREMENT_ROLE_SUPPLIER_LIST, params)
        .then((result) => {
            dispatch({
                type: LOADING_RECORD_LIST,
                state: false,
            });
            if (result.state === '000001') {
                receiveSupplierList(dispatch, result.data);
            }
        });
};


export { getProcurementList, getSupplierList };
