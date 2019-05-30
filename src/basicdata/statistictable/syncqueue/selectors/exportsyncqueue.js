import { createSelector } from 'reselect';

import { timestampFromat } from '../../../../util/baseTool';

const dataList = state => state.procurementData;
/**
 * 描述列表数据转换
 */
const procurementList = createSelector(
    [dataList],
    (dataLists) => {
        dataLists.list = dataLists.list !== undefined ? dataLists.list.map((item) => {
            item.downloadTime = timestampFromat(Number.parseInt(item.downloadTime, 10), 2);
            item.finishTime = timestampFromat(Number.parseInt(item.finishTime, 10), 2);
            if (item.warehouseType === 1) {
                item.warehouseDescribe = '国内仓';
            } else if (item.warehouseType === 2) {
                item.warehouseDescribe = '海外仓';
            } else if (item.warehouseType === 3) {
                item.warehouseDescribe = '国内覆盖海外';
            } else if (item.warehouseType === 4) {
                item.warehouseDescribe = '备用仓库1';
            } else if (item.warehouseType === 5) {
                item.warehouseDescribe = '备用仓库2';
            }

            if (item.downloadState === 0) {
                item.downloadStateDescribe = '待处理';
            } else if (item.downloadState === 1) {
                item.downloadStateDescribe = '处理中';
            } else if (item.downloadState === 2) {
                item.downloadStateDescribe = '已完成';
            } else if (item.downloadState === 3) {
                item.downloadStateDescribe = '已完成';
            }

            if (item.causesFailure) {
                item.causesFailureType = 1;
            }

            item.key = item.id;
            return item;
        }) : [];
        return dataLists;
    },
);

export default procurementList;
