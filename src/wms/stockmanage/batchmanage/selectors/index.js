import { createSelector } from 'reselect';

const getParts = state => state.parts;

const parseParts = createSelector(
    [getParts],
    (parts) => {
        const newList = [];
        if (parts.list) {
            parts.list.forEach((group, groupIndex) => {
                if (!group.noDeliveryDescription) {
                    group.noDeliveryDescription = '--';
                }
                if (group.purchaseArr) {
                    group.purchaseArr.forEach((child, index) => {
                        if (index === 0) { // 是否是每组第一条
                            const images = group.images.map(item => ({ src: item }));
                            newList.push({
                                index: groupIndex, // 序号
                                isFirst: index === 0, // 是否该组是第一条
                                groupSize: group.purchaseArr.length, // 当前组的总数
                                ...group,
                                // batchNumber: group.batchNumber,
                                key: group.key,
                                images,
                                haveImages: group.images && group.images.length > 0, // 是否有图片
                                // purchaseNumber: group.purchaseNumber,
                                // warehouse: group.warehouse,
                                // noDeliveryDescription: group.noDeliveryDescription,
                                // boxNumber: group.boxNumber,
                                ...child,
                            });
                        } else {
                            newList.push({
                                key: `${group.key}-${index}`,
                                ...child,
                            });
                        }
                    });
                }
            });
        }
        parts.list = newList;
        return parts;
    },
);

export default parseParts;
