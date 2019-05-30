import { createSelector } from 'reselect';
import { timestampFromat } from '../../../../../util/baseTool';

const getTables = state => state.amazonDetailObj;

export const parseTables = createSelector(
    [getTables],
    (data) => {
        if (!data.timeInfo) {
            return data;
        }
        const t = data.timeInfo;
        t.createTime = t.createTime ? timestampFromat(Number.parseInt(t.createTime, 10), 0) : '--';
        t.deliveryTime = t.deliveryTime ? timestampFromat(Number.parseInt(t.deliveryTime, 10), 0) : '--';
        t.grapTime = t.grapTime ? timestampFromat(Number.parseInt(t.grapTime, 10), 0) : '--';
        t.markTime = t.markTime ? timestampFromat(Number.parseInt(t.markTime, 10), 0) : '--';
        t.mayMarkBeginTime = t.mayMarkBeginTime ? timestampFromat(Number.parseInt(t.mayMarkBeginTime, 10), 0) : '--';
        t.mayMarkEndTime = t.mayMarkEndTime ? timestampFromat(Number.parseInt(t.mayMarkEndTime, 10), 0) : '--';
        t.prepareDeliveryTime = t.prepareDeliveryTime ? timestampFromat(Number.parseInt(t.prepareDeliveryTime, 10), 0) : '--';

        const m = data.moneyInfo;
        data.basicInfo.currency = m.currency ? m.currency : '';
        return data;
    },
);
export default parseTables;
