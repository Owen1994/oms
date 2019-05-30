import { createSelector } from 'reselect';

import { timestampFromat } from '../../../../util/baseTool';

const dataList = state => state.dataList;
/**
 * 描述列表数据转换
 */
const parsedataListData = createSelector(
    [dataList],
    (dataLists) => {
        dataLists.list = dataLists.list || [];
        dataLists.list = dataLists.list.map((item) => {
            item.operationTime = timestampFromat(item.operationTime, 2);
            if (item.operationType === 1) {
                item.operationDescribe = '导入';
            } else if (item.operationType === 2) {
                item.operationDescribe = '导出';
            }

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
            } else if (item.warehouseType === 6) {
                item.warehouseDescribe = '基本资料表';
            } else if (item.warehouseType === 7) {
                item.warehouseDescribe = '库存跟进表';
            } else if (item.warehouseType === 8) {
                item.warehouseDescribe = '业务角色配置';
            }

            item.key = item.id;
            return item;
        });
        return dataLists;
    },
);

export default parsedataListData;
