export const handleStatus = [
    {
        code: 0,
        name: "全部"
    }, {
        code: 1,
        name: "待处理"
    }, {
        code: 2,
        name: "处理中"
    }, {
        code: 3,
        name: "已完成"
    }, {
        code: 4,
        name: "已取消"
    }, {
        code: 5,
        name: "已中断"
    },
]
// 任务类型
export const fileTypeStatus = [
    {
        id: 1,
        name: "数据导入"
    },
    {
        id: 2,
        name: "数据导出"
    },
    {
        id: 3,
        name: "同步平台数据"
    },
    {
        id: 4,
        name: "批量下架"
    },
    {
        id: 5,
        name: "试算售价"
    },
    {
        id: 6,
        name: "自动调价"
    }
]
// 任务模块
export const taskTypeStatus = [
    {
        id: 1,
        name: "Ebay-Listing列表"
    },
    {
        id: 2,
        name: "刊登队列"
    },
    {
        id: 3,
        name: "Ebay-重复刊登检测"
    },
    {
        id: 4,
        name: "Amazon-Listing列表"
    },
    {
        id: 5,
        name: "Amazon-跟卖监控"
    },
    {
        id: 6,
        name: "SKU已覆盖"
    },
    {
        id: 7,
        name: "SKU未覆盖"
    },
    // {
    //     id: 8,
    //     // name: "批量下架"
    //     name: "Ebay-Listing列表"
    // },
    {
        id: 10,
        name: "平台售价导入"
    },
]

// 任务模块
export const fileResultStatus = [
    {
        id: 1,
        name: "全部成功"
    },
    {
        id: 2,
        name: "全部失败"
    },
    {
        id: 3,
        name: "部分成功"
    },
    {
        id: 4,
        name: "解析失败"
    },
]

// 平台
export const platformMap = {
    1: "Amazon",
    2: "Ebay",
    3: "Aliexpress"
}

export const api = {
    // 导入导出列表数据
    getFileTaskList: '/pls/motan/service/api/IPlsFacadeService/getFileTaskList',
    // 取消操作
    cancleExportTask: '/pls/motan/service/api/IPlsFacadeService/cancelExportTask',
    // 中断操作
    breakExportTask: '/pls/ebay/motan/service/api/IEbayService/soldOutInterrupt'
}
