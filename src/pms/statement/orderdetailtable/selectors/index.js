import { createSelector } from 'reselect';

import { timestampFromat } from '../../../../util/baseTool';

const dataList = state => state.dataList;
/**
 * 描述列表数据转换
 */
const parsedataListData = createSelector(
    [dataList],
    (dataLists) => {
        dataLists.list = dataLists.list || [];
        dataLists.list = dataLists.list.map((item) => {
            if (typeof item.poTime === 'number') {
                item.poTime = timestampFromat(item.poTime, 2);
            }
            if (typeof item.receivingTime === 'number') {
                item.receivingTime = timestampFromat(item.receivingTime, 2);
            }
            if (typeof item.warehouseInTime === 'number') {
                item.warehouseInTime = timestampFromat(item.warehouseInTime, 2);
            }
            // item.poTime = timestampFromat(Number.parseInt(item.poTime, 10), 2);
            // item.receivingTime = timestampFromat(Number.parseInt(item.receivingTime, 10), 2);
            // item.warehouseInTime = timestampFromat(Number.parseInt(item.warehouseInTime, 10), 2);

            item.key = item.key;
            return item;
        });
        return dataLists;
    },
);

export default parsedataListData;
