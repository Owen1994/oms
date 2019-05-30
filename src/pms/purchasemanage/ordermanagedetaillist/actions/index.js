import { fetchPost } from '../../../../util/fetch';

export const orderDetailOrderGoodsListInfo = 'orderDetailOrderGoodsListInfo';
// const url = '/mockjsdata/31';
const url = '';
const orderDetailOrderGoodsListUrl = `${url}/pmsservice/api/OrderDetailOrderGoodsList/orderDetailOrderGoodsList`;
const orderDetailSupplierListUrl = `${url}/pmsservice/api/OrderDetailSupplierList/orderDetailSupplierList`;
const orderDetailEditUrl = `${url}/pmsservice/api/OrderDetailEdit/orderDetailEdit`;
const logisticsUrl = `${url}/pmsservice/api/LogisticsMode/logisticsMode`;
const orderDetailGeneratePoUrl = `${url}/pmsservice/api/OrderDetailGeneratePo/orderDetailGeneratePo`;
const orderDetailPriceVerificationUrl = `${url}/pmsservice/api/OrderDetailPriceVerification/orderDetailPriceVerification`;
const skuHistoricalPurchaseOrderUrl = `${url}/pmsservice/api/orderManagementUpdateAbnormal/SkuHistoricalPurchaseOrder/skuHistoricalPurchaseOrder`;
const skuHistoricalCheckUrl = `${url}/pmsservice/api/orderManagementUpdateAbnormal/SkuHistoricalCheck/skuHistoricalCheck`;

const orderDetailOrderGoodsListAction = params => ({
    type: orderDetailOrderGoodsListInfo,
    payload: params,
});

const orderDetailOrderGoodsListAsync = params => dispatch => fetchPost(orderDetailOrderGoodsListUrl, params, 2)
    .then((result) => {
        if (result.state === '000001') {
            const actionPayload = {
                ...result.data,
                loading: false,
            };
            if (params) {
                actionPayload.params = params.data;
            }
            dispatch(orderDetailOrderGoodsListAction(actionPayload));
            return result.data.list;
        }
    });

const orderDetailSupplierListtAsync = params => () => fetchPost(orderDetailSupplierListUrl, params, 2)
    .then((result) => {
        if (result.state === '000001') {
            return result.data.list;
        }
    });

// 保存编辑
const orderDetailEditAsync = params => () => fetchPost(orderDetailEditUrl, params, 2)
    .then((result) => {
        if (result.state === '000001') {
            return result;
        }
    });
// 获取物流方式
const logisticsAsync = params => () => fetchPost(logisticsUrl, params, 2)
    .then((result) => {
        if (result.state === '000001') {
            return result.data.list;
        }
    });
// 生成PO
const orderDetailGeneratePoAsync = params => () => fetchPost(orderDetailGeneratePoUrl, params, 2)
    .then((result) => {
        if (result.state === '000001') {
            return result;
        } else {
            return result;
        }
    });
// 推送价格核查
const orderDetailPriceVerificationAsync = params => () => fetchPost(orderDetailPriceVerificationUrl, params, 2)
    .then((result) => {
        if (result.state === '000001') {
            return result;
        }
    });
// sku历史采购订单
const skuHistoricalPurchaseOrderAsync = params => () => fetchPost(skuHistoricalPurchaseOrderUrl, params, 2)
    .then((result) => {
        if (result.state === '000001') {
            return result.data;
        }
    });
// sku历史采购订单
const skuHistoricalCheckAsync = params => () => fetchPost(skuHistoricalCheckUrl, params, 2)
    .then((result) => {
        if (result.state === '000001') {
            return result.data;
        }
    });
export default {
    orderDetailOrderGoodsListAction,
    orderDetailOrderGoodsListAsync,
    orderDetailSupplierListtAsync,
    orderDetailEditAsync,
    logisticsAsync,
    orderDetailGeneratePoAsync,
    orderDetailPriceVerificationAsync,
    skuHistoricalPurchaseOrderAsync,
    skuHistoricalCheckAsync,
};
