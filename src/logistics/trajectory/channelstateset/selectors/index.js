import { createSelector } from 'reselect';

const dataList = state => state.data;
/**
 * 描述列表数据转换
 */
const parsedataListData = createSelector(
    [dataList],
    (dataLists) => {
        dataLists.forEach(t => {
            t.conversionKeyWord = t.keyWord ? (t.keyWord).replace(/,/g, '\n') : '';
            t.lastModifiedTime = t.lastModifiedTime ? t.lastModifiedTime : '--';
        });
        return dataLists;
    },
);

export default parsedataListData;
