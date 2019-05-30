import { fetchPost } from '../../../../util/fetch';
import { PRINT_RE_BOX_LABEL, PRINT_SKU_LABEL, REPRINT_DEFECTSKU_LABEL } from '../../../common/constants/Api';
import {
    LOAD_BOX_INFO, LOAD_SKU_INFO, LOAD_ERROR_INFO, SKU_LOADING, ERROR_LOADING, BOX_LOADING,
} from '../constants';

export const loadSkuInfo = params => (dispatch) => {
    dispatch({
        type: SKU_LOADING,
        data: true,
    });
    fetchPost(PRINT_SKU_LABEL, params, 1)
        .then((result) => {
            dispatch({
                type: SKU_LOADING,
                data: false,
            });
            if (result.state === '000001') {
                dispatch({
                    type: LOAD_SKU_INFO,
                    data: result.data,
                });
            }
        });
};
export const loadBoxInfo = params => (dispatch) => {
    dispatch({
        type: BOX_LOADING,
        data: true,
    });
    fetchPost(PRINT_RE_BOX_LABEL, params, 1)
        .then((result) => {
            dispatch({
                type: BOX_LOADING,
                data: false,
            });
            if (result.state === '000001') {
                dispatch({
                    type: LOAD_BOX_INFO,
                    data: result.data,
                });
            }
        });
};
export const loadErrorInfo = params => (dispatch) => {
    dispatch({
        type: ERROR_LOADING,
        data: true,
    });
    fetchPost(REPRINT_DEFECTSKU_LABEL, params, 1)
        .then((result) => {
            dispatch({
                type: ERROR_LOADING,
                data: false,
            });
            if (result.state === '000001') {
                dispatch({
                    type: LOAD_ERROR_INFO,
                    data: result.data,
                });
            }
        });
};
