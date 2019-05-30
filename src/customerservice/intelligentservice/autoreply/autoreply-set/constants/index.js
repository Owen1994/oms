export const RECEIVE_LIST = 'receive_list';
export const RECEIVE_DETAIL = 'receive_detail';
export const RECEIVE_EBAYORDER_TAB_STATE = 'receive_ebayorder_tab_state';

export const ruleState = [
    { code: -1, name: '全部' },
    { code: 1, name: '启用' },
    { code: 0, name: '停用' },
]; // 规则状态ID,1:启用，0：停用

// 物流板块 可选条件
export const logisticsPlate = {
    packageState: '包裹状态',
    providerChannel: '物流服务商及渠道',
    shopAccount: '卖家账号',
    shippingMethod: '邮寄方式',
    traceState: '轨迹状态',
    warehouse: '仓库仓别',
    trajectoryState: '轨迹状态',
};

export const sendTypeData = [
    { key: 1, label: '站内信' },
    { key: 2, label: '邮件' },
];
