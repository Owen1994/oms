// 各费用模块API
// const MOCK = "/mockjsdata/32";
const MOCK = "";
export const GET_PLATFORM = `${MOCK}/pls/pricing/motan/service/api/IPricingService/getPlatform`;            // 获取平台下拉列表数据
export const GET_SITE = `${MOCK}/pls/pricing/motan/service/api/IPricingService/getSite`;            // 获取平台下拉列表数据
export const GET_SHIPMENTPORT = `${MOCK}/pls/pricing/motan/service/api/IPricingService/getShipmentPort`;    // 获取起运港下拉列表数据
export const GET_DEPOT = `${MOCK}/pls/pricing/motan/service/api/IPricingService/getDepot`;                // 获取目的仓下拉列表数据
export const GET_APPORTION_COST_LIST = `${MOCK}/pls/pricing/motan/service/api/IPricingService/getApportionCostList`;    // 获取分摊费用列表数据
export const GET_OPERATION_COST_LIST = `${MOCK}/pls/pricing/motan/service/api/IPricingService/getOperationCostList`;                // 获取运营费用列表数据
export const GET_LISTING_COST_LIST = `${MOCK}/pls/pricing/motan/service/api/IPricingService/getListingCostList`;                // 获取刊登费用列表数据
export const GET_TRANSPORT_COST_LIST = `${MOCK}/pls/pricing/motan/service/api/IPricingService/getTransportCostList`;                // 获取头程费用列表数据
export const IMPORT_DATA = `${MOCK}/pls/pricing/motan/service/api/IPricingService/importData`;                // 获取头程费用列表数据
export const GET_TRANSPORT_LOG = `${MOCK}/pls/pricing/motan/service/api/IPricingService/getTransportLog`;     // 获取头程费用日志数据
export const GET_LISTING_LOG = `${MOCK}/pls/pricing/motan/service/api/IPricingService/getListingLog`;       // 获取运营费用日志数据
export const GET_OPERATION_LOG = `${MOCK}/pls/pricing/motan/service/api/IPricingService/getOperationLog`;     // 获取刊登费用日志数据
export const GET_APPORTION_LOG = `${MOCK}/pls/pricing/motan/service/api/IPricingService/getApportionLog`;     // 获取分摊费用日志数据
export const EDIT_APPORTION_EXPENSE = `${MOCK}/pls/pricing/motan/service/api/IPricingService/editApportionExpense`;     // 修改分摊费用数据
export const EDIT_OPERATION_EXPENSE = `${MOCK}/pls/pricing/motan/service/api/IPricingService/editOperationExpense`;     // 修改运营费用数据
export const EDIT_LISTING_EXPENSE = `${MOCK}/pls/pricing/motan/service/api/IPricingService/editListingExpense`;     // 修改刊登费用数据
export const ADD_LISTING_EXPENSE = `${MOCK}/pls/pricing/motan/service/api/IPricingService/addListingCost`;     // 修改刊登费用数据
export const EDIT_TRANSPORT_EXPENSE = `${MOCK}/pls/pricing/motan/service/api/IPricingService/editTransportExpense`;     // 修改运输费用数据
export const DEL_APPORTION_COST = `${MOCK}/pls/pricing/motan/service/api/IPricingService/delApportionCost`;     // 删除分摊费用数据
export const DEL_OPERATION_COST = `${MOCK}/pls/pricing/motan/service/api/IPricingService/delOperationCost`;     // 删除运营费用数据
export const DEL_LISTING_COST = `${MOCK}/pls/pricing/motan/service/api/IPricingService/delListingCost`;     // 删除刊登费用数据
export const DEL_TRANSPORT_COST = `${MOCK}/pls/pricing/motan/service/api/IPricingService/delTransportCost`;     // 删除头程费用数据

