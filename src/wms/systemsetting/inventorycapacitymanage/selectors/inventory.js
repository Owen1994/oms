import { createSelector } from 'reselect';
import { timestampFromat, strTrim } from '../../../../util/baseTool';

const getInventory = state => state.inventory;

const parseInventory = createSelector(
    [getInventory],
    (data) => {
        data.list = data.list.map((item) => {
            item.operationTime = timestampFromat(item.operationTime, 2);
            return item;
        });
        return data;
    },
);

export const filterInventoryParams = (filters) => {
    // filters.warehouseCode = filters.warehouseCode ? filters.warehouseCode[0] : '';
    if (filters.sku) {
        filters.sku = strTrim(filters.sku);
    }
    return filters;
};

export default parseInventory;
