/**
 * 作者: pzt
 * 描述: listing 详情页 API
 * 时间: 2018/7/27 20:57
 **/
export const MOCK_PATH = '/mockjsdata/24';
export const DEV_PATH = '';
export const GET_LISTING_DETAIL = `${DEV_PATH}/pls/ebay/motan/service/api/IEbayService/getListingDetail`;  // listing 获取详情 API
export const LISTING_DETAIL_ADD_AND_EDIT = `${DEV_PATH}/pls/ebay/motan/service/api/IEbayService/listingEdit`;  // listing 新增 修改 API
export const LISTING_DETAIL_LOADING_SKU = `${DEV_PATH}/pls/ebay/motan/service/api/IEbayService/loadingSku`;  // 详情页 加载SKU资料 API
export const LISTING_DETAIL_SKU_ISEXIST = `${DEV_PATH}/pls/ebay/motan/service/api/IEbayService/skuIsExist`;  // 详情页 SKU判重 API
export const LISTING_DETAIL_SEARCH_CLASS = `${DEV_PATH}/pls/ebay/motan/service/api/IEbayService/searchClass`;  // 详情页 分类搜索 API

export const GET_DESCRIPTION_TEMP = `${DEV_PATH}/pls/ebay/motan/service/api/IEbayService/getDescriptionTemplate`; // 详情页 运输模板 API
export const GET_SHIPPING_PROFILE_DETAIL = `${DEV_PATH}/pls/ebay/motan/service/api/IEbayService/getShippingProfileDetail`;  // 获取运输模板详情
export const GET_TRANSPORT_TEMP = `${DEV_PATH}/pls/ebay/motan/service/api/IEbayService/getTransportTemplate`; // 详情页 运输模板 API
export const GET_RETURN_TEMP = `${DEV_PATH}/pls/ebay/motan/service/api/IEbayService/getReturnTemplate`; // 详情页 退货模板 API
export const GET_PAYMENT_TEMP = `${DEV_PATH}/pls/ebay/motan/service/api/IEbayService/getPaymentTemplate`; // 详情页 付款模板 API
export const GET_PUBLISH_TEMP_DETAIL = `${DEV_PATH}/pls/ebay/motan/service/api/IEbayService/getPublishTemplDetail`; // 基本资料页获取刊登模板详情
export const GET_PUBLISH_TEMP_DROPLIST = `${DEV_PATH}/pls/ebay/motan/service/api/IEbayService/getPublishTemplDroplist`; // 获取某个销售账号的刊登模板
export const CHANGE_MAINSPECIFIC = `${DEV_PATH}/pls/ebay/motan/service/api/IEbayService/onChangeMainSpecific`; // 获取某个销售账号的刊登模板
export const GET_GALLERYLIST = `${DEV_PATH}/pls/ebay/motan/service/api/IEbayService/getImg`; // 图库获取图片
export const GET_CALCUL_VAR_LISTING = `${DEV_PATH}/pls/pricing/motan/service/api/IPricingService/calculVariationListing`; // 多属性listing计算价格
export const GET_CALCUL_LISTING = `${DEV_PATH}/pls/pricing/motan/service/api/IPricingService/calculListing`; // 单条listing计算价格
export const GET_DOMESTIC_LIST = `${DEV_PATH}/pls/pricing/motan/service/api/IPricingService/getDomesticInfo`; // 获取售价计算规则列表
export const GET_PROFIT_RATE = `${DEV_PATH}/pls/pricing/motan/service/api/IPricingService/getProfitRate`; // 获取利润率
