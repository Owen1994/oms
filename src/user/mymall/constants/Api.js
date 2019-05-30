const HEAD_URL = '';    //  /mockjsdata/45

//获取Mymall授权列表
export const GET_MYMALL_AUTH_LIST = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/getMymallAuthList";
//新增授权/修改
export const ADD_OR_MODIFY_AUTH = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/addOrModifyMymallAuthList";
//获取授权修改信息
export const GET_MODIFY_DETAIL = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/getMymallAuthModifyDetail";
//切换授权状态
export const SWITH_AUTH_STATE = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/switchMymallAuthState";
//更新授权
export const UPDATE_AUTH = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/updateMymallAuth";
//删除
export const DELETE_AUTH = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/deleteMymallAuth";
