import { createSelector } from 'reselect';

import { timestampFromat } from '../../../../util/baseTool';

const dataList = state => state.procurementData;
/**
 * 描述列表数据转换
 */
const procurementList = createSelector(
    [dataList],
    (dataLists) => {
        dataLists.list = dataLists.list !== undefined ? dataLists.list.map((item) => {
            item.createTime = timestampFromat(Number.parseInt(item.createTime, 10), 2);
            item.lastModifyTime = timestampFromat(Number.parseInt(item.lastModifyTime, 10), 2);
            item.key = item.key;
            return item;
        }) : [];
        return dataLists;
    },
);

export default procurementList;
