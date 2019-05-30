import { createSelector } from 'reselect';

const getReceivedParts = state => state.receivedParts;
const getScanReceiptParts = state => state.scanReceiptParts;

export const parseReceivedParts = createSelector(
    [getReceivedParts],
    (parts) => {
        parts.list = parts.list ? parts.list.map((item) => {
            if (!item.remarks) {
                item.remarks = '--';
            }
            item.priorityName = item.priorityLevel.name || '';
            item.images = item.images.map(img => ({ src: img }));
            return item;
        }) : [];
        return parts;
    },
);
export const parseScanReceiptParts = createSelector(
    [getScanReceiptParts],
    (parts) => {
        parts.list = parts.list ? parts.list.map((item) => {
            if (!item.remarks) {
                item.remarks = '--';
            }
            item.priorityName = item.priorityLevel.name || '';
            return item;
        }) : [];
        return parts;
    },
);
