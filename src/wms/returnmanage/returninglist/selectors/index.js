import { createSelector } from 'reselect';

const getParts = state => state.parts;

const parseParts = createSelector(
    [getParts],
    (parts) => {
        if (parts.list) {
            parts.list.forEach((group) => {
                const newList = [];
                if (group.orderInfo && group.orderInfo.inspectionResult) {
                    const list = group.orderInfo.inspectionResult;
                    list.forEach((child, index) => {
                        if (index === 0) { // 是否是每组第一条
                            newList.push({
                                rowSpanSize: list.length, // 当前组的总数
                                key: group.key,
                                ...group.orderInfo,
                                ...child,
                            });
                        } else {
                            newList.push({
                                key: `${group.key}-${index}`,
                                ...child,
                            });
                        }
                    });
                    group.orderInfo = newList;
                }
            });
        }
        return parts;
    },
);

export default parseParts;
