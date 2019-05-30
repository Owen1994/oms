import { timestampFromat, randNum } from "../../../../util/baseTool";

export const parseLogData = (data) => {
    data.list = data.list || [];
    data.list = data.list.map((item) => {
        item.warehouse = item.warehouse || '';
        item.warehouseCode = item.warehouseCode || '';
        const arrayWarehouse = item.warehouse.split(",").filter(item => item);
        const arrayWarehouseCode = item.warehouseCode.split(",").filter(item => item);
        let arrayWarehouseList = [];
        
        if (arrayWarehouse.length === arrayWarehouseCode.length) {
            arrayWarehouse.map((t, index) => {
                if (/^\d+$/g.test(arrayWarehouseCode[index])) {
                    const iKey = Number.parseInt(arrayWarehouseCode[index], 10);
                    arrayWarehouseList.push({key: iKey, label: t,});
                } else {
                    arrayWarehouseList.push({key: arrayWarehouseCode[index], label: t,});
                }
            });
        }
        item.arrayWarehouseList = arrayWarehouseList;
        return item;
    });
    return data;
};

export const parseLogData1 = (data) => {
    data.list = data.list || [];
    data.list = data.list.map((item) => {
        item.operatTime = timestampFromat(item.operatTime, 2);
        return item;
    });
    return data;
};
