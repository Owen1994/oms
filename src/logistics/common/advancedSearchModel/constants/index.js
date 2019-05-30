// 报关单状态
export const STATUS_CUSTOMS = [
    {
        code: 0,
        name: "全部"
    },
    {
        code: 1,
        name: "待制单"
    },
    {
        code: 2,
        name: "待审核"
    },
    {
        code: 3,
        name: "待申报"
    },
    {
        code: 4,
        name: "已申报"
    },
    {
        code: 5,
        name: "待修改"
    },
    {
        code: 6,
        name: "归档"
    }
];

// 物流状态
export const STATUS_LOGISTICS = [
    {
        code: 0,
        name: "全部"
    },
    {
        code: 1,
        name: "待发货"
    },
    {
        code: 2,
        name: "已发货"
    },
    {
        code: 3,
        name: "已到货"
    },
    {
        code: 4,
        name: "已取消"
    }
];

// 仓库类型
export const STATUS_WAREHOUSE = [
    {
        code: 0,
        name: "全部"
    },
    {
        code: 1,
        name: "FBA"
    }, {
        code: 2,
        name: "海外仓"
    }
];

// 申报主体
export const STATUS_COMPANY = [
    {
        code: 0,
        name: "全部"
    },
    {
        code: 1,
        name: "科技股份",
        lname: "深圳市有棵树科技股份有限公司"
    }, {
        code: 2,
        name: "京邦户外",
        lname: "深圳市有棵树京邦户外有限公司"
    }
];

// 操作日志 操作类型
export const STATUS_OPERATIONTYPE = [
    {
        code: 0,
        name: "全部"
    },
    {
        code: 1,
        name: "修改报关单"
    }, {
        code: 2,
        name: "删除Sku税率"
    }, {
        code: 3,
        name: "审核报关单"
    }, {
        code: 4,
        name: "驳回报关单"
    }
];

