/**
 * 作者: pzt
 * 描述: 公共接口地址
 * 时间: 2018/7/27 20:57
 **/
export const DEV_PATH = '';

// export const MOCK_PATH = '/mockjsdata/24';
export const MOCK_PATH = '';
export const MOCK_PATH_27 = 'http://192.168.201.211:9090/mockjsdata/27';

export const IMPORT_FILE_API = `/yks/file/server/` // 文件上传网关接口
export const PUBLISH_EBAYCLASS = `${DEV_PATH}/pls/ebay/motan/service/api/IEbayService/ebayClass`;  // eBay 分类 API
export const PUBLISH_GETCTGSPEC = `${DEV_PATH}/pls/ebay/motan/service/api/IEbayService/getCategorySpecifics`; // 最后一级ebay分类获取产品属性 API
export const PUBLISH_STORECLASS = `${DEV_PATH}/pls/ebay/motan/service/api/IEbayService/storeClass`; // 店铺分类 API
export const PUBLISH_EBAYACCOUNT= `${DEV_PATH}/pls/ebay/motan/service/api/IEbayService/ebayAccount`;  // eBay 销售账号 API
export const PUBLISH_EBAYSITE= `${DEV_PATH}/pls/ebay/motan/service/api/IEbayService/ebaySite`;  // eBay 站点 API
export const PUBLISH_SELLING_TAX= `${DEV_PATH}/pls/ebay/motan/service/api/IEbayService/sellingTime`;  // eBay 销售税 API
export const PUBLISH_PARCEL_TYPE= `${DEV_PATH}/pls/ebay/motan/service/api/IEbayService/parcelType`;  // eBay 包裹类型 API
export const PUBLISH_COUNTRIES= `${DEV_PATH}/pls/ebay/motan/service/api/IEbayService/Countries`;  // 国家 API
export const PUBLISH_TEMPLATES= `${DEV_PATH}/pls/ebay/motan/service/api/IEbayService/getPublishTemplDroplist`;  // eBay 刊登模板 API
export const PUBLISH_SELLINGTIME= `${DEV_PATH}/pls/ebay/motan/service/api/IEbayService/getListingSelectableDuration`;  // eBay 持续售卖时间 API
export const PUBLISH_ITEMCONDITION= `${DEV_PATH}/pls/ebay/motan/service/api/IEbayService/getSelectableCondition`;  // eBay Item condition API

export const PUBLISH_GETGALLERYLIST = `${DEV_PATH}/pls/ebay/motan/service/api/IEbayService/getGalleryList`;  // 图库 API

export const PUBLISH_PLATFORM = `${DEV_PATH}/listing/base/ext/IListingExtInfoService/query`;  // 平台查询
export const PUBLISH_SITE = `${DEV_PATH}/listing/base/ext/IListingExtInfoService/query`;  // 站点查询
export const PUBLISH_ACCOUNT= `${DEV_PATH}/listing/base/ext/IListingExtInfoService/query`;  // 账号查询查询
export const GE_RETURNS_WITHIN_OPTION_lIST= `${DEV_PATH}/pls/ebay/motan/service/api/IEbayService/geReturnsWithinOptionList`;  // 获取退货期限


export const GET_DESCRIPTION_TEMPLATE = `${MOCK_PATH}/pls/ebay/motan/service/api/IEbayService/getDescriptionTemplate`; //获取描述模板列表 API
export const GET_TRANSPORT_TEMPLATE = `${MOCK_PATH}/pls/ebay/motan/service/api/IEbayService/getTransportTemplate`; //获取运输模板列表 API
export const GET_RETURN_TEMPLATE = `${MOCK_PATH}/pls/ebay/motan/service/api/IEbayService/getReturnTemplate`; //获取退货模板列表 API
export const GET_PAYMENT_TEMPLATE = `${MOCK_PATH}/pls/ebay/motan/service/api/IEbayService/getPaymentTemplate`; //获取付款模板列表 API
export const GET_PUBLISH_TEMPLLIST = `${MOCK_PATH}/pls/ebay/motan/service/api/IEbayService/getPublishTemplList`; //获取刊登模板列表 API
// export const GET_AUTOPARTS_LIST = `${DEV_PATH}/pls/ebay/motan/service/api/IEbayService/getAutoPartsList`; //汽配档案列表 API
export const GET_AUTOPARTS_BY_CATEGORY = `${DEV_PATH}/pls/ebay/motan/service/api/IEbayService/getAutoPartsByCategory`; //汽配档案列表 API

export const GET_TEMPLATE_MATCH_DETAIL_API = '/pls/ebay/motan/service/api/IEbayService/getTemplMatchDetail';// 模板匹配规则详情