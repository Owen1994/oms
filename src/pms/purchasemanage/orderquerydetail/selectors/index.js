import { createSelector } from 'reselect';
import { timestampFromat } from '../../../../util/baseTool';
import logOperateDesc from '../constants/LogTable';

const address = state => state.detailAccess;
const detailLog = state => state.detailLog;

/**
 * 格式化时间
 * @param value
 * @param type
 * @returns {string}
 */
const parseTime = (value, type = '2') => (value ? timestampFromat(value, type) : '');

/**
 * 格式化金额,显示后3位
 * @param value
 * @returns {string}
 */
const parseAmount = value => parseFloat(value || 0).toFixed(3);

/**
 * 图库设置列表数据转换
 */
export const parseAddress = createSelector(
    [address],
    (data) => {
        data.basicInfo.totalAmount = parseAmount(data.basicInfo.totalAmount);
        data.basicInfo.freight = parseAmount(data.basicInfo.freight);
        data.basicInfo.purchaseAmount = parseAmount(data.basicInfo.purchaseAmount);
        if (data.basicInfo.printTime) {
            data.basicInfo.printTime = parseTime(Number.parseInt(data.basicInfo.printTime, 10));
        } else {
            data.basicInfo.printTime = '--';
        }


        data.productInfoArray.forEach((t) => {
            // t.unitPrice = Number.parseFloat(t.unitPrice).toFixed(4);
            // t.purchaseAmount = Number.parseFloat(t.purchaseAmount).toFixed(4);
            // t.amount = Number.parseFloat(t.amount).toFixed(4);
            if (t.arrivalTime) {
                t.arrivalTime = parseTime(Number.parseInt(t.arrivalTime, 10));
            } else {
                t.arrivalTime = '--';
            }
        });
        return data;
    },
);

/**
 * 日志信息数据转换
 */
export const parseDetailLog = createSelector(
    [detailLog],
    (data) => {
        data.list.forEach((t) => {
            if (t.operateTime) {
                t.operateTime = parseTime(Number.parseInt(t.operateTime, 10));
            } else {
                t.operateTime = '--';
            }
        });
        return data;
    },
);

/**
 * 质检明细信息数据转换
 */
export const parseInspection = (data) => {
    data.list.forEach((t) => {
        if (t.contrastTime) {
            t.contrastTime = parseTime(Number.parseInt(t.contrastTime, 10));
        } else {
            t.contrastTime = '--';
        }
        if (t.inspectTime) {
            t.inspectTime = parseTime(Number.parseInt(t.inspectTime, 10));
        } else {
            t.inspectTime = '--';
        }
    });
    return data;
};

/**
 * 上架明细信息数据转换
 */
export const parsePutaway = (data) => {
    data.list.forEach((t) => {
        if (t.operateTime) {
            t.operateTime = parseTime(Number.parseInt(t.operateTime, 10));
        } else {
            t.operateTime = '--';
        }
    });
    return data;
};

/**
 * 收货明细信息数据转换
 */
export const parseReceiveGoods = (data) => {
    data.list.forEach((t) => {
        if (t.operateTime) {
            t.operateTime = parseTime(Number.parseInt(t.operateTime, 10));
        } else {
            t.operateTime = '--';
        }
    });
    return data;
};

/**
 * 付/退款明细信息数据转换
 */
export const parseRefundOrPayment = (data) => {
    data.list.forEach((t) => {
        if (t.operateTime) {
            t.operateTime = parseTime(Number.parseInt(t.operateTime, 10));
        } else {
            t.operateTime = '--';
        }
    });
    return data;
};

/**
 * 网拍物流信息数据转换
 */
export const parseRacquetLogistics = (data) => {
    // if (data.trajectoryList) {
    //     data.trajectoryList.forEach((t) => {
    //         if (t.time) {
    //             t.time = parseTime(Number.parseInt(t.time, 10));
    //         } else {
    //             t.time = '--';
    //         }
    //     });
    // }
    return data;
};
