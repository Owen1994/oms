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
 * 不良品来源
 * @type {*[]}
 */
export const Defective_Prdouct_Source_List = [
    {
        code: 0,
        name: '全部',
    },
    {
        code: 1,
        name: '采购来货不良',
    },
    {
        code: 2,
        name: '销售退货不良',
    },
    {
        code: 3,
        name: '库存仓退不良',
    }
];

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

export const Handle_Way_One_List = [
    {
        code: 1,
        name: '退回供应商',
    },
    {
        code: 2,
        name: '报废',
    },
    {
        code: 3,
        name: '不良转良/原单入库',
    },
    {
        code: 4,
        name: '不良转良/赠品',
    },
    {
        code: 5,
        name: '不良转良/补发其他采购单',
    },
    { 
        code: 6,
        name: '驳回（重新收货）',
    }
];


export const Handle_Way_Three_List = [
    {
        code: 1,
        name: '退回供应商',
    },
    {
        code: 4,
        name: '赠品',
    },
    {
        code: 5,
        name: '补发其他采购单',
    }
];


export const PROCESSING_MODE = [
    {
        code: 0,
        name: '全部',
    },
    {
        code: 1,
        name: '退回供应商',
    },
    {
        code: 2,
        name: '报废',
    },
    {
        code: 3,
        name: '原单入库',
    },
    {
        code: 4,
        name: '赠品',
    },
    {
        code: 5,
        name: '补发其他采购单',
    },
    {
        code: 6,
        name: '驳回'
    }
];

export const Processing_Type_List = [
    {
        code: 0,
        name: '全部',
    },
    {
        code: 1,
        name: '不良品',
    },
    {
        code: 2,
        name: '多收合格',
    }
];

