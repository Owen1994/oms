import { createSelector } from 'reselect';

const data = state => state.itemIdlistdata || [];
/**
 * 描述列表数据转换
 */
const parsedataListData = createSelector(
    [data],
    (data) => {
        data = data.map((item, index) => {
            item.key = index;
            return item;
        });
        return data;
    },
);

export default parsedataListData;
