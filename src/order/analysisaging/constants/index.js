// export const MOCK_PATH = '/mockjsdata/3';
export const MOCK_PATH = '';

export const RECEIVE_LIST = 'receive_list';

export const LOADING_LIST = 'loading_list';

// 平台维度
export const GET_LIST_BY_PLAT = `${MOCK_PATH}/oms/order/manage/motan/service/api/IOrderManageService/platOrderTimeStat`;

// 订单维度
export const GET_LIST_BY_ORDER = `${MOCK_PATH}/oms/order/manage/motan/service/api/IOrderManageService/orderTimeStat`;

// 账号维度
export const GET_LIST_BY_ACCOUNT = `${MOCK_PATH}/oms/order/manage/motan/service/api/IOrderManageService/accountOrderTimeStat`;

// 销售平台
export const GET_PLATFORMS = `${MOCK_PATH}/oms/order/manage/motan/ICompanyOrderManageApi/getPlatform`;

// 销售账号
export const GET_ACCOUNTS = `${MOCK_PATH}/oms/order/manage/motan/service/api/IOrderManageService/getSellerIds`

// 数据导出
export const EXPORT_DATA = `${MOCK_PATH}/oms/order/manage/motan/service/api/IOrderManageService/exportAgingData`

// 平台弹窗
export const PLAT_DETAIL = `${MOCK_PATH}/oms/order/manage/motan/service/api/IOrderManageService/platTimeDetail`

// 订单弹窗
export const ORDER_DETAIL = `${MOCK_PATH}/oms/order/manage/motan/service/api/IOrderManageService/omsTimeDetail`

// 包裹弹窗
export const PACKAGE_DETAIL = `${MOCK_PATH}/oms/order/manage/motan/service/api/IOrderManageService/packageTimeDetail`

export const GRAB_TIME = [
    { code: 0, name: '今日' },
    { code: 1, name: '昨天' },
    { code: 2, name: '7日内' },
    { code: 3, name: '30日内' },
    { code: 4, name: '其他' },
];

// export const Time_Zone_TYPE = [
//     { code: 1, name: '北京时间' },
//     { code: 2, name: '原时区时间' },
// ];

export const dimensionalityArr = [
    {id: 'plat', text: '按平台'},
    {id: 'account', text: '按账号'},
    {id: 'order', text: '按订单'},
]
