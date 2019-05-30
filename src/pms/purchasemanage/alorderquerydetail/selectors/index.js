import { createSelector } from 'reselect';
import { timestampFromat } from "../../../../util/baseTool";

const getTables = state => state.getMainDataList;

/**
 * 格式化时间
 * @param value
 * @param type
 * @returns {string}
 */
const parseTime = (value, type = '2') => (value ? timestampFromat(value, type) : '');

export const parseData = createSelector(
    [getTables],
    (data) => {
        return data;
    },
);

/**
 * 物流信息数据转换
 */
export const parseLogistics = (data) => {
    if (data.trajectoryList) {
        data.trajectoryList.forEach((t) => {
            if (!t.time) {
                t.time = '--';
            }
        });
    }
    return data;
};


/**
 * 价格信息数据转换
 */
export const parsePrice = (data) => {
    if (data.list) {
        data.list.forEach((t) => {
            if (!t.time) {
                t.time = '--';
            }
        });
    }
    return data;
};
