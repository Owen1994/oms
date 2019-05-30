import { createSelector } from 'reselect';

import { timestampFromat } from 'util/baseTool';

const dataList = state => state.dataList;

/**
 * 描述列表数据转换
 */
const parsedataListData = createSelector(
    [dataList],
    (dataLists) => {
        dataLists.data = dataLists.data || [];
        dataLists.data = dataLists.data.map((item) => {
            item.createdTime = timestampFromat(item.createdTime, 2);
            if(item.rsltMsg){
                let rsltMsg = JSON.parse(item.rsltMsg), arr = [];
                for (var i in rsltMsg) {
                    arr.push(`${i}:  ${rsltMsg[i]}`);
                }
                item.rsltMsg = arr;
            }
            return item;
        });
        return dataLists;
    },
);

export default parsedataListData;
