import { createSelector } from 'reselect';

import { timestampFromat } from '../../../../util/baseTool';

const dataList = state => state.supplierData;
/**
 * 描述列表数据转换
 */
const supplierList = createSelector(
    [dataList],
    (dataLists) => {
        dataLists.list = dataLists.list !== undefined ? dataLists.list.map((item) => {
            item.createTime = timestampFromat(Number.parseInt(item.createTime, 10), 2);
            item.key = item.key;
            return item;
        }) : [];
        return dataLists;
    },
);

export default supplierList;
