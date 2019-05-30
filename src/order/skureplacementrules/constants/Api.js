/**
 * 指定SKU替换规则接口
 */
const MOCK = '';
export const GET_LIST = `${MOCK}/oms/order/manage/motan/ICompanyOrderManageApi/selectRuleOrderSkuReplaceList`; // 获取SKU替换规则列表
export const ADD_RULE = `${MOCK}/oms/order/manage/motan/ICompanyOrderManageApi//insertRuleOrderSkuReplace`; // 新增
export const UPDATE_RULE = `${MOCK}/oms/order/manage/motan/ICompanyOrderManageApi//updateRuleOrderSkuReplace`; // 编辑
export const DELETE_RULE = `${MOCK}/oms/order/manage/motan/ICompanyOrderManageApi/deleteRuleOrderSkuReplace`; // 删除
export const GET_ACCOUNT_BY_PLATFORM = `${MOCK}/oms/order/manage/motan/service/api/IOrderManageService/getSellerIdByPlatform`; // 根据平台获取销售账号
export const GET_PLATFORM_LIST = `/oms/order/manage/motan/ICompanyOrderManageApi/getPlatform`;  // 获取平台列表
export const GET_DETAIL = '/oms/order/manage/motan/ICompanyOrderManageApi//getRuleOrderSkuReplaceDetail';    //获取详情
