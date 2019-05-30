const HEAD_URL = '';    //   /mockjsdata/36

//获取ebay订单列表
export const GET_EBAY_ORDER_LIST = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/searchEbayOrders";
//获取ebay tab页签状态
export const GET_EBAY_TAB_STATE = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/getEbayTabState";
//标记单个订单
export const EBAY_MARK_ORDER = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/ebayMarkTrackingNumber";
//订单抓取-提交抓取请求
export const SUBMIT_EBAY_GRAB = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/ebayOrderGrab";
//同步订单
export const SUBMIT_EBAY_SYNC = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/syncEbayOrder";
//获取ebay物流渠道
export const GET_EBAY_SHIPPING_PROVIDER = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/searchEbayShippingCarrier";
//获取ebay平台销售账号
export const SEARCH_EBAY_ACCOUNT = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/queryEbayAccount";
//获取ebay站点
export const GET_EBAY_SITE = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/getEbaySite";
//订单导出
export const EXPORT_EBAY_ORDER = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/exportEbayOrder";

