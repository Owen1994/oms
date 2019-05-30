/**
 * 指渠道异常规则接口
 */
const MOCK = '';    // /mockjsdata/3
export const GET_LIST = `${MOCK}/oms/order/manage/motan/service/api/IOrderManageService/getChannelExceptionRuleList`; // 获取渠道异常规则列表
export const ADD_OR_RULE = `${MOCK}/oms/order/manage/motan/service/api/IOrderManageService/addOrUpdateChannelExceptionRule`; // 新增/编辑
export const DELETE_RULE = `${MOCK}/oms/order/manage/motan/service/api/IOrderManageService/deleteChannelExceptionRule`; // 删除
export const GET_CONFIG_DETAIL = `${MOCK}/oms/order/manage/motan/service/api/IOrderManageService/getChannelExceptionRuleDetail`; // 获取渠道异常配置详情
export const GET_ACTION = `${MOCK}/oms/order/manage/motan/service/api/IOrderManageService/getChannelExceptionAction`;  // 获取渠道异常拦截动作定义
export const GET_PLATFORM_LIST = `/oms/order/manage/motan/ICompanyOrderManageApi/getPlatform`;  // 获取平台列表

export const GET_PACKAGE_WAREHOUSE_DELIVER = '/oms/order/manage/motan/IPackageApi/getPackageWarehouseDeliver'; // 发货仓库
export const GET_SKU_PREFIX_SUFFIX = '/oms/order/grab/motan/OrderGrabConfigApi/getRuleSkuConvertList'; // SKU前后缀
export const GET_CHANNEL = '/oms/order/manage/motan/CommonBasicsDataApi/queryChannelData'; // SKU前后缀
