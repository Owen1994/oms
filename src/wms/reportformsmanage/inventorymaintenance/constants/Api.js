const HEAD_URL = ''; // /mockjsdata/35

// 获取入库报表
export const STOCK_LIST = `${HEAD_URL}/wmsservice/api/ShelveStatistics/search`;
// 导出入库报表
export const EXPORT_STOCK = `${HEAD_URL}/wmsservice/api/ShelveStatistics/export`;
// 获取入库明细报表
export const STOCK_DETAIL_LIST = `${HEAD_URL}/wmsservice/api/Shelve/search`;
// 导出入库报表
export const EXPORT_STOCK_DETAIL = `${HEAD_URL}/wmsservice/api/Shelve/export`;


// 获取出库报表
export const OUT_STOCK_LIST = `${HEAD_URL}/wmsservice/api/OutBound/getOutboundData`;
// 导出出库报表
export const EXPORT_OUT_STOCK = `${HEAD_URL}/wmsservice/api/OutBound/exportOutboundData`;
// 获取出库明细报表
export const OUT_STOCK_DETAIL_LIST = `${HEAD_URL}/wmsservice/api/OutBound/getOutboundDetailData`;
// 导出出库报表
export const EXPORT_OUT_STOCK_DETAIL = `${HEAD_URL}/wmsservice/api/OutBound/exportOutboundDetailData`;


// 获取盘点报表
export const INVENTORY_LIST = `${HEAD_URL}/wmsservice/api/Inventory/search`;
// 导出盘点报表
export const EXPORT_INVENTORY = `${HEAD_URL}/wmsservice/api/Inventory/export`;
