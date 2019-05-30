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
            // item.completeTime = timestampFromat(Number.parseInt(item.completeTime, 10), 2);
            // item.operationTime = timestampFromat(Number.parseInt(item.operationTime, 10), 2);
            item.key = item.key;
            return item;
        });
        return dataLists;
    },
);

export default parsedataListData;
