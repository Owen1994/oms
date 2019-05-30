import { createSelector } from 'reselect';
import { timestampFromat } from '../../../../util/baseTool';

const getTables = state => state.getOrderQueryList;

/**
 * 图库设置列表数据转换
 */
export const parseTables = createSelector(
    [getTables],
    (data) => {
        if (!data.list) {
            return data;
        }
        data.list.forEach((t) => {
            t.printTimes = t.printTimes ? timestampFromat(Number.parseInt(t.printTimes, 10), 0) : '--';
            t.createTime = t.createTime ? timestampFromat(Number.parseInt(t.createTime, 10), 0) : '--';
            if (t.remark) {
                if (t.remark.length > 12) {
                    t.shortRemark = t.remark.substring(0, 12) + '...';
                } else {
                    t.shortRemark = '';
                }
            } else {
                t.shortRemark = '';
            }
        });
        return data;
    },
);
export default parseTables;
