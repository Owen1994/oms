//常量
export const GET_DEPOT_LIST = 'npd-getDepotList';
export const RECEIVE_DEPOT_LIST = 'npd-receiveDepotList';
// 启用禁用
export const status = [
    {
        id: -1,
        name: "全部"
    },{
        id: 1,
        name: "启用"
    }, {
        id: 0,
        name: "禁用"
    }
]
// 启用禁用
export const enable = [
    {
        id: 0,
        name: "禁用"
    }, {
        id: 1,
        name: "启用"
    }
]
// 仓库性质
export const nature = [
    {
        id: 1,
        name: "国内仓"
    }, {
        id: 2,
        name: "海外仓"
    }, {
        id: 3,
        name: "FBA仓"
    }
]
// 仓库性质
export const type = [
    {
        id: 1,
        name: "自营仓"
    }, {
        id: 2,
        name: "托管仓"
    }, {
        id: 3,
        name: "中转仓"
    }, {
        id: 4,
        name: "平台仓"
    }
]