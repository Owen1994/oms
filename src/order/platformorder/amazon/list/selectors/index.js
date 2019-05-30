import { createSelector } from 'reselect';
import { timestampFromat } from '../../../../../util/baseTool';

const getTables = state => state.amazonListObj;

export const parseTables = createSelector(
    [getTables],
    (data) => {
        if (!data.data) {
            return data;
        }
        data.data.forEach((t) => {
            t.confirmDeliveryTime = t.confirmDeliveryTime ? timestampFromat(Number.parseInt(t.confirmDeliveryTime, 10), 0) : '--';
            t.createOrderTime = t.createOrderTime ? timestampFromat(Number.parseInt(t.createOrderTime, 10), 0) : '--';
            t.grapOrderTime = t.grapOrderTime ? timestampFromat(Number.parseInt(t.grapOrderTime, 10), 0) : '--';
            t.markOrderTime = t.markOrderTime ? timestampFromat(Number.parseInt(t.markOrderTime, 10), 0) : '--';
            t.realDeliveryTime = t.realDeliveryTime ? timestampFromat(Number.parseInt(t.realDeliveryTime, 10), 0) : '--';
        });
        return data;
    },
);
export default parseTables;
