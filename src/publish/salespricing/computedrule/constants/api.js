const preurl = '/pls/pricing/motan/service/api/IPricingService/';
// const preurl = '/mockjsdata/32/pls/pricing/motan/service/api/IPricingService/';
const commonPreUrl = '/listing/base/ext/IListingExtInfoService/query';
// const commonPreUrl = '/mockjsdata/32/listing/base/ext/IListingExtInfoService/query';

// 获取平台/站点
export const COMMON_QUERY = `${commonPreUrl}`;

// 获取规则列表
export const GET_DOMESTIC_LIST = `${preurl}getDomesticList`;

// 获取币种
export const GET_CURRENCY = `${preurl}getCurrency`;

// 获取发货仓库
export const GET_WAREHOUSE_INFO = `${preurl}getWarehouseInfo`;

// 获取发货渠道
export const GET_CHANNEL_INFO = `${preurl}getChannelInfo`;

// 获取发往国家目的地
export const GET_COUNTRY_INFO = `${preurl}getCountryInfo`;

// 售价计算-新增/修改
export const EDIT_DOMESTIC = `${preurl}editDomestic`;

// 售价计算-编辑/查看
export const GET_DOMESTIC_DETAIL = `${preurl}getDomesticDetail`;

// 售价计算-删除
export const DELETE_DOMESTIC = `${preurl}deleteDomestic`;

// 售价计算-获取日志
export const GET_DOMESTIC_LOGS = `${preurl}getDomesticLog`;
