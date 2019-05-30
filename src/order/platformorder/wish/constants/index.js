export const RECEIVE_WISHORDER_LIST = 'receive_wishorder_list'
export const LOADING_WISHORDER_LIST = 'loading_wishorder_list'
export const RECEIVE_WISHORDER_DETAIL = 'receive_wishorder_detail'
export const RECEIVE_WISHORDER_TAB_STATE = 'receive_wishorder_tab_state'
export const RECEIVE_WISHORDER_TAG_STATE = 'receive_wishorder_tag_state'

export const ORDER_TYPE = [
    {'code': -1, 'name': '全部'}, 
    {'code': 0, 'name': '线上订单'}, 
    {'code': 1, 'name': '手工订单'}
];  //创建类型，-1或空-全部，0-线上订单，1-手工订单
export const ONLINE_STATE = [
    {'code': 0, 'name': '全部'}, 
    {'code': 1, 'name': '已上网'}, 
    {'code': 2, 'name': '未上网'}, 
    {'code': 3, 'name': '已妥投'}
];  //上网信息，0或空-全部，1-已上网，2-未上网,3-已妥投
export const SEARCH_TYPE = [
    {'code': 1, 'name': '平台订单号'}, 
    {'code': 2, 'name': '销售账号'}, 
    {'code': 3, 'name': '交易号'},
    {'code': 4, 'name': '跟踪号'},
    {'code': 5, 'name': '平台SKU'}
];  //搜索类型，1-平台订单号，2-销售账号，3-交易号，4-跟踪号，5-平台SKU