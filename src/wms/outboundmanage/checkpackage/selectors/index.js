import { createSelector } from 'reselect';

const getParts = state => state.parts;

const parseParts = createSelector(
    [getParts],
    (parts) => {
        const newList = [];
        if (parts.orderInfo && parts.orderInfo.skuList) {
            parts.orderInfo.skuList.forEach((child, index) => {
                const { quantity, checkedQuantity = 0, scanSkuList = [] } = child;
                if (index === 0) { // 是否是每组第一条
                    newList.push({
                        rowSpanSize: parts.orderInfo.skuList.length, // 当前组的总数
                        orderNumber: parts.orderInfo.orderNumber,
                        checkNumber: quantity - checkedQuantity,
                        scanSkuList, // 保存每次扫描的sku唯一码
                        checkedQuantity,
                        ...child,
                    });
                } else {
                    newList.push({
                        checkNumber: quantity - checkedQuantity,
                        checkedQuantity,
                        scanSkuList,
                        ...child,
                    });
                }
            });
            parts.orderInfo.skuList = newList;
        } else {
            parts.orderInfo = {
                skuList: [],
            };
        }
        return parts;
    },
);

export default parseParts;
