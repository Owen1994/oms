import { all } from '../../common/json';

export const RECEIVE_LIST = 'receive_list';
export const RECEIVE_DETAIL = 'receive_detail';
export const RECEIVE_EBAYORDER_TAB_STATE = 'receive_ebayorder_tab_state';

export const state = [
    { key: 'logistics', label: '物流' },
    { key: 'order', label: '订单' },
    { key: 'email', label: '邮件' },
    { key: 'comment', label: '中差评' },
    { key: 'issue', label: '纠纷' },
]; // 规则状态ID,1:启用，0：停用

// 物流板块 可选条件
export const selectable = {
    logistics: {
        packageState: '包裹状态',
        providerChannel: '物流渠道',
        sellerAccount: '卖家账号',
        shippingMethod: '邮寄方式',
        traceState: '轨迹状态',
        warehouse: '仓库仓别',
    },
};

// 发送状态
export const sendState = [
    all,
    { key: 0, label: '待发送' },
    { key: 2, label: '已发送' },
    { key: 1, label: '发送失败' },
];
// 发送方式
export const sendMode = [
    { key: 1, label: '站内信' },
    { key: 2, label: '邮件' },
];

export const searchTypeState = [
    { key: 1, label: '规则名称' },
    { key: 2, label: '内单号' },
    { key: 3, label: '平台订单号' },
    { key: 4, label: '订单跟踪码' },
];

// 开放板块
export const openPlate = ['logistics'];
