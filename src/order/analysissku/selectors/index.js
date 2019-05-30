import { createSelector } from 'reselect';

import { timestampFromat } from '../../../util/baseTool';

const data = state => state.data.skuRanking || [];
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
