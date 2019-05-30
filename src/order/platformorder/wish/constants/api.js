const HEAD_URL = '';    //   /mockjsdata/3
// const HEAD_URL = '/mockjsdata/3';    //


//获取wish订单列表
export const GET_WISH_ORDER_LIST = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/getWishOrderList";
//获取wish tab页签状态
export const GET_WISH_TAB_STATE = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/getWishTabState";
//获取对应Tab状态下的标记状态
export const GET_WISH_TAG_STATE = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/getWishTagState";
//标记单个订单
export const WISH_MARK_ORDER = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/wishMarkOrder";
//订单抓取-提交抓取请求
export const SUBMIT_WISH_GRAB = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/submitWishGrab";
//获取wish订单详情
export const GET_WISH_ORDER_DETAIL = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/getWishOrderDetail";
//同步订单
export const SUBMIT_WISH_SYNC = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/submitWishSync";
//获取wish物流渠道
export const GET_WISH_SHIPPING_PROVIDER = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/getWishShippingProviderList";
//获取wish平台销售账号
export const SEARCH_WISH_ACCOUNT = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/searchWishAccount";
//获取发货国
export const GET_COUNTRY = HEAD_URL + "/oms/order/manage/motan/CommonBasicsDataApi/getAllBaseCountry";
//获取详情日志
export const QUERY_LOG = HEAD_URL + "/oms/order/manage/motan/service/api/IOrderManageService/getWishOrderLog";
