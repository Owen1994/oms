// export const GETTYPE = '/oms/order/manage/motan/ICompanyOrderManageApi/getType';
export const GET_PACKAGE_STATE_SELECT = '/oms/order/manage/motan/IPackageApi/getPackageStateSelect'; // 分仓状态
export const GET_PACKAGE_WAREHOUSE_DELIVER = '/oms/order/manage/motan/IPackageApi/getPackageWarehouseDeliver'; // 发货仓库
export const GET_PLATFORM = '/oms/order/manage/motan/ICompanyOrderManageApi/getPlatform'; // 销售平台
export const QUERY_CHANNEL_DATA = '/oms/order/manage/motan/CommonBasicsDataApi/queryChannelData'; // 物流渠道
export const GET_PACKAGE_STATUS_LIST = '/oms/order/manage/motan/IOrderManageConfigApi/getPackageStatusList'; // 老ERP状态
export const FIND_STORE_LIST_PUBLIC = '/oms/order/manage/motan/service/api/IOrderManageService/getSellerIds'; // 销售账号
export const QUERY_COUNTRL_DATA = '/oms/order/manage/motan/CommonBasicsDataApi/queryCountrlData'; // 国家全称
export const REVOKE_PACKAGE = '/oms/order/manage/motan/IPackageApi/revokePackage'; // 撤单
export const GETPACKAGE_LIST = '/oms/order/manage/motan/IPackageApi/getPackageList'; // 全部包裹列表数据
export const CANCEL_PACKAGE = '/oms/order/manage/motan/IPackageApi/cancelPackage'; // 撤销订单
export const RECOVER_PACKAGE = '/oms/order/manage/motan/IPackageApi/recoverPackage'; //恢复订单
export const TRIAL_SHIPPING = '/oms/order/manage/motan/ICompanyOrderManageApi/trialShipping'; 
export const ROLLOVER_PACKAGE = '/oms/order/manage/motan/IPackageApi/rolloverPackage';
export const EXPORT_ORDER = '/oms/order/manage/motan/IPackageApi/exportOrder'; //全部包裹导出
export const GETCHANNEL_CODES_BYPLAT_FORMANDWAREHOUSE = '/oms/order/manage/motan/IPackageApi/getChannelCodesByPlatformAndWarehouse'; // 渠道
export const EXAMINE_DEFICIT_PACKAGE = '/oms/order/manage/motan/IPackageApi/examineDeficitPackage'; // 待审核订单的审核接口
export const REGET_PACKAGE_CHANNEL = `/oms/order/manage/motan/service/api/IOrderManageService/regetPackageChannel` // 重新创建/批量重新创建

export const BATCH_REVOKE = '/oms/order/manage/motan/IPackageApi/batchCancelPackage';

/*订单来源*/
export const ORDER_SOURCE =  [
    { name: '全部', code: '' },
    { name: '线上订单', code: 0 },
    { name: '手工订单', code: 1 },
    { name: '批发订单', code: 2 }
]
/*是否负利润*/
export const NEGATIVE_PROFIT = [
    { name: '全部', code: '' },
    { name: '否', code: 0 },
    { name: '是', code: 1 }
]
/*是否偏远*/
export const IS_REMOTE =  [
    { name: '全部', code: '' },
    { name: '否', code: 0 },
    { name: '是', code: 1 }
]

// export const PLATFORM_NAME = [{id: '', name: '全部'}] // 销售平台
// export const LOGISTICS_BUSINESS = [{id: '', name: '全部'}] // 物流渠道