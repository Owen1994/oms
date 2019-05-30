/**
 * 作者: pzt
 * 描述: listing 列表页API
 * 时间: 2018/7/27 20:57
 **/
const MOCK_PATH = 'http://192.168.201.211:9090/mockjsdata/24';
const DEV_PATH = '';
const GET_CHECK_LISTING_LIST = `${DEV_PATH}/pls/ebay/motan/service/api/IEbayService/getListingList`;  // 检测listing 列表 重复 API
const GET_LISTING_LIST = `${DEV_PATH}/pls/ebay/motan/service/api/IEbayService/getListingList`;  // listing 列表 API
const TABLE_BTN_ACTION = `${DEV_PATH}/pls/ebay/motan/service/api/IEbayService/options`;  // 表格按钮操作 API
const GET_LISTING_LOG = `${DEV_PATH}/pls/ebay/motan/service/api/IEbayService/getListingLog`;  // 日志 API
const GET_LISTING_STATE = `${DEV_PATH}/pls/ebay/motan/service/api/IEbayService/getListingState`;  // listing状态 API
const EDIT_PRICE = `${DEV_PATH}/pls/ebay/motan/service/api/IEbayService/editPrice`;  // 修改价格/批量修改价格 API
const EDIT_STOCK = `${DEV_PATH}/pls/ebay/motan/service/api/IEbayService/editStock`;  // 修改库存/批量修改库存 API

const EBAY_ACCOUNT_API = `${DEV_PATH}/pls/ebay/motan/service/api/IEbayService/ebayAccount`; // ebay销售账号获取
const PUBLISH_TEMPL_LIST_API = `${DEV_PATH}/pls/ebay/motan/service/api/IEbayService/getPublishTemplList`; //刊登模板列表
const PUBLISH_TEMPL_LIST_API_BY_ACCOUNT = `${DEV_PATH}/pls/ebay/motan/service/api/IEbayService/getPublishTemplDroplist`//获取某个账号的刊登模板
const ADDCP_API = '/pls/ebay/motan/service/api/IEbayService/addCp'
const EBAY_SITE = '/pls/ebay/motan/service/api/IEbayService/ebaySite'
const SYNC_PLATFORM = '/pls/ebay/motan/service/api/IEbayService/syncPlatformDatas';
const NUNBER_OF_SEARCH = '/pls/ebay/motan/service/api/IEbayService/getSoldOutCount';
const AUTOADJUST = '/pls/pricing/motan/service/api/IPricingService/autoAdjust';


export default {
    GET_CHECK_LISTING_LIST,
    GET_LISTING_LIST,
    TABLE_BTN_ACTION,
    GET_LISTING_LOG,
    GET_LISTING_STATE,
    EDIT_PRICE,
    EDIT_STOCK,
    EBAY_ACCOUNT_API,
    PUBLISH_TEMPL_LIST_API,
    ADDCP_API,
    PUBLISH_TEMPL_LIST_API_BY_ACCOUNT,
    EBAY_SITE,
    SYNC_PLATFORM,
    NUNBER_OF_SEARCH,
    AUTOADJUST
}