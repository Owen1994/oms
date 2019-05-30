/**
 * 放置本模块所用常量
 */
const HEAD_URL = '';    //   /mockjsdata/45

//获取mymall订单列表
export const GET_ORDER_LIST = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/getMymallOrderList";
//获取TAB页签数据
export const GET_TAB_STATE = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/getMymallTabState";
//订单抓取
export const GRAP_ORDER = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/grapMymallOrder";
//标记跟踪号
export const MARK_TRACKING_NUMBER = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/markMymallTrackingNumber";
//同步订单
export const ASYNC_ORDER = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/syncMymallOrder";
//获取Mymall物流渠道
export const GET_LOGISTICS_CHANNEL = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/getMymallLogisticsChannel";
//获取Mymall销售账号
export const GET_SELLER_ACCOUNT = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/getMymallAccount";
//订单导出
export const EXPORT_MYMALL_ORDER = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/exportMyMallOrder";
