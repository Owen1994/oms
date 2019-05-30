import { createSelector } from 'reselect';

const getParts = state => state.parts;

const parseParts = createSelector(
    [getParts],
    (parts) => {
        const newList = [];
        parts.list.forEach((group, groupIndex) => {
            if (group.storageArr) {
                group.storageArr.forEach((child, index) => {
                    newList.push({
                        key: `${groupIndex}-${index}`,
                        index: groupIndex + 1, // 序号
                        cnName: group.cnName,
                        pickableStock: group.pickableStock,
                        purchasingTransit: group.purchasingTransit,
                        sku: group.sku,
                        storageLocation: child.storageLocation,
                        storageStock: child.storageStock,
                        transferTransit: group.transferTransit,
                        warehouse: group.warehouse,
                        isFirst: index === 0, // 是否改组是第一条
                        groupSize: group.storageArr.length, // 当前组的总数
                    });
                });
            }
        });
        parts.list = newList;
        return parts;
    },
);

export default parseParts;
