import { fetchPost } from '../../../../util/fetch';
import {
    orderManagement,
    orderManagementAbnormalOrderInfo,
    orderManagementList,
    orderManagementAbnormalOrder,
    orderManagementUpdateAbnormalUrl,
    getOrderException,
    GET_ERROR_ORDER_LIST,
    ORDER_DETAIL_SUPPLIER_LIST,
    EDIT_ERROR_ORDER
} from '../constants';

// export const orderManagement = 'getOrderManagementListSync';
// export const orderManagementAbnormalOrderInfo = 'orderManagementAbnormalOrderInfo';
// const url = '/mockjsdata/31';
// const url = '';
// export const userUrl = `${url}/pmsservice/api/StaffInquiry/staffInquiry`;
// export const inquireOPEmployeeUrl = `${url}/pmsservice/api/merchandiserManagement/InquireOPEmployee/inquireOPEmployee`;
// const orderManagementList = `${url}/pmsservice/api/OrderManagementList/orderManagementList`;
// const orderManagementAbnormalOrder = `${url}/pmsservice/api/OrderManagementAbnormalOrder/orderManagementAbnormalOrder`;
// const orderManagementUpdateAbnormalUrl = `${url}/pmsservice/api/OrderManagementUpdateAbnormal/orderManagementUpdateAbnormal`;

const orderManagementListAction = params => ({
    type: orderManagement,
    payload: params,
});

const getOrderManagementListAsync = params => (dispatch) => {
    const data = { data: params };
    fetchPost(orderManagementList, data)
        .then((result) => {
            if (result.state === '000001') {
                const actionPayload = {
                    list: (result.data && result.data.list) || [],
                    loading: false,
                    total: (result.data && result.data.total) || 0,
                };
                if (params && params.pageNumber) {
                    actionPayload.pageNumber = params.pageNumber;
                    actionPayload.pageData = params.pageData;
                    actionPayload.oeEmployee = params.oeEmployee;
                }
                dispatch(orderManagementListAction(actionPayload));
                return result.data.list;
            }
        });
};

const orderManagementAbnormalOrderAction = params => ({
    type: orderManagementAbnormalOrderInfo,
    payload: params,
});

const getorderManagementAbnormalOrderAsync = params => (dispatch) => {
    const data = { data: params };
    fetchPost(orderManagementAbnormalOrder, data)
        .then((result) => {
            if (result.state === '000001') {
                const actionPayload = {
                    list: (result.data && result.data.list) || [],
                    loading: false,
                    total: (result.data && result.data.total) || 0,
                };
                if (params && params.pageNumber) {
                    actionPayload.pageNumber = params.pageNumber;
                    actionPayload.pageData = params.pageData;
                }
                dispatch(orderManagementAbnormalOrderAction(actionPayload));
                return result.data.list;
            }
        });
};


// 下单异常
const getOrderExceptionAction = params => ({
    type: getOrderException,
    payload: params,
});

const getOrderExceptionListAsync = params => (dispatch) => {
    const data = { data: params };
    fetchPost(GET_ERROR_ORDER_LIST, data)
        .then((result) => {
            if (result.state === '000001') {
                const actionPayload = {
                    list: (result.data && result.data.list) || [],
                    loading: false,
                    total: (result.data && result.data.total) || 0,
                };
                if (params && params.pageNumber) {
                    actionPayload.pageNumber = params.pageNumber;
                    actionPayload.pageData = params.pageData;
                }
                dispatch(getOrderExceptionAction(actionPayload));
                return result.data.list;
            }
        });
};



const getOrderManagementUpdateAbnormalAsync = () => () => fetchPost(orderManagementUpdateAbnormalUrl, {}, 2)
    .then((result) => {
        if (result.state === '000001') {
            return result;
        }
    });

// 供应商名称
const orderDetailSupplierListtAsync = params => () => fetchPost(ORDER_DETAIL_SUPPLIER_LIST, params, 2)
.then((result) => {
    if (result.state === '000001') {
        return result.data.list;
    }
});

// 保存编辑
const orderDetailEditAsync = params => () => fetchPost(EDIT_ERROR_ORDER, params, 2)
    .then((result) => {
        if (result.state === '000001') {
            return result;
        }
    });

export default {
    orderManagementAbnormalOrderAction,
    getorderManagementAbnormalOrderAsync,
    orderManagementListAction,
    getOrderManagementListAsync,
    getOrderManagementUpdateAbnormalAsync,
    getOrderExceptionAction,
    getOrderExceptionListAsync,
    orderDetailSupplierListtAsync,
    orderDetailEditAsync,
};
