const HEAD_URL = '';        //      /mockjsdata/3

//获取平台列表
export const GET_PLATFORM = "/oms/order/manage/motan/ICompanyOrderManageApi/getPlatform";
//获取订单审单规则列表
export const GET_ORDER_AUDIT_RULE_LIST = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/getOrderAuditRuleList";
//获取审单规则详情
export const GET_ORDER_AUDIT_RULE_DETAIL = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/getOrderAuditRuleDetail";
//删除
export const DELETE_ORDER_AUDIT_RULE = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/deleteOrderAuditRule";
//获取流程规则定义
export const GET_PROCESS_RULE_DEFINITION = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/getProcessRuleDefinition";
//新增或编辑订单审核规则
export const ADD_OR_UPDATE_ORDER_AUDIT_RULE = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/addOrUpdateOrderAuditRule";
//获取wish平台订单状态下拉列表
export const GET_WISH_ORDER_STATUS_LIST = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/getWishOrderStatusList";
//获取wish平台销售账号,分页
export const SEARCH_WISH_ACCOUNT = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/searchWishAccount";
//启用禁用
export const CHECK_RULES_ENABLED_DISABLE = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/setOrderAuditRuleEnabled";