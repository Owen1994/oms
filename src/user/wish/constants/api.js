const HEAD_URL = '';    //  /mockjsdata/3

//获取wish授权列表
export const GET_WISH_ACCOUNT_LIST = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/getWishAccountList";
//授权账号或修改
export const ADD_OR_EDIT_WISH_ACCOUNT = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/wishAccountAddOrEdit";
//删除wish授权记录
export const DELETE_WISH_AUTHORIZATION = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/wishAuthorizationDelete";
//启用或禁用wish授权记录
export const IF_ENABLE_WISH_AUTHORIZATION = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/wishAuthorizationEnabledDisable";
//更新wish授权记录
export const UPDATE_WISH_AUTHORIZATION = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/wishAuthorizationUpdate";
//获取授权账号详情
export const GET_WISH_ACCOUNT_DETAIL = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/getWishAccountDetail";
