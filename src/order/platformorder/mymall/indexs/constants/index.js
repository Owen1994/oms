export const RECEIVE_TABLE_LIST = 'receive_table_list';
export const LOADING_TABLE_LIST = 'loading_table_list';
export const RECEIVE_MYMALL_TAB_STATE = 'receive_mymall_tab_state';

// 创建类型
export const CREATE_TYPE = [
    {id: '', name: '全部'},
    {id: 0, name: '线上订单'},
    {id: 1, name: '手工订单'}
];

// 标记信息
export const MARK_INFO = [
    {id: '', name: '全部'},
    {id: 0, name: '待标记'},
    {id: 1, name: '标记中'},
    {id: 2, name: '标记失败'},
    {id: 3, name: '标记成功'}
];

// 发货类型
export const CARRIER_TYPE = [
    {'code': '', 'name': '全部'},
    {'code': 1, 'name': '线上渠道'},
    {'code': 2, 'name': '线下渠道'}
];

// 是否推送
export const IS_PUSHED = [
    {'code': '', 'name': '全部'},
    {'code': 0, 'name': '待推送'},
    {'code': 1, 'name': '推送成功'},
    {'code': 2, 'name': '已过滤'},
    {'code': 3, 'name': '推送失败'},
];