// export const MOCK_PATH = '/mockjsdata/3';
export const MOCK_PATH = '';

export const GET_PLATFORM = '/oms/order/manage/motan/ICompanyOrderManageApi/getPlatform'; // 销售平台
export const GET_EXCEPTION_PACKAGE_COUNT = `/oms/order/manage/motan/service/api/IOrderManageService/getExceptionPackageCount`; //接口获取待审核类型及数量
export const FIND_STORELIST_PUBLIC = '/oms/order/manage/motan/service/api/IOrderManageService/getSellerIds'; //销售账号
export const QUERY_CHANNEL_DATA = '/oms/order/manage/motan/CommonBasicsDataApi/queryChannelData'; // 物流渠道
export const EXAMINE_DEFICIT_PACKAGE = '/oms/order/manage/motan/IPackageApi/examineDeficitPackage'; // 批量审核
export const TRIAL_SHIPPING = '/oms/order/manage/motan/ICompanyOrderManageApi/trialShipping'; // 选择渠道
export const ROLLOVER_PACKAGE = '/oms/order/manage/motan/IPackageApi/rolloverPackage'; //撤单 
export const GET_CHANNEL_CODES_BYPLAT_FORMAND_WAREHOUSE = '/oms/order/manage/motan/IPackageApi/getChannelCodesByPlatformAndWarehouse' // 渠道
export const GETDEFICIT_PACKAGE_LIST = '/oms/order/manage/motan/IPackageApi/getDeficitPackageList' // 待审核包裹

export const GET_PACKAGE_WAREHOUSE_DELIVER = '/oms/order/manage/motan/IPackageApi/getPackageWarehouseDeliver'; // 发货仓库
export const QUERY_COUNTRL_DATA = '/oms/order/manage/motan/CommonBasicsDataApi/queryCountrlData'; // 国家全称
export const GET_FREIGHT_TRIAL = `${MOCK_PATH}/oms/order/manage/motan/IPackageApi/getFreightTrial`; // 运费试算列表
export const EXPORT_ORDER = `${MOCK_PATH}/oms/order/manage/motan/IPackageApi/exportDeficitOrder`;

export const PLATFORM_LINK = {
    'ebay': '/order/platformorder/ebay/detail/?platformNumber=',
    // 'wish': '/order/platformorder/wish/detail/', // wish订单详情页为弹窗，不做跳转
    '亚马逊': '/order/platformorder/amazon/detail/?orderNumber=',
    '速卖通': '/order/platformorder/smt/smtorderdetail/?platformNumber=',
    'shopee': '/order/platformorder/shopee/detail/?orderNumber=',
    // 'joom': '/order/platformorder/joom/detail/', // joom订单在待审核包裹里显示的是交易号而非平台单号，一个交易号对应多条订单数据，无法跳转
    // 'mall_my': '/order/platformorder/mymall/detail/?platformOrderNumber=',   // mymall在待审核包裹显示的也是交易号，不做跳转
    // 其他平台待添加
};

export const revokeTypeArr = [
    { value: '1', name: '客服撤单' },
    { value: '2', name: '渠道变更'},
    { value: '3', name: '买家信息变更'},
    { value: '4', name: 'SKU变更' },
    { value: '5', name: 'SKU缺货'},
    { value: '6', name: '超期订单'},
    { value: '7', name: '重量超出渠道限制' },
    { value: '8', name: '亏本撤单'},
    { value: '9', name: '黑名单撤单'},
    { value: '10', name: '无渠道' },
    { value: '11', name: '平台撤单'},
    { value: '12', name: '转仓撤单'},
    { value: '13', name: 'SKU下架' },
    { value: '14', name: '其它'},
]