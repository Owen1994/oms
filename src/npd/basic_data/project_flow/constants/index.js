export const GET_PROJECT_FLOW_LIST = 'npd-getProjectFlowList';
export const RECEIVE_PROJECT_FLOW_LIST = 'npd-receiveProjectFlowList';

//搜索 - 按业务线搜索
export const businessCode = [
    {
        id: -1,
        name: "全部"
    },{
        id: 1,
        name: "国内线"
    }, {
        id: 2,
        name: "海外线"
    }, {
        id: 3,
        name: "FBA线"
    }
]

//搜索 - 按状态搜索
export const state = [
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

//高级搜索 - 搜索类型
export const searchType = [
    {
        id: 0,
        name: "项目流编码"
    },{
        id: 1,
        name: "项目流名称"
    }
]

//弹窗 - 业务线
export const businessCode2 = [
    {
        id: 0,
        name: "国内线"
    }, {
        id: 1,
        name: "海外线"
    }, {
        id: 2,
        name: "FBA线"
    }
]
