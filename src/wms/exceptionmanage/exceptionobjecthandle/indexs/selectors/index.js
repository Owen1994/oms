import { createSelector } from 'reselect';
import { timestampFromat } from '../../../../../util/baseTool';

const getExceptions = state => state.exceptions;

const parseExceptions = createSelector(
    [getExceptions],
    (exceptions) => {
        const newList = [];
        let itemIndex = 0;
        exceptions.list = exceptions.list.map((item) => {
            item.startTime = timestampFromat(item.startTime, 2);
            item.decisionTime = timestampFromat(item.decisionTime, 2);
            item.imageList = item.imageList ? item.imageList.map(img => ({ src: img })) : [];
            if (item.objectHandle.length === 0) {
                newList.push({
                    ...item,
                    index: itemIndex, // 序号
                    isSingle: true, // 单条方案
                    plan: item.plan || {},
                    progressStatus: item.progressStatus || {},
                });
                itemIndex++;
                return;
            }// 如果是没有方案的数据

            const newObjectHandle = [];
            item.objectHandle.forEach((group) => { // 展开二三级数据
                const { parentPlan, childPlan } = group;
                if (!childPlan) {
                    return;
                }
                if (childPlan.length === 1) { // 单条方案的数据
                    newObjectHandle.push({
                        ...childPlan[0],
                        parentPlan,
                        key: childPlan[0].childId,
                        isSingle: (parentPlan && parentPlan.code) !== 'TOGOOD', // 单条方案
                    });
                    return;
                }
                childPlan.forEach((child, cIndex) => { // 有多行子数据
                    if (cIndex === 0) { // 是否是每组第一条
                        newObjectHandle.push({
                            childSize: childPlan.length,
                            parentPlan,
                            ...child,
                            key: child.childId,
                        });
                    } else {
                        newObjectHandle.push({
                            childSize: 0,
                            parentPlan,
                            ...child,
                            key: child.childId,
                        });
                    }
                });
            });
            newObjectHandle.forEach((t, index) => { // 展开一二数据
                if (index === 0) {
                    newList.push({
                        groupSize: newObjectHandle.length, // 当前组的总数
                        ...item,
                        ...t,
                        index: itemIndex, // 序号
                    });
                    itemIndex++;
                } else {
                    newList.push({
                        ...item,
                        ...t,
                        number: item.errorcode,
                        sku: item.sku,
                        groupSize: 0,
                    });
                }
            });
            return item;
        });
        exceptions.list = newList;
        return exceptions;
    },
);

export default parseExceptions;
