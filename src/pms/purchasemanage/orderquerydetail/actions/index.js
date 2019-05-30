/**
 * 获取订单详情
 * @param params
 * @returns {Function}
 */
import { fetchPost } from '../../../../util/fetch';
import { ORDER_DETAILS_ACCESS, ORDER_DETAILS_LOG } from '../constants/Api';
import {
    ACCESS_LOADING, GET_ORDER_DETAILS_ACCESS, GET_ORDER_DETAILS_LOG, IS_CAN_EDIT, Product_Select,
} from '../constants';

/**
 * 获取采购单详情基础信息数据
 * @param params
 * @returns {Function}
 */
export const getOrderDetailAccess = params => (dispatch) => {
    dispatch({
        type: ACCESS_LOADING,
        data: true,
    });
    fetchPost(ORDER_DETAILS_ACCESS, params)
        .then((result) => {
            dispatch({
                type: ACCESS_LOADING,
                data: false,
            });
            if (result.state === '000001') {
                // 判断是否可编辑,只有待采购才能编辑
                const isCanEdit = result.data.basicInfo.purchaseState.code === 2;
                dispatch({
                    type: IS_CAN_EDIT,
                    data: isCanEdit,
                });
                dispatch({
                    type: GET_ORDER_DETAILS_ACCESS,
                    data: result.data,
                });
            }
        });
};

/**
 * 获取采购单详情日志数据
 * @param params
 * @returns {Function}
 */
export const getOrderDetailLog = params => (dispatch) => {
    fetchPost(ORDER_DETAILS_LOG, params)
        .then((result) => {
            if (result.state === '000001') {
                dispatch({
                    type: GET_ORDER_DETAILS_LOG,
                    data: result.data,
                });
            }
        });
};


/**
 * 商品选择数据
 * @param params
 * @returns {Function}
 */
export const getProductSelect = params => (dispatch) => {
    dispatch({
        type: Product_Select,
        data: params,
    });
};
