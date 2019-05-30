export const TAB_TITLES = [
    '扫描发运',
    '集货称重',
    '渠道合并',
    '集货袋合并',
    '更新包裹重量',
];
/**
 * 是否合并
 * @type {*[]}
 */
export const IS_AGGREGATION = [
    {
        code: '',
        name: '全部',
    },
    {
        code: 1,
        name: '是',
    },
    {
        code: 2,
        name: '否',
    },
];
/**
 * 是否交运
 * @type {*[]}
 */
export const DELIVERY_STATUS = [
    {
        code: '',
        name: '全部',
    },
    {
        code: 1,
        name: '已交运',
    },
    {
        code: 2,
        name: '未交运',
    },
];


export default TAB_TITLES;
