// 定价 & 利润核算模块API
// const MOCK = "/mockjsdata/32";
const MOCK = "";
export const SUBMIT_PRICING = `${MOCK}/pls/pricing/motan/service/api/IPricingService/submitPricing`;        // 提交定价计算
export const GET_PRICING_STATE = `${MOCK}/pls/pricing/motan/service/api/IPricingService/getPricingState`;   // 查询定价计算状态
export const GET_PRICING_RESULT = `${MOCK}/pls/pricing/motan/service/api/IPricingService/getPricingDetail`;  // 查询定价计算结果
export const PRICING_SINGLE = `${MOCK}/pls/pricing/motan/service/api/IPricingService/pricingSingle`;         // 单条定价计算
export const PRICING_RESULT_EXPORT = `${MOCK}/pls/pricing/motan/service/api/IPricingService/export`;         // 定价计算结果导出
export const GET_PLATFORM = `${MOCK}/pls/pricing/motan/service/api/IPricingService/getPlatform`;            // 获取平台下拉列表数据
export const GET_SITE = `${MOCK}/pls/pricing/motan/service/api/IPricingService/getSite`;                    // 获取站点下拉列表数据
export const GET_SHIPMENTPORT = `${MOCK}/pls/pricing/motan/service/api/IPricingService/getShipmentPort`;    // 获取起运港下拉列表数据
export const GET_TRANSPORT = `${MOCK}/pls/pricing/motan/service/api/IPricingService/getTransport`;        // 获取运输方式下拉列表数据
export const GET_DEPOT = `${MOCK}/pls/pricing/motan/service/api/IPricingService/getDepot`;                // 获取目的仓下拉列表数据
export const GET_DESTINATION = `${MOCK}/pls/pricing/motan/service/api/IPricingService/getDestination`;    // 获取目的地下拉列表数据
export const GET_CURRENCY = `${MOCK}/pls/pricing/motan/service/api/IPricingService/getCurrency`;         // 获取币种下拉列表数据
