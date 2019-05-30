export const QUERY = "/listing/base/ext/IListingExtInfoService/query"
// const HEAD_URL = '/mockjsdata/24';
const HEAD_URL = '';

//获取自动补数列表
export const GET_AUTO_FIX_LIST = HEAD_URL + "/pls/ebay/motan/service/api/IEbayService/getAutoFixInventoryRuleList"
//获取自动补数详情
export const GET_AUTO_FIX_DETAIL = HEAD_URL + "/pls/ebay/motan/service/api/IEbayService/getAutoFixInventoryRuleDetail"
//添加或编辑自动补数
export const ADD_OR_UPDATE_AUTO_FIX = HEAD_URL + "/pls/ebay/motan/service/api/IEbayService/addOrUpdateAutoFixInventoryRule"
//删除自动补数
export const DELETE_AUTO_FIX = HEAD_URL + "/pls/ebay/motan/service/api/IEbayService/deleteAutoFixInventoryRule"

//获取资料更新列表
export const GET_UPDATE_LIST = HEAD_URL + "/pls/ebay/motan/service/api/IEbayService/getListingUpdateRuleList"
//获取资料更新详情
export const GET_UPDATE_DETAIL = HEAD_URL + "/pls/ebay/motan/service/api/IEbayService/getListingUpdateRuleDetail"
//添加或编辑资料更新
export const ADD_OR_UPDATE_LISTING = HEAD_URL + "/pls/ebay/motan/service/api/IEbayService/addOrUpdateListingUpdateRule"
//删除资料更新
export const DELETE_LISTING_UPDATE = HEAD_URL + "/pls/ebay/motan/service/api/IEbayService/deleteListingUpdateRule"

//批量复制记录
export const GET_COPY_LIST = HEAD_URL + "/pls/ebay/motan/service/api/IEbayService/getCpList"
//添加批量复制记录
export const ADD_COPY_LIST = HEAD_URL + "/pls/ebay/motan/service/api/IEbayService/addCp"

//获取所有平台
export const GET_YKS_PLATFORM = HEAD_URL + "/pls/ebay/motan/service/api/IEbayService/getYksPlatform"
//获取平台下的站点
export const GET_YKS_SITE = HEAD_URL + "/pls/ebay/motan/service/api/IEbayService/getYksSite"
//获取平台站点下的销售账号
export const GET_YKS_SELLERID = HEAD_URL + "/pls/ebay/motan/service/api/IEbayService/getYksSellerId"

//获取汽配档案列表
export const GET_PART_LIST = HEAD_URL + "/pls/ebay/motan/service/api/IEbayService/getAutoPartsList"
//删除汽配档案
export const DELETE_PART_LIST = HEAD_URL + "/pls/ebay/motan/service/api/IEbayService/deleteAutoParts"
//导入汽配档案
export const IMPORT_PART = HEAD_URL + "/pls/ebay/motan/service/api/IEbayService/importAutoParts"
//获取汽配档案导入/采集状态
export const GET_PART_IMPORT_STATUS = HEAD_URL + "/pls/ebay/motan/service/api/IEbayService/getAutoPartsImportStatus"
//采集汽配档案
export const GRAP_PART = HEAD_URL + "/pls/ebay/motan/service/api/IEbayService/grabAutoParts"

//获取ebay分类
export const GET_EBAY_CLASS = HEAD_URL + "/pls/ebay/motan/service/api/IEbayService/ebayClass"
//获取ebay站点
export const GET_EBAY_SITE = HEAD_URL + "/pls/ebay/motan/service/api/IEbayService/ebaySite"
//获取ebay销售账号
export const GET_EBAY_ACCOUNT = HEAD_URL + "/pls/ebay/motan/service/api/IEbayService/ebayAccount"

export const UPLOAD_FILE = HEAD_URL + "/yks/file/server/"

