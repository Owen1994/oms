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

/**
 * 不良品状态
 * @type {*[]}
 */
export const Defective_Prdouct_State_List = [
    {
        code: 0,
        name: '全部',
    },
    {
        code: 1,
        name: '待采购决策',
    },
    {
        code: 10,
        name: '待实物处理',
    },
    {
        code: 15,
        name: '实物处理中',
    },
    {
        code: 20,
        name: '已完结',
    }
];


/**
 * 处理方式
 * @type {*[]}
 */
export const Handle_Way_List = [
    {
        code: 1,
        name: '原路退回',
    },
    {
        code: 5,
        name: '入采购单',
    }
];

/**
 * 收货人
 * @type {*[]}
 */
export const CONSIGNEE = [
    {
        code: 0,
        name: '全部',
    },
    {
        code: 1,
        name: '为空',
    },
    {
        code: 2,
        name: '其他',
    }
];
