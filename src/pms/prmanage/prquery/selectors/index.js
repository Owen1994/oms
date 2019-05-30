import { createSelector } from 'reselect';

import { timestampFromat, randNum } from '../../../../util/baseTool';

const dataList = state => state.dataList;
let refresh = true;
/**
 * 描述列表数据转换
 */
const parsedataListData = createSelector(
    [dataList],
    (dataLists) => {
        if (!refresh) {
            return;
        }
        refresh = false;
        const resultArr = [];
        dataLists.list = dataLists.list || [];
        dataLists.list.forEach((item) => {
            if (item.order && item.order.length > 1) {
                item.order.forEach((it1, index1) => {
                    const it2 = { ...item };
                    // it2.key = `${it2.key}_${index1}`;
                    it2.key = randNum() + '-' + it2.key + '-' + index1;
                    delete it2.order;
                    if (typeof it1.printTimes === 'number') {
                        if (Number.isNaN(it1.printTimes)) {
                            it1.printTimes = null;
                        } else {
                            it1.printTimes = timestampFromat(Number.parseInt(it1.printTimes, 10), 2);
                        }
                    }
                    if (index1 === 0) {
                        it2.rows = item.order.length;
                        resultArr.push({ ...it2, ...it1 });
                    } else {
                        it2.rows = 0;
                        resultArr.push({ ...it2, ...it1 });
                    }
                });
            } else if (item.order && item.order.length === 1) {
                const {
                    orderNumbers,
                    printTimes,
                    purchaseCancelQuantity,
                    skuState,
                    wareQuantity,
                    purchaseNumbers,
                    purchaseStates,
                    suppliers,
                    skuPrice,
                } = item.order[0];
                item.row = 1;
                item.orderNumbers = orderNumbers;
                if (Number.isNaN(printTimes)) {
                    item.printTimes = null;
                } else {
                    item.printTimes = timestampFromat(Number.parseInt(printTimes, 10), 2);
                }
                item.purchaseNumbers = purchaseNumbers;
                item.purchaseStates = purchaseStates;
                item.suppliers = suppliers;
                item.skuPrice = skuPrice;
                item.purchaseCancelQuantity = purchaseCancelQuantity;
                item.skuState = skuState;
                item.wareQuantity = wareQuantity;
                delete item.order;
                resultArr.push(item);
            } else {
                resultArr.push(item);
            }
            if (typeof item.planUploadTime === 'number') {
                item.planUploadTime = timestampFromat(item.planUploadTime, 2);
            }
            if (typeof item.demandTime === 'number') {
                item.demandTime = timestampFromat(item.demandTime, 2);
            }
            item.key = randNum() + '-' + item.key;
        });
        dataLists.list = resultArr;
        refresh = true;
        return dataLists;
    },
);

export default parsedataListData;
