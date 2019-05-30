const HEAD_URL = ''; // /mockjsdata/35

// 获取基础资料配置主列表
export const GET_BASE_LIST = `${HEAD_URL}/wmsservice/api/BasicConfig/queryGroup`;
// 基础资料配置主列表新增接口
export const ADD_GROUP = `${HEAD_URL}/wmsservice/api/BasicConfig/addGroup`;
// 获取仓库项列表
export const GET_WAREHOUSE_LIST = `${HEAD_URL}/wmsservice/api/BasicConfig/Warehouse/warehouse`;
// 新增仓库项列表
export const ADD_WAREHOUSE_LIST = `${HEAD_URL}/wmsservice/api/BasicConfig/Warehouse/add`;
// 删除仓库项列表
export const DELETE_WAREHOUSE_LIST = `${HEAD_URL}/wmsservice/api/BasicConfig/Warehouse/delete`;
// 获取主体、采购单状态项列表
export const GET_CHILD_LIST = `${HEAD_URL}/wmsservice/api/BasicConfig/queryChild`;
// 新增主体、采购单状态项列表
export const ADD_CHILD_LIST = `${HEAD_URL}/wmsservice/api/BasicConfig/addChild`;
// 删除主体、采购单状态项列表
export const DELETE_CHILD_LIST = `${HEAD_URL}/wmsservice/api/BasicConfig/deleteChild`;
