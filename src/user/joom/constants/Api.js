// const HEAD_URL = '/mockjsdata/39';
const HEAD_URL = '';    

//Joom授权列表
export const searchJoomAccount = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/searchJoomAccount";
//删除列表
export const delJoomAccountAuth = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/delJoomAccountAuth";
//启用禁用
export const joomAuthorizationEnabledDisable = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/JoomAuthorizationEnabledDisable";
//新增授权
export const joomAddAuth = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/JoomAddAuth";
//查看详情
export const joomDetails = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/JoomDetails";
//重新授权
export const joomupdateAuth = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/JoomupdateAuth";
// 获取店铺账号
export const joomSellerId = HEAD_URL + '/oms/order/manage/motan/service/api/IOrderManageService/searchJoomSellerId';