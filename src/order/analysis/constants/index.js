// export const MOCK_PATH = '/mockjsdata/3';
export const MOCK_PATH = '';

export const RECEIVE_ANALYSI_LIST = 'receive_analysi_list';

export const LOADING_RECORD_LIST = 'loading_record_list';

// 订单分析数据查询
export const GET_ORDER_STAT= `${MOCK_PATH}/oms/order/manage/motan/service/api/IOrderManageService/getOrderStat`;

// 账号
export const FINDSTORELISTPUBLIC = `${MOCK_PATH}/oms/order/manage/motan/service/api/IOrderManageService/getSellerIds`;

// 平台
export const GETPLATFORM = `${MOCK_PATH}/oms/order/manage/motan/ICompanyOrderManageApi/getPlatform`

export const PAYMENTTIME = [
    { code: 0, name: '今日' },
    { code: 1, name: '昨天' },
    { code: 2, name: '7日内' },
    { code: 3, name: '30日内' },
    { code: 4, name: '其他'}
];

export const LOGISTICS_TYPE = [
    { code: '', name: '全部' },
    { code: 'MFN', name: '自发货' },
    { code: 'AFN', name: 'FBA' },
];

export const Time_Zone_TYPE = [
    { code: 1, name: '北京时间' },
    { code: 2, name: '原时区时间' },
];
