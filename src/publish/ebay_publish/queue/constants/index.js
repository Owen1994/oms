//  获取库存价格队列修改类型
export const STATUS_EDITTYPE = [
    {
        id: 0,
        name: "全部"
    },
    {
        id: 1,
        name: "修改库存"
    }, {
        id: 2,
        name: "修改价格"
    }
]

//  获取库存价格队列同步状态
export const STATUS_SYNCSTATE = [
    {
        id: 0,
        name: "全部"
    },
    {
        id: 1,
        name: "同步中"
    }, {
        id: 2,
        name: "同步成功"
    }, {
        id: 3,
        name: "同步失败"
    }
]


export const MOCK_PATH = `http://192.168.201.211:9090/mockjsdata/24/pls/ebay/motan/service`;
export const TOP_ACTION = `get-queue-log_`;
export const RECEIVE_GALLERY_LIST = `${TOP_ACTION}receive_queue_list`;

export const RECEIVE_GALLERY_RATE_LIST_FAILED = `${TOP_ACTION}receive_queue_list_failed`;

export const GET_INVENTORY_PRICE_QUEUE = `/pls/ebay/motan/service/api/IEbayService/getInventoryPriceQueue`; //获取库存价格队列 API

