/**
 * 获取订单详情
 * @param params
 * @returns {Function}
 */
import { fetchPost } from '../../../../util/fetch';
import {
    ORDER_PRINT_DETAILS,
} from '../constants/Api';

import {
    GET_ORDER_PRINT_DETAILS_ACCESS,
    PRINT_ACCESS_LOADING,
} from '../constants';

/**
 * 获取采购单详情基础信息数据
 * @param params
 * @returns {Function}
 */
export const getOrderPrintAccess = params => (dispatch) => {
    dispatch({
        type: PRINT_ACCESS_LOADING,
        data: true,
    });
    fetchPost(ORDER_PRINT_DETAILS, params)
        .then((result) => {
            dispatch({
                type: PRINT_ACCESS_LOADING,
                data: false,
            });
            if (result.state === '000001') {
                dispatch({
                    type: GET_ORDER_PRINT_DETAILS_ACCESS,
                    data: result.data,
                });
            }
        });
};
