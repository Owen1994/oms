export const ORDER_TYPE = [
    { 'code': -1, 'name': '全部' },
    { 'code': 0, 'name': '线上订单' },
    { 'code': 1, 'name': '手工订单' }
];  //创建类型，不传 全部，0线上订单，1 手工订单

export const DELIVERY_TYPE = [
    { 'code': -1, 'name': '全部' },
    { 'code': 0, 'name': '平台发货' },
    { 'code': 2, 'name': '线下渠道' },
    { 'code': 1, 'name': '线上渠道' },
];  //	发货类型：不传 全部，0 平台发货，2 线下渠道，1 线上渠道
