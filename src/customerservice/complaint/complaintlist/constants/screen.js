export const DISPUTE_TYPE = [
    { code: 0, name: '全部', field: '' },
    { code: 1, name: '待处理', field: 'pendingNumber' },
    { code: 2, name: '已联系', field: 'contactedNumber' },
    { code: 3, name: '处理中', field: 'handleingNumber' },
    { code: 4, name: '纠纷取消', field: 'cancelNumber' },
    { code: 5, name: '纠纷完结(所有)', field: 'endAllNumber' },
    { code: 6, name: '纠纷完结(需登记退款)', field: 'endRegisterNumber' },
    { code: 7, name: '纠纷完结(平台退款)', field: 'endPlatformNumber' },
];

export const COMMENT_TYPE = [
    { code: 0, name: '全部' },
    { code: 1, name: '好评' },
    { code: 2, name: '中评' },
    { code: 3, name: '差评' },
];

export const COMMENT_STATUS = [
    // { code: 0, name: '全部', num: 0 },
    { code: 1, name: '待回复', field: 'pendingReplyNumber' },
    { code: 2, name: '待卖家评价', field: 'pendingLeaveNumber' },
    { code: 3, name: '已回复', field: 'replyedNumber' },
    { code: 4, name: '已过期', field: 'overdueNumber' },
];

export const AFTER_SALE_TREASURE = [
    { code: 0, name: '不排除' },
    { code: 1, name: '排除' },
    { code: 2, name: '仅显示售后宝' },
];
