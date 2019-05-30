const HEAD_URL = '';    //  /mockjsdata/36

//获取ebay授权列表
export const GET_EBAY_ACCOUNT_LIST = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/searchEbayAccount";
//添加授权
export const ADD_EBAY_ACCOUNT = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/addAuth";
//删除ebay授权记录
export const DELETE_EBAY_AUTHORIZATION = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/delEbayAccountAuth";
//启用或禁用ebay授权记录
export const IF_ENABLE_EBAY_AUTHORIZATION = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/ebayAuthorizationEnabledDisable";
//更新ebay授权记录
export const UPDATE_EBAY_AUTHORIZATION = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/updateAuth";
//ebay账号查询
export const QUERY_EBAY_ACCOUNT = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/queryEbayAccount";
