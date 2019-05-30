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
            item.createDate = timestampFromat(item.createDate, 2);
            item.key = item.id;
            return item;
        });
        return dataLists;
    },
);

export default parsedataListData;
