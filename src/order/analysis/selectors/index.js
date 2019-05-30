import { createSelector } from 'reselect';

import { timestampFromat } from '../../../util/baseTool';

const dataList = state => state.dataList;
/**
 * 描述列表数据转换
 */
const parsedataListData = createSelector(
    [dataList],
    (dataLists) => {
        dataLists.sellerIdRanking = dataLists.sellerIdRanking !== undefined ? dataLists.sellerIdRanking.map((item) => {
            item.operateTime = timestampFromat(Number(item.operateTime), 2);
            item.id = item.id;
            return item;
        }) : [];
        dataLists.countryRanking = dataLists.countryRanking !== undefined ? dataLists.countryRanking.map((item) => {
            item.operateTime = timestampFromat(Number(item.operateTime), 2);
            item.id = item.id;
            return item;
        }) : [];
        return dataLists;
    },
);

export default parsedataListData;
