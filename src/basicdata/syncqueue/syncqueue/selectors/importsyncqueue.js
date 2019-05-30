import { createSelector } from 'reselect';

import { timestampFromat } from '../../../../util/baseTool';

const dataList = state => state.supplierData;
/**
 * 描述列表数据转换
 */
const supplierList = createSelector(
    [dataList],
    (dataLists) => {
        dataLists.list = dataLists.list !== undefined ? dataLists.list.map((item) => {
            item.importTime = timestampFromat(Number.parseInt(item.importTime, 10), 2);
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
            } else if (item.warehouseType === 6) {
                item.warehouseDescribe = '基础资料表';
            } else if (item.warehouseType === 7) {
                item.warehouseDescribe = '库存跟进表';
            } else if (item.warehouseType === 8) {
                item.warehouseDescribe = '业务角色配置';
            }
            if (item.importState === 0) {
                item.importStateDescribe = '待处理';
            } else if (item.importState === 1) {
                item.importStateDescribe = '处理中';
            } else if (item.importState === 2) {
                item.importStateDescribe = '已完成';
            } else if (item.importState === 3) {
                item.importStateDescribe = '已完成';
            }
            item.key = item.id;
            return item;
        }) : [];
        return dataLists;
    },
);

export default supplierList;
