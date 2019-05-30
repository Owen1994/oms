import { createSelector } from 'reselect';

import { timestampFromat } from '../../../../util/baseTool';

const dataList = state => state.dataList;
/**
 * 描述列表数据转换
 */
const parsedataListData = createSelector(
    [dataList],
    (dataLists) => {
        dataLists.list = dataLists.list !== undefined ? dataLists.list.map((item) => {
            item.lastModifyTime = timestampFromat(Number.parseInt(item.lastModifyTime, 10), 2);
            item.key = item.key;
            return item;
        }) : [];
        return dataLists;
    },
);

export default parsedataListData;
