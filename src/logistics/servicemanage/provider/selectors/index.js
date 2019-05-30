import { createSelector } from 'reselect';

import { timestampFromat, randNum } from '../../../../util/baseTool';

const data = state => state.data;
/**
 * 描述列表数据转换
 */
const parsedataListData = createSelector(
    [data],
    (data) => {
        let list = data.list || [];
        list = list.map((item) => {
            item.contactInfos = [];
            item.contactInfos.push({key: randNum(), label: 'QQ', value: item.qq, type: 'span' });
            item.contactInfos.push({key: randNum(), label: '电话', value: item.tel, type: 'span' });
            item.contactInfos.push({key: randNum(), label: 'QQ群', value: item.qqGroup, type: 'a' });
            if (item.logisticsCode && item.logisticsName) {
                if (item.logisticsCode.length !== 0 && item.logisticsName.length !== 0) {
                    item.logisticsData = [{key: item.logisticsCode, label: item.logisticsName}];
                } else {
                    item.logisticsData = []
                }
            }
            return item;
        });
        return data;
    },
);

export default parsedataListData;
