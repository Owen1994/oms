import { fetchPost } from '../../../../util/fetch';
import { datasaddkey } from '../../../../util/baseTool';
import {
    auditedTaskInfo,
    historyPricingListInfo,
    orderManagementAbnormalOrderInfo,
} from '../constants/ActionTypes';
import {
    auditedTask,
    historyPricingListUrl,
    skuHistoricalCheckUrl, 
    procurementRoleSkuUrl,
    priceManagementAddNewTaskUrl,
    priceManagementImportTaskUrl,
    priceManagementTaskUrl,
    priceManagementExportTaskUrl,
} from '../constants/Api';

const formatData = (list = []) => {
    const arr = [];
    for (let k = 0; k < list.length; k++) {
        if (list[k].infoList && list[k].infoList.length) {
            for (let i = 0; i < list[k].infoList.length; i++) {
                const data = {
                    priceAuditor: list[k].priceAuditor,
                    i_code: list[k].checkTaskNumber,
                    productDesc: list[k].productDesc,
                    // key: list[k].key,
                    sku: list[k].sku,
                    checkTime: list[k].checkTime,
                    pricingType: list[k].pricingType,
                    checkTaskNumber: list[k].checkTaskNumber,
                    ...list[k].infoList[i],
                };
                if (i === 0) {
                    data.rowSpan = list[k].infoList.length;
                }
                arr.push(data);
            }
        } else {
            arr.push({
                priceAuditor: list[k].priceAuditor,
                productDesc: list[k].productDesc,
                key: list[k].key,
                i_code: list[k].checkTaskNumber,
                sku: list[k].sku,
                checkTime: list[k].checkTime,
                pricingType: list[k].pricingType,
                checkTaskNumber: list[k].checkTaskNumber,
            });
        }
    }
    return arr;
};

const auditedTaskAction = params => ({
    type: auditedTaskInfo,
    payload: params,
});

const getAuditedTaskAsync = params => (dispatch) => {
    const data = { data: params };
    fetchPost(auditedTask, data, 2)
        .then((result) => {
            if (result.state === '000001') {
                const actionPayload = {
                    params,
                    list: (result.data && result.data.list && datasaddkey(result.data.list)) || [],
                    loading: false,
                    total: (result.data && result.data.total) || 0,
                    // total: 100,
                };
                dispatch(auditedTaskAction(actionPayload));
                return result.data.list;
            }
        });
};

const getProcurementRoleAsync = params => () => fetchPost(procurementRoleSkuUrl, params)
    .then((result) => {
        if (result.state === '000001') {
            if (result.data.list && result.data.list.length) {
                return result.data.list[0];
            }
        }
    });

const getPriceManagementAddNewTaskAsync = params => () => fetchPost(priceManagementAddNewTaskUrl, params, 2)
    .then((result) => {
        if (result.state === '000001') {
            return result;
        }
    });
const getpriceManagementImportTaskAsync = params => () => fetchPost(priceManagementImportTaskUrl, params,2)
    .then((result) => {
        if (result.state === '000001') {
            return result;
        }
    });
const getPriceManagementTaskAsync = params => () => fetchPost(priceManagementTaskUrl, params,2)
    .then((result) => {
        if (result.state === '000001') {
            return result;
        }
    });
const historyPricingAction = params => ({
    type: historyPricingListInfo,
    payload: params,
});
const getHistoryPricingListAsync = params => (dispatch) => {
    const data = { data: params };
    return fetchPost(historyPricingListUrl, data)
        .then((result) => {
            if (result.state === '000001') {
                const actionPayload = {
                    params,
                    origin: result.data.list,
                    list: (result.data && result.data.list && datasaddkey(formatData(result.data.list))) || [],
                    loading: false,
                    total: (result.data && result.data.total) || 0,
                    // total: 100,
                };
                dispatch(historyPricingAction(actionPayload));
                return result.data.list;
            }
        });
};

// sku历史采购订单
const skuHistoricalCheckAsync = params => () => fetchPost(skuHistoricalCheckUrl, { data: params })
    .then((result) => {
        if (result.state === '000001') {
            return result.data;
        }
    });
// 批量导出
const priceManagementExportTaskAsync = params => () => fetchPost(priceManagementExportTaskUrl, { data: params }, 2)
    .then((result) => {
        if (result.state === '000001') {
            return result.data;
        }
    });
export default {
    auditedTaskAction,
    getAuditedTaskAsync,
    getProcurementRoleAsync,
    getPriceManagementAddNewTaskAsync,
    getpriceManagementImportTaskAsync,
    getPriceManagementTaskAsync,
    historyPricingAction,
    getHistoryPricingListAsync,
    skuHistoricalCheckAsync,
    priceManagementExportTaskAsync,
};
