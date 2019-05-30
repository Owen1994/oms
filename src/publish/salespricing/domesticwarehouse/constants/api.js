const preurl = '/pls/pricing/motan/service/api/IPricingService/';
// const preurl = '/mockjsdata/32/pls/pricing/motan/service/api/IPricingService/';
const commonPreUrl = '/listing/base/ext/IListingExtInfoService/query';
// const commonPreUrl = '/mockjsdata/32/listing/base/ext/IListingExtInfoService/query';

// 获取平台
export const GET_PLATFORM = `${commonPreUrl}`;

// 获取利润率
export const GET_PROFIT_RATE = `${preurl}getProfitRate`;

// 获取售价计算规则
export const GET_RULES = `${preurl}getDomesticInfo`;

// 查询结果
export const QUERY_RESULT = `${preurl}queryDomestic`;

// 计算
export const SUBMIT_DOMESTIC = `${preurl}submitDomestic`;

// 查询表单初始状态
export const GET_DOMESTIC_STATE = `${preurl}getDomesticState`;

// 修改单条数据
export const MODIFY_SINGLE = `${preurl}pricingDomesticSingle`;

// 导入
export const IMPORT_FILE = `${preurl}importFile`;

// 导出
export const EXPORT_PRICING = `${preurl}exportPricing`;
