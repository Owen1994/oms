// export const MOCK_PATH = '/mockjsdata/3';
export const MOCK_PATH = '';

export const RECEIVE_ITEMID_LIST = 'receive_itemid_list';

export const LOADING_ITEMID_LIST = 'loading_itemid_list';

// itemID分析数据查询
export const GET_ITEMID_LIST = `${MOCK_PATH}/oms/order/manage/motan/service/api/IOrderManageService/getItemStat`;

// itemID分析数据导出
export const EXPORT_DATA = `${MOCK_PATH}/oms/order/manage/motan/service/api/IOrderManageService/itemStatExport`;

// 销售平台
export const GETPLATFORM = `${MOCK_PATH}/oms/order/manage/motan/ICompanyOrderManageApi/getPlatform`;

// 销售账号
export const FINDSTORELISTPUBLIC = `${MOCK_PATH}/oms/order/manage/motan/service/api/IOrderManageService/getSellerIds`

export const PAYMENTTIME = [
    { code: 0, name: '今日' },
    { code: 1, name: '昨天' },
    { code: 2, name: '7日内' },
    { code: 3, name: '30日内' },
    { code: 4, name: '其他' },
];

export const Time_Zone_TYPE = [
    { code: 1, name: '北京时间' },
    { code: 2, name: '原时区时间' },
];
