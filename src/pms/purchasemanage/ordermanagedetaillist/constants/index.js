export default [
    {
        name: '供应商联系不上',
        key: 1,
    },
    {
        name: '供应商产品停产/下架/无货',
        key: 2,
    },
    {
        name: '无效价格',
        key: 3,
    },
    {
        name: '链接错误',
        key: 4,
    },
    {
        name: '其他异常',
        key: 5,
    },
    {
        name: '供应商禁用核查',
        key: 6,
    },
];

// const url = '/mockjsdata/31';
const url = '';

export const inquireOPEmployeeUrl = `${url}/pmsservice/api/merchandiserManagement/InquireOPEmployee/inquireOPEmployee`;

// 物流方式
export const LOGISTICS_MODE = `${url}/pmsservice/api/LogisticsMode/logisticsMode`;

// 转为异常
export const CHANGE_UNORDER = `${url}/pmsservice/api/Order/changeUnOrder`;