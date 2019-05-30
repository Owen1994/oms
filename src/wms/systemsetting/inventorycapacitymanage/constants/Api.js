const HEAD_URL = ''; // /mockjsdata/35
const HEAD_URL2 = ''; // /mockjsdata/47

// 获取储位列表
export const GET_PLACE_MANAGE_LIST = `${HEAD_URL}/wmsservice/api/PlaceManage/placeManage`;
// 新增储位
export const ADD_PLACE_MANAGE = `${HEAD_URL}/wmsservice/api/PlaceManage/add`;
// 删除储位
export const DELETE_PLACE_MANAGE = `${HEAD_URL}/wmsservice/api/PlaceManage/delete`;
// 导入储位
export const IMPORT_PLACE_MANAGE = `${HEAD_URL}/wmsservice/api/PlaceManage/import`;
// 编辑储位
export const EDIT_PLACE_MANAGE = `${HEAD_URL}/wmsservice/api/PlaceManage/edit`;

// 获取储位库存设置列表
export const GET_SP_CAPACITY_LIST = `${HEAD_URL2}/wmsservice/api/PlaceSkuStock/storageStockList`;
// 批量导入
export const IMPORT_SP_CAPACITY = `${HEAD_URL2}/wmsservice/api/PlaceSkuStock/batchImport`;
// 添加SKU库存
export const ADD_SKU_INVENTORY = `${HEAD_URL2}/wmsservice/api/PlaceSkuStock/addSkuStock`;
