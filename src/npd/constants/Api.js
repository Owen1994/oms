export const HEAD_URL = ''; ///mockjsdata/18

// 新品项目流列表
export const PROJECT_FLOW_LIST_API = HEAD_URL + '/pim/motan/service/api/IPimService/getNpsProjectFlowList';
//新品项目流新增修改
export const PROJECT_ADDORUPDATE_LIST_API = HEAD_URL + '/pim/motan/service/api/IPimService/addOrUpdateNpsProjectFlow';
//新品项目流启用禁用
export const PROJECT_SWITCHNPS_LIST_API = HEAD_URL + '/pim/motan/service/api/IPimService/switchNpsProjectFlowState';


// 用户列表查询
export const USER_LIST_API = HEAD_URL + '/pim/motan/service/api/IPimService/getNpsUserList';
//用户列表新增、修改用户
export const USER_UPDATE_API = HEAD_URL + '/pim/motan/service/api/IPimService/addOrUpdateNpsUser';
//用户列表启用禁用
export const USER_SWITCHNPS_API = HEAD_URL + '/pim/motan/service/api/IPimService/switchNpsUserState';
//查询用户中心数据
export const ALL_USER_LIST_API = HEAD_URL + '/pim/motan/service/api/IPimService/fetchUserList';
//新增用户
// export const ADD_USER_API = HEAD_URL + '/pim/motan/service/api/IPimService/addNpsUser';


// 用户组列表查询
export const USER_GROUP_LIST_API = HEAD_URL + '/pim/motan/service/api/IPimService/getNpsUserGroupList';
//用户组新增修改
export const USER_GROUP_ADDORUPDATE_API = HEAD_URL + '/pim/motan/service/api/IPimService/addOrUpdateNpsUserGroup';


// 平台列表查询
export const PLATFORM_LIST_API = HEAD_URL + '/pim/motan/service/api/IPimService/getNpsPlatformList';
//平台列表新增修改
export const PLATFORM_ADDORUPDATE_API = HEAD_URL + '/pim/motan/service/api/IPimService/addOrUpdateNpsPlatform';


// 审核流列表查询
export const AUDIT_FLOW_API = HEAD_URL + '/pim/motan/service/api/IPimService/getNpsAuditFlowList';
//审核流修改、新建新品项目流列表
export const AUDIT_ADDORUPDATE_API = HEAD_URL + '/pim/motan/service/api/IPimService/addOrUpdateNpsAuditFlow';
//审核流启用禁用
export const AUDIT_SWITCHNPS_API = HEAD_URL + '/pim/motan/service/api/IPimService/switchNpsAuditFlowState';


// 意向供应商列表查询
export const INTENT_SUPPLIER_LIST_API = HEAD_URL + '/pim/motan/service/api/IPimService/getNpsIntentionSupplierList';
//意向供应商新增修改
export const INTENT_SUPPLIER_ADDORUPDATE_API = HEAD_URL + '/pim/motan/service/api/IPimService/addOrUpdateNpsIntentionSupplier';


// 仓库关系列表查询
export const WARE_HOUSE_LIST_API = HEAD_URL + '/pim/motan/service/api/IPimService/getNpsWarehouseList';
//仓库关系列表新增、修改
export const WARE_HOUSE_ADDORUPDATE_API = HEAD_URL + '/pim/motan/service/api/IPimService/addOrUpdateNpsWarehouse';
//仓库关系列表启用、禁用
export const WARE_HOUSE_SWITCHNPS_API = HEAD_URL + '/pim/motan/service/api/IPimService/switchNpsWarehouseState';

//附件上传
export const FILE_UPLOAD_API = HEAD_URL + '/pim/motan/service/api/IPimService/file/upload';
//附件修改删除
export const FILE_MODIFY_API = HEAD_URL + '/pim/motan/service/api/IPimService/file/modify';


// 获取商品分类
export const GET_PRODUCT_CATEGORY_API = "/pim/motan/service/api/IPimService/getCategoryList";

// 公共审核接口
export const AUDIT_API = HEAD_URL + '/pim/motan/service/api/IPimService/auditConfirmWithComment';

// 审核日志
export const AUDIT_LOGS_API = HEAD_URL + '/pim/motan/service/api/IPimService/getAuditHis';

//获取平台列表
export const GET_PLATFORM_LIST_API = '/yksplatform/api/?c=api-usercenter&a=getPlatformList';
// 附件上传
export const UPLOAD_FILE = '/yks/file/server'

//公共审核接口
export const CONFIRM_AUDIT_API = '/pim/motan/service/api/IPimService/auditConfirmWithComment';

//导出首单信息接口
export const EXPORT_FIRST_APPLY = '/pim/motan/service/api/IPimService/exportFirstOrderApplyDetail';