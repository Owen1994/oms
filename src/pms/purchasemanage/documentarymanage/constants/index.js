
// 接收待核查任务列表数据
export const RECEIVE_DOCUMENTAR_LIST = 'receive_documentar_list';

// 接收数据状态
export const RECEIVE_LOADING_DOCUMENTAR_STATE = 'receive_loading_documentar_state';

// 在售状态
export const DOCUMENTAR_SALES_STATE_TYPE = [
    {
        code: 0,
        name: '全部',
    },
    {
        code: 1,
        name: '正常销售',
    },
    {
        code: 2,
        name: '清库存',
    },
    {
        code: 3,
        name: '缺货',
    },
];

// 模板类型
export const DOCUMENTAR_EXPEDITING_TEMPLATE_TYPE = [
    {
        id: 1,
        name: '通用模板',
    },
    {
        id: 2,
        name: '紧急模板',
    },
];
