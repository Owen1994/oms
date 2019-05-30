import { fetchPost } from '../../../../util/fetch';

export const priceDetailsDataAcquisitionInfo = 'priceDetailsDataAcquisitionInfo';
export const getPaymentMethodInfo = 'getPaymentMethodInfo';

const url = '';
// const url = '/mockjsdata/31';
export const orderDetailSupplierListUrl = `${url}/pmsservice/api/OrderDetailSupplierList/orderDetailSupplierList`;
const priceDetailsDataAcquisitionUrl = `${url}/pmsservice/api/PriceDetailsDataAcquisition/priceDetailsDataAcquisition`;
const skuHistoricalPurchaseOrderUrl = `${url}/pmsservice/api/orderManagementUpdateAbnormal/SkuHistoricalPurchaseOrder/skuHistoricalPurchaseOrder`;
const paymentMethodUrl = `${url}/pmsservice/api/PublicInformationPaymentMethod/publicInformationPaymentMethod`;
const priceDetailsAddSupplierUrl = `${url}/pmsservice/api/PriceDetailsAddSupplier/priceDetailsAddSupplier`;
const priceDetailsLowerTipsUrl = `${url}/pmsservice/api/PriceDetailsLowerTips/priceDetailsLowerTips`;

const priceDetailsDataAcquisitionAction = params => ({
    type: priceDetailsDataAcquisitionInfo,
    payload: params,
});

const getPriceDetailsDataAcquisitionAsync = params => (dispatch) => {
    fetchPost(priceDetailsDataAcquisitionUrl, params,2)
        .then((result) => {
            if (result.state === '000001') {
                const actionPayload = {
                    basicInfo: result.data.basicInfo,
                    supplierArray: result.data.supplierArray && result.data.supplierArray.map((v, k) => {
                        v.isOrigin = true;
                        if (!v.key) {
                            v.key = `origin${k}`;
                        }
                        return v;
                    }),
                    loading: false,
                };
                dispatch(priceDetailsDataAcquisitionAction(actionPayload));
                return result.data;
            }
        });
};
// sku历史采购订单
const skuHistoricalPurchaseOrderAsync = params => () => fetchPost(skuHistoricalPurchaseOrderUrl, params,2)
    .then((result) => {
        if (result.state === '000001') {
            return result.data;
        }
    });

// 付款方式
const getPaymentMethodAction = params => ({
    type: getPaymentMethodInfo,
    payload: params,
});

const getPaymentMethodAsync = params => (dispatch) => {
    fetchPost(paymentMethodUrl, params)
        .then((result) => {
            if (result.state === '000001') {
                dispatch(getPaymentMethodAction(result.data.list));
                return result.data;
            }
        });
};
// 核查结束
const priceDetailsAddSupplierAsync = params => () => fetchPost(priceDetailsAddSupplierUrl, params, 1)
    .then((result) => {
        if (result.state === '000001') {
            return result;
        }
    });
// 下架
const priceDetailsLowerTipsAsync = params => () => fetchPost(priceDetailsLowerTipsUrl, params, 1)
    .then((result) => {
        if (result.state === '000001') {
            return result;
        }
    });

export default {
    priceDetailsDataAcquisitionAction,
    getPriceDetailsDataAcquisitionAsync,
    skuHistoricalPurchaseOrderAsync,
    getPaymentMethodAction,
    getPaymentMethodAsync,
    priceDetailsAddSupplierAsync,
    priceDetailsLowerTipsAsync,
};
