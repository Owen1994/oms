// const HOST = '/mockjsdata/53';
const HOST = '';

// 获取库存列表
export const GET_STOCK_LIST = `${HOST}/pdm/motan/service/api/IPdmFacadeService/getStockList`;

// 获取显示字段列表
export const GET_OVERSEA_SHOW_FILED_LIST = `${HOST}/pdm/motan/service/api/IPdmFacadeService/getOverseaShowFiledList`;

// 导入
export const IMPORT_SKU = `${HOST}/pdm/motan/service/api/IPdmFacadeService/importSku`;

// 导出
export const EXPORT_SKU = `${HOST}/pdm/motan/service/api/IPdmFacadeService/exportSku`;

// 修改显示字段列表
export const UPDATE_OVERSEA_SHOW_FILED_LIST = `${HOST}/pdm/motan/service/api/IPdmFacadeService/updateOverseaShowFiledList`;
