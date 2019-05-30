export const states = {
    101:"待提交",
    601:"待开发经理审核",
    701:"待开发总监审核",
    201:"待销售主管审核",
    301:"待销售经理审核",
    7001:"已完成",
}

export const bindStates = {
    901:"待绑定",
    2001:"未锁定",
    3001:"已锁定",
}

// BIND("待绑定", 901),
// SAMPLE("待对样", 1001),
// UNLOCK("未锁定", 2001),
// LOCK("已锁定", 3001),
export const ntsTypes = {
    1:"热销引入",
    2:"自主引入"
}
export const currencys = {
    1:"RMB",
    2:"USD",
    3:"HK",
    4:"CAD",
    5:"EUR"
}
export const currencySelect = [
    {v:1,n:"RMB"},
    {v:2,n:"USD"},
    {v:3,n:"HK"},
    {v:4,n:"CAD"},
    {v:5,n:"EUR"},
]

export const minBookingUnitSelect = [
    {v:0,n:"请选择"},
    {v:1,n:"PCS"},
    {v:2,n:"SET"},
    {v:3,n:"台"},
    {v:4,n:"箱"},
]
export const units = {
    1:"PCS",
    2:"SET",
    3:"台",
    4:"箱",
}

// SUBMIT("待提交", 101),
// SALES_DIRECTOR("待销售主管审核", 201),
// SALES_DIRECTOR_REJECT("销售主管驳回", 202),
// SALES_MANAGER("待销售经理审核", 301),
// SALES_MANAGER_REJECT("销售经理驳回", 302),
// SALES_MASTER("待销售总监审核", 401),
// SALES_MASTER_REJECT("销售总监驳回", 402),
// SALES_MASTER_REVIEW("待销售总监复核", 403),
// DEVELOPER("待开发确认", 501),
// DEVELOPER_REJECT("开发驳回", 502),
// DEV_MANAGER("待开发经理审核", 601),
// DEV_MANAGER_REJECT("开发经理驳回", 602),
// DEV_MASTER("待开发总监审核", 701),
// DEV_MASTER_REJECT("开发总监驳回", 702),
// DISPATCH("待分派", 801),
// BIND("待绑定", 901),
// SAMPLE("待对样", 1001),
// UNLOCK("未锁定", 2001),
// LOCK("已锁定", 3001),
// LOGISTICS("待物流专员确认", 4001),
// LOGISTICS_REJECT("物流专员驳回", 4002),
// PROPERTY("待产权专员确认", 5001),
// PROPERTY_REJECT("产权专员驳回", 5002),
// INTELLECTUAL("待知产确认", 6001),
// INTELLECTUAL_REJECT("知产驳回", 6002),
// FINISH("已完成", 7001),
// UNKNOWN("", -1);
