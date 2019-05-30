import { createSelector } from 'reselect';

const getParts = state => state;

const parseParts = createSelector(
    [getParts],
    (parts) => {
        const list = parts.list || [];
        const listTotal = parts.listTotal;
        if (listTotal && !parts.isInitTotalItem) {
            list.push({
                isTotalItem: true,
                ...listTotal,
            });
            parts.isInitTotalItem = true;
        }
        return parts;
    },
);

export default parseParts;
