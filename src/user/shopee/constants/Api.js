// const HEAD_URL = '/mockjsdata/44';
const HEAD_URL = '';

//shopee授权列表
export const searchShopeeAccount = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/getShopeeAuthList";
//删除列表
export const delShopeeAccountAuth = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/deleteShopeeAuth";
//启用禁用
export const shopeeAuthorizationEnabledDisable = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/switchShopeeAuthState";
//新增/修改 授权
export const shopeeAddAuth = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/addOrModifyShopeeAuthList";
//查看详情
export const shopeeDetails = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/getShopeeAuthDetail";
//重新授权
export const shopeeUpdateAuth = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/shopeeupdateAuth";
// 获取站点
export const shopeeSiteList = HEAD_URL + '/oms/order/manage/motan/service/api/IOrderManageService/getShopeeSite'
// 操作日志获取
export const getShopeeAuthLog = HEAD_URL + '/oms/order/manage/motan/service/api/IOrderManageService/getShopeeAuthLog'