export const createTypeState = [
    {
        code: 0,
        name: "全部"
    }, {
        code: 1,
        name: "线上订单"
    }, {
        code: 2,
        name: "手工订单"
    },
]

export const commissionState = [
    {
        code: 0,
        name: "全部"
    }, {
        code: 1,
        name: "5%"
    }, {
        code: 2,
        name: "15%"
    },
]

export const orderStatus = [
    { "id": 1, "name": "全部订单", "num": 0 },
    { "id": 2, "name": "已批准", "num": 0 },
    { "id": 3, "name": "已发货", "num": 0 },
    { "id": 4, "name": "已退款", "num": 0 },
    { "id": 5, "name": "卖家取消订单", "num": 0 },
    { "id": 6, "name": "标记失败", "num": 0 }
]



export const orderStatus1 = [
    {
        id: 1,
        name: "已批准"
    }, {
        id: 2,
        name: "已发货"
    }, {
        id: 3,
        name: "已退款"
    }, {
        id: 4,
        name: "卖家取消订单"
    }, {
        id: 5,
        name: "线上已发货"
    },
    // 1：已批准 2：已发货 3：已退款 4：卖家取消订单

]
export const api = {
    // 订单抓取
    joomOrderGrabApi: '/oms/order/manage/motan/service/api/IOrderManageService/joomOrderGrab',
    // 获取店铺账号
    joomSellerId: '/oms/order/manage/motan/service/api/IOrderManageService/searchJoomSellerId',
    // 物流渠道
    joomShippingProvider: '/oms/order/manage/motan/service/api/IOrderManageService/searchJoomShippingProvider',
    // 标记跟踪号
    joomMarkTrackingNumber: '/oms/order/manage/motan/service/api/IOrderManageService/joomMarkTrackingNumber',

}