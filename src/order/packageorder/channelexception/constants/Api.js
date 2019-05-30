// const MOCK = '/mockjsdata/3';
const MOCK = '';

export const GET_LIST = `${MOCK}/oms/order/manage/motan/service/api/IOrderManageService/getChannelExceptionPackageList`;    // 获取渠道异常列表
export const GET_STATE = `${MOCK}/oms/order/manage/motan/service/api/IOrderManageService/getChannelObtainState`;    // 获取渠道获取状态及数量
export const GET_EXCEPTION_TYPE = `${MOCK}/oms/order/manage/motan/service/api/IOrderManageService/getChannelExceptionType`;    // 获取渠道异常类型及数量
export const REGET_PACKAGE_CHANNEL = `${MOCK}/oms/order/manage/motan/service/api/IOrderManageService/regetPackageChannel` // 重新创建/批量重新创建
export const EXPORT_LIST = `${MOCK}/oms/order/manage/motan/service/api/IOrderManageService/exportChannelExceptionPackage`;    // 导出渠道异常包裹

export const GET_PLATFORM = '/oms/order/manage/motan/ICompanyOrderManageApi/getPlatform'; // 销售平台
export const FIND_STORELIST_PUBLIC = '/oms/order/manage/motan/service/api/IOrderManageService/getSellerIds'; //销售账号
export const QUERY_CHANNEL_DATA = '/oms/order/manage/motan/CommonBasicsDataApi/queryChannelData'; // 物流渠道

export const TRIAL_SHIPPING = '/oms/order/manage/motan/ICompanyOrderManageApi/trialShipping'; // 选择渠道
export const ROLLOVER_PACKAGE = '/oms/order/manage/motan/IPackageApi/rolloverPackage'; //转仓
export const GET_CHANNEL_CODES_BYPLAT_FORMAND_WAREHOUSE = '/oms/order/manage/motan/IPackageApi/getChannelCodesByPlatformAndWarehouse' // 渠道
export const CANCEL_PACKAGE = '/oms/order/manage/motan/IPackageApi/cancelPackage' // 撤单
export const BATCH_CANCEL_PACKAGE = '/oms/order/manage/motan/IPackageApi/batchCancelPackage' // 批量撤单

export const EXAMINE_DEFICIT_PACKAGE = '/oms/order/manage/motan/IPackageApi/examineDeficitPackage'; // 批量审核
