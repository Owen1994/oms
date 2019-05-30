import { createSelector } from 'reselect';

import { timestampFromat } from 'util/baseTool';

const dataList = state => state.dataList;
/**
 * 描述列表数据转换
 */
const parsedataListData = createSelector(
    [dataList],
    (dataLists) => {
        dataLists.list = dataLists.list !== undefined ? dataLists.list.map((item) => {
            item.reShelfDate = timestampFromat(item.reShelfDate, 2);
            item.shelfDate = timestampFromat(item.shelfDate, 2);
            if (item.mainPic && !/^https?/g.test(item.mainPic)) {
                item.mainPic = `https://${item.mainPic}`;
            }
            item.key = item.id;
            return item;
        }) : [];
        return dataLists;
    },
);

export default parsedataListData;
