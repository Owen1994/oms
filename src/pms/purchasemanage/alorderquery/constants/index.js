/**
 * 显示列表加载中
 * @type {string}
 */
export const list_loading_state = 'list_loading_state';
/**
 * 获取查询列表
 * @type {string}
 */
export const list_main_data = 'list_main_data';

export const AL_Order_State_List = [
    {
        code: 'all',
        name: '全部',
    },
    {
        code: 'waitbuyerpay',
        name: '等待买家付款',
    },
    {
        code: 'waitsellersend',
        name: '等待卖家发货',
    },
    {
        code: 'waitlogisticstakein',
        name: '等待物流公司揽件',
    },
    {
        code: 'waitbuyerreceive',
        name: '等待买家收货',
    },
    {
        code: 'waitbuyersign',
        name: '等待买家签收',
    },
    {
        code: 'signinsuccess',
        name: '买家已签收',
    },
    {
        code: 'confirm_goods',
        name: '已收货',
    },
    {
        code: 'success',
        name: '交易成功',
    },
    {
        code: 'cancel',
        name: '交易取消',
    },
    {
        code: 'terminated',
        name: '交易终止',
    }
];

export const Detection_State_List = [
    {
        code: 0,
        name: '全部',
    },
    {
        code: 10,
        name: '待检测',
    },
    {
        code: 20,
        name: '已通过',
    },
    {
        code: 30,
        name: '未通过',
    },
    {
        code: 40,
        name: '禁止检测',
    }
];















