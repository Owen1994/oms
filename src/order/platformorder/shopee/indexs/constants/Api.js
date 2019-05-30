// const HEAD_URL = '/mockjsdata/44';
const HEAD_URL = '';

//获取shopee订单列表
export const GET_SHOPEE_ORDER_LIST = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/getShopeeOrderList";
//获取shopee tab页签状态
export const GET_SHOPEE_TAB_STATE = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/getShopeeTabState";
//标记单个订单
export const SHOPEE_MARK_ORDER = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/markShopeeTrackingNumber";
//订单抓取-提交抓取请求
export const SUBMIT_SHOPEE_GRAB = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/grapShopeeOrder";
//同步订单
export const SUBMIT_SHOPEE_SYNC = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/asyncShopeeOrder";
//获取shopee物流渠道
export const GET_SHOPEE_SHIPPING_PROVIDER = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/getShopeeLogisticsChannel";
//获取shopee平台销售账号
export const SEARCH_SHOPEE_ACCOUNT = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/getShopeeAccount";
//获取shopee站点
export const GET_SHOPEE_SITE = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/getShopeeSite";

